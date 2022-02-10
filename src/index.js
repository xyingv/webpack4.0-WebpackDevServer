import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './home';
import List from './list';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={Home}></Route>
                    <Route path='/list' exact component={List}></Route>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));