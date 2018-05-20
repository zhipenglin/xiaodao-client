import React,{PureComponent} from 'react'
import {spritePlay} from '../Music'
import classnames from 'classnames'
import './button.css'

export default class Button extends PureComponent{
    state={
        isPress:false
    };
    handlerClick=(e)=>{
        const {onClick}=this.props;
        spritePlay('msg');
        onClick&&onClick(e);
    };
    handlerTouchStart=()=>{
        this.setState({isPress:true});
    };
    handlerTouchEnd=()=>{
        this.setState({isPress:false});
    };
    render(){
        const {className,onClick,...props}=this.props;
        return <button className={classnames('button',className,{
            'is-press':this.state.isPress
        })} {...props} onClick={this.handlerClick} onTouchEnd={this.handlerTouchEnd} onTouchCancel={this.handlerTouchEnd} onTouchStart={this.handlerTouchStart}/>
    }
}