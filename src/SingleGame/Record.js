import React,{PureComponent} from 'react'
import Button from '../Home/Button'
import axios from 'axios'

export default class extends PureComponent{
    componentDidMount(){
        const {children}=this.props;
        axios.post('/record',{
            data:{
                score:children
            }
        });
    }
    handlerClick=()=>{
        const {onPageChange}=this.props;
        onPageChange('home');
    };
    render(){
        const {children}=this.props;
        return <div className="game-record">
            <div className="game-record__title">游戏结束</div>
            <img className="game-record__img" src="http://game.91ddcc.com/images/battle_pice.gif"/>
            <div className="game-record__score">本次游戏获得<span>{children}</span>分</div>
            <Button className="game-record__button" onClick={this.handlerClick}>结束</Button>
        </div>
    }
}
