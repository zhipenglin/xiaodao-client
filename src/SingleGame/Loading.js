import React,{PureComponent} from 'react'
import './loading.css'

export default class Loading extends PureComponent{
    state={
        isLoaded:false
    };
    componentDidMount(){
        const {onLoad}=this.props;
        setTimeout(()=>{
            this.setState({isLoaded:true});
            onLoad();
        },2000);
    }
    render(){
        if(this.state.isLoaded) return null;
        return (
            <div className="loading">
                <div className="loading__left"></div>
                <div className="loading__right"></div>
            </div>
        );
    }
}