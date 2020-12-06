import React from 'react';

import Content from './Content.jsx';

export default class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
        };
        this.startBtn = this.startBtn.bind(this);
    };

    startBtn() {
        this.setState({
            clicked: true,
        });
    }

    render() {
        return(
            <div>
                <div id="mainTitleDiv">Andrew's Silly React Quiz!</div>
                {this.state.clicked ?
                    null :
                    <div>
                        <div id="introDiv"><div id="introInnerDiv"><h3 id="welcomeTitleHello">Welcome to Andrew's Silly React Quiz!</h3><p>The rules are simple. You will have ten seconds to answer each question. There will be ten questions in random order. You must be quick! For if the timer should hit zero and you submit a correct answer, it will be scored as incorrect. At the end of the quiz you will see your final score and have the option to play again, have fun!</p></div></div>
                        <button onClick={this.startBtn} id="startbtn">Start</button>
                    </div>
                }
                {this.state.clicked ?
                    <Content>{this.props}</Content> :
                    null
                }
            </div>
        );
    };

};