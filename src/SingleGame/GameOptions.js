import React,{PureComponent} from 'react'
import Icon from '../components/Icon'
import classnames from 'classnames'
import range from 'lodash/range'

class OptionItem extends PureComponent{
    handlerClick=()=>{
        const {isError,index,onClick}=this.props;
        if(isError) return;
        onClick(index);
    };
    render(){
        const array=['yi','er','san','si'];
        const {children,isError,index}=this.props;
        return <div className={classnames("game-options__item",{
            'is-error':isError
        })} style={{animationDelay:`${100*index+100}ms`}} onClick={this.handlerClick}>
            <Icon className="game-options__icon" name={array[index]}/>
            {children}
        </div>
    }
}

export default class extends PureComponent{
    static defaultProps={
        children:'',
        error:[]
    };
    isError(index){
        return this.props.error.indexOf(index)!==-1;
    }
    handlerClick=(index)=>{
        const {onChange}=this.props;
        if(this.animate) return;
        onChange(index);
    };
    animation(){
        this.animate=true;
        this.el.classList.add('animation');
        clearTimeout(this.timer);
        this.timer=setTimeout(()=>{
            this.animate=false;
            this.el.classList.remove('animation');
        },1400);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.children!==this.props.children){
            this.animation();
        }
    }
    render(){
        const {children}=this.props;
        const options=children.split(',');
        return <div className="game-options" ref={(el)=>this.el=el}>
            {range(0,4).map((i)=><OptionItem key={i} onClick={this.handlerClick} index={i} isError={this.isError(i)}>{options[i]}</OptionItem>)}
        </div>
    }
}
