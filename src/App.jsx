import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Page from './Page.jsx';
import {quiz} from './Quiz.js';


export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Page page_title="hello" page_quiz={quiz}></Page>
      </Router>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('content'));