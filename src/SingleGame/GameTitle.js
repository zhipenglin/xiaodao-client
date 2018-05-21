import React,{PureComponent} from 'react'
import Typed from 'typed.js'
export default class extends PureComponent{
    static defaultProps={
        children:''
    };
    bindTyped(text){
        this.typed&&this.typed.destroy();
        this.typed=new Typed(this.el, {
            strings:[text],
            typeSpeed: 40,
            showCursor:false
        });
    }
    componentDidMount(){
        this.bindTyped(this.props.children);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.children!==this.props.children){
            this.bindTyped(nextProps.children);
        }
    }
    render(){
        const {children}=this.props;
        return <div className="game-title"><div className="game-title__inner" ref={(el)=>this.el=el}></div></div>
    }
}
