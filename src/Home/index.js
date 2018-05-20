import React,{PureComponent} from 'react'
import Button from './Button'
import './style.css'

export default class Home extends PureComponent{
    startGame=()=>{
        const {onPageChange}=this.props;
        onPageChange('singleGame');
    };
    render(){
        return (
            <div className="home">
                <header className="home__header">
                    <div className="home__logo"></div>
                </header>
                <div className="home__body">
                    <Button className="home__button" onClick={this.startGame}>开始游戏</Button>
                    <Button className="home__button">网络对战</Button>
                </div>
            </div>
        );
    }
}