import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Content from './Content.jsx';
import StartPage from './StartPage.jsx';

export default class Page extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div id ="pageContainer">
                <BrowserRouter>
                    <div>
                        <Switch>
                        <Route exact path="/" render={() => (<StartPage>{this.props}</StartPage>)}/>
                        <Route path="/quiz" render={() => (<Content>{this.props}</Content>)}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    };
};