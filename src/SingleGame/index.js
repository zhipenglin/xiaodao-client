import React,{PureComponent} from 'react';
import loop from 'raf-loop';

export default class extends PureComponent{
    state={
        time:0
    };

    componentDidMount(){
        let time=Date.now();
        this.engine = loop((dt)=>{
            if((Date.now()-time)/1000>=1){
                this.setState(({time})=>{
                    return {time:time+1};
                });
                time=Date.now();
            }
        }).start();
    }
    componentWillUnmount(){
        this.engine.stop();
    }
    render(){
        return (
            <div className="game">
                <header className="game-header">
                    <div className="game-header__avatar">{this.state.time}</div>
                    <div className="game-header__info"></div>
                </header>
                <div className="game-title"></div>
                <div className="game-options"></div>
            </div>
        );
    }
}