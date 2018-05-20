import React, {PureComponent,cloneElement} from 'react'
import ReactDOM from 'react-dom'
import SpriteAnimator from 'react-sprite-animator'
import jian from './jian.png'
import futou from './futou.png'
import cao from './cao.png'
import {spritePlay} from '../Music'
import './style.css'

const loadImage=(src)=>{
    const img=new Image();
    img.src=src;
};

[jian,futou,cao].forEach((src)=>loadImage(src));

const Pick=<SpriteAnimator className="animate-pick" sprite={jian} stopLastFrame={true} width={392} height={278} wrapAfter={4} frameCount={12} fps={24}/>,
    Cut=<SpriteAnimator className="animate-cut" sprite={futou} stopLastFrame={true} width={246} height={236} wrapAfter={7} frameCount={12} fps={24}/>,
    Jump=<SpriteAnimator className="animate-jump" sprite={cao} stopLastFrame={true} width={109} height={151} fps={8}/>;

const typeMap={
    pick:Pick,cut:Cut,jump:Jump
};

class Skill extends PureComponent {
    componentDidMount(){
        const {type,onStart}=this.props;
        spritePlay(type);
    }
    render() {
        const {type,onEnd}=this.props;
        return (
            <div className="skill-layer">{cloneElement(typeMap[type],{onEnd})}</div>
        );
    }
}

let running=false;
export default ({...props})=>{
    if(running) return;
    running=true;
    const layer=document.createElement('div'),bodyClassName=`skill-${props.type}`,$game=document.querySelector('.game-area');
    document.body.appendChild(layer);
    $game.classList.add(bodyClassName);

    const handlerEnd=()=>{
        document.body.removeChild(layer);
        $game.classList.remove(bodyClassName);
        running=false;
    };
    ReactDOM.render(<Skill {...props} onEnd={handlerEnd}/>,layer);
}