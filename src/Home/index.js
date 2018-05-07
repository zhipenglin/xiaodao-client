import React from 'react'

export default ()=>{
    const {onSingleGame,onNetPlay}=this.props;
    return (
        <div className="home">
            <header className="home__header"></header>
            <button className="home__button" onClick={onSingleGame}>开始游戏</button>
            <button className="home__button" onClick={onNetPlay}>网络对战</button>
        </div>
    );
};