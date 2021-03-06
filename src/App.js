import React, {Component} from 'react';
import Home from './Home'
import SingleGame from './SingleGame'
import axios from 'axios'
import './App.css'

const pageMap=(name)=>{
    const map={home:Home,singleGame:SingleGame};
    return map[name];
};

class App extends Component {
    state={
        currentPage:'home'
    };
    handlerPageChange=(name)=>{
        this.setState({
            currentPage:name
        });
    };
    componentWillMount(){
        axios.post('/login');
    }
    render() {
        const Page=pageMap(this.state.currentPage);
        return (
            <div className="App"><Page onPageChange={this.handlerPageChange}/></div>
        );
    }
}

export default App;
