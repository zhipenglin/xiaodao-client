import React,{PureComponent} from 'react';
import loop from 'raf-loop';
import {bgPlay,bgStop,spritePlay} from '../Music'
import showSkill from '../Skill'
import Loading from './Loading'
import Icon from '../components/Icon'
import range from 'lodash/range'
import GameTitle from './GameTitle'
import GameOptions from './GameOptions'
import Record from './Record'
import axios from 'axios'
import './style.css'

export default class SingleGame extends PureComponent{
    state={
        isLoading:false,
        blood:5,
        time:0,
        score:0,
        question:{},
        tools:[3,3,3],
        error:[]
    };

    handlerLoaded=()=>{
        bgPlay();
        let time=Date.now();
        this.engine = loop((dt)=>{
            if((Date.now()-time)/1000>=1){
                if(this.state.time>=30){
                    return this.lostBlood();
                }
                this.setState(({time,blood})=>{
                    return {time:time+1};
                });
                time=Date.now();
            }
        }).start();
    }

    handlerPick=()=>{
        const tools=this.state.tools.slice(0);
        if(tools[0]<=0){
            return;
        }
        tools[0]-=1;
        this.setState({
            tools,score:this.state.score+100
        });
        showSkill({type:'pick'});
        setTimeout(()=>this.isRight(),1000);
    }

    handlerCut=()=>{
        const question=this.state.question;
        const tools=this.state.tools.slice(0);
        if(tools[1]<=0){
            return;
        }
        tools[1]-=1;
        this.setState({
            tools
        });
        if(this.state.error.length==0){
            const last=[0,1,2,3];
            last.splice(question.answer,1);
            last.splice(Math.floor(Math.random()*2),1);
            this.setState({
                error:last
            });
        }else if(this.state.error.length>=1){
            const last=[0,1,2,3];
            last.splice(question.answer,1);
            this.setState({
                error:last
            });
        }
        showSkill({type:'cut'});
    }

    handlerJump=()=>{
        const tools=this.state.tools.slice(0);
        if(tools[2]<=0){
            return;
        }
        tools[2]-=1;
        this.setState({
            tools
        });
        showSkill({type:'jump'});
        setTimeout(()=>this.getQuestion(),800);
    }

    lostBlood(){
        this.setState(({blood})=>{
            return {time:10,blood:blood-1};
        },()=>{
            spritePlay('wrong');
            if(this.state.blood<=0){
                this.end();
                return spritePlay('death');
            }
        });
    }

    isRight(){
        this.setState(({blood})=>{
            return {time:0,error:[]};
        });
        this.getQuestion();
    }

    end(){
        this.engine.stop();
        bgStop();
    }

    handlerChange=(index)=>{
        const question=this.state.question;
        if(question.answer==index){
            spritePlay('right');
            this.isRight();
            const score=this.state.score+Math.min(100-100*Math.max(this.state.time-10,0)/20,100);
            this.setState({score});
        }else{
            this.setState({error:[...this.state.error,index]});
            this.lostBlood();
        }
    };

    getQuestion(){
        let promise=Promise.resolve();
        const fetchQuestions=()=>{
            return axios.post('/questions').then(({data})=>{
                if(data.err_no=='0'){
                    this.questionsList=this.questionsList.concat(data.results);
                }else{
                    alert(data.err_msg);
                }
            });
        };
        if(this.questionsList.length>0){
            promise=promise.then(()=>this.questionsList.pop());
            if(this.questionsList.length<5){
                fetchQuestions();
            }
        }else{
            this.setState({isLoading:true});
            promise=promise.then(()=>fetchQuestions());
        }
        return promise.then(()=>{
            this.setState({
                question:this.questionsList.pop()
            });
        });
    }

    constructor(props){
        super(props);
        this.questionsList=[];
    }

    componentDidMount(){
        this.getQuestion();
    }

    componentWillUnmount(){
        this.engine.stop();
    }

    render(){
        const width=Math.min(100-100*Math.max(this.state.time-10,0)/20,100);
        const {question}=this.state;
        return (
            <div className="game">
                <header className="game-header">
                    <div className="game-header__avatar"></div>
                    <div className="game-header__info">
                        <p className="game-header__nickname">游客</p>
                        <p className="game-header__blood">
                            {range(0,this.state.blood).map((i)=><Icon key={i} name="heart"/>)}
                        </p>
                    </div>
                    <div className="game-header__score">{this.state.score}</div>
                </header>
                <div className="game-time"><div className="game-time__inner" style={{width:`${width}%`}}></div></div>
                <div className="game-area">
                    <GameTitle>{question.title}</GameTitle>
                    <GameOptions error={this.state.error} onChange={this.handlerChange}>{question.options}</GameOptions>
                </div>
                <div className="game-tools">
                    <div className="game-tools__item" onClick={this.handlerPick}>
                        <Icon className="game-tools__icon" name="jian"/>
                        <em>x{this.state.tools[0]}</em>
                        <div className="game-tools__test">百步穿杨</div>
                    </div>
                    <div className="game-tools__item" onClick={this.handlerCut}>
                        <Icon className="game-tools__icon" name="futou"/>
                        <em>x{this.state.tools[1]}</em>
                        <div className="game-tools__test">披荆斩棘</div>
                    </div>
                    <div className="game-tools__item" onClick={this.handlerJump}>
                        <Icon className="game-tools__icon" name="matiaoguo"/>
                        <em>x{this.state.tools[2]}</em>
                        <div className="game-tools__test">跳过此题</div>
                    </div>
                </div>
                <Loading onLoad={this.handlerLoaded}/>
                {this.state.blood<=0?<Record onPageChange={this.props.onPageChange}>{this.state.score}</Record>:null}
            </div>
        );
    }
}
