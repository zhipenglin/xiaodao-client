import React,{PureComponent} from 'react';
import loop from 'raf-loop';
import {bgPlay,spritePlay} from '../Music'
import showSkill from '../Skill'
import Loading from './Loading'
import Icon from '../components/Icon'
import range from 'lodash/range'
import axios from 'axios'
import './style.css'

export default class SingleGame extends PureComponent{
    state={
        isLoading:false,
        blood:5,
        time:0,
        score:0,
        question:{}
    };

    handlerLoaded=()=>{
        //bgPlay();
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
        showSkill({type:'pick'});
    }

    handlerCut=()=>{
        showSkill({type:'cut'});
    }

    handlerJump=()=>{
        showSkill({type:'jump'});
    }

    lostBlood(){
        if(this.state.blood<=0){
            this.end();
            return spritePlay('death');
        }
        this.setState(({blood})=>{
            return {time:10,blood:blood-1};
        },()=>{
            spritePlay('wrong');
        });
    }

    end(){
        this.engine.end();
    }

    getQuestions(){
        let promise=Promise.resolve();
        if(this.questionsList>0){
            promise=promise.then(()=>this.questionsList.pop());
        }
        this.setState({isLoading:true});
        promise=promise.then(()=>axios.get('').then(({data})=>{
            if(data.err_no=='0'){
                this.questionsList=this.questionsList.concat(data.results);
                this.setState({
                    isLoading:false
                });
                return this.questionsList.pop();
            }
        }));
        return promise;
    }

    constructor(props){
        super(props);
        this.questionsList=[];
    }

    componentDidMount(){
        this.getQuestions();
    }

    componentWillUnmount(){
        this.engine.stop();
    }
    render(){
        const width=Math.min(100-100*Math.max(this.state.time-10,0)/20,100);
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
                </header>
                <div className="game-time"><div className="game-time__inner" style={{width:`${width}%`}}></div></div>
                <div className="game-area">
                    <div className="game-title">
                        史蒂夫是大是大非地方史蒂夫是当发生的水淀粉收到收到速度速度水淀粉史蒂夫是当发生的收到水淀粉史蒂夫多少是大是大非收到
                    </div>
                    <div className="game-options">
                        <div className="game-options__item">
                            <Icon className="game-options__icon" name="yi"/>
                            史蒂夫地方史蒂夫史蒂夫水淀粉是否史蒂夫
                        </div>
                        <div className="game-options__item">
                            <Icon className="game-options__icon" name="er"/>
                            史蒂夫地方史蒂夫史蒂夫水淀粉是否史蒂夫
                        </div>
                        <div className="game-options__item">
                            <Icon className="game-options__icon" name="san"/>
                            史蒂夫地方史蒂夫史蒂夫水淀粉是否史蒂夫
                        </div>
                        <div className="game-options__item">
                            <Icon className="game-options__icon" name="si"/>
                            史蒂夫地方史蒂夫史蒂夫水淀粉是否史蒂夫
                        </div>
                    </div>
                </div>
                <div className="game-tools">
                    <div className="game-tools__item" onClick={this.handlerPick}>
                        <Icon className="game-tools__icon" name="jian"/>
                        <em>x1</em>
                        <div className="game-tools__test">百步穿杨</div>
                    </div>
                    <div className="game-tools__item" onClick={this.handlerCut}>
                        <Icon className="game-tools__icon" name="futou"/>
                        <em>x1</em>
                        <div className="game-tools__test">披荆斩棘</div>
                    </div>
                    <div className="game-tools__item" onClick={this.handlerJump}>
                        <Icon className="game-tools__icon" name="matiaoguo"/>
                        <em>x1</em>
                        <div className="game-tools__test">跳过此题</div>
                    </div>
                </div>
                <Loading onLoad={this.handlerLoaded}/>
            </div>
        );
    }
}