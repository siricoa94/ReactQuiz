import React from 'react';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions:[],
            usedQuestions: [],
            counter: 10,
            correct: 0,
            incorrect: 0,
            unanswered: 0,
            message: "hello state is working!",
            answer: "",
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.countDown = this.countDown.bind(this);
        this.usedQuestionChecker = this.usedQuestionChecker.bind(this);
        this.countDownRefresh = this.countDownRefresh.bind(this);
        this.correctQuestionChecker = this.correctQuestionChecker.bind(this);
        this.endBtn = this.endBtn.bind(this);
        let pageQuiz = this.props.children.children.page_quiz;
        // console.log(pageQuiz + "bla");
        for (var i = 0; i < pageQuiz.length; i++) {
            let easyprops = JSON.stringify(pageQuiz[i]);
            this.state.questions.push(easyprops);
        };
        // console.log("questions: " +this.state.questions);
    };

    componentDidMount() {
        this.countDown();
        const randomQuestion = this.state.questions[Math.floor(Math.random() * this.state.questions.length)];
        const usedQuestion = this.state.usedQuestions;
        usedQuestion.push(randomQuestion);
        const parseRandom = JSON.parse(randomQuestion);
        let deconstructedQuestion = parseRandom.question;
        let questionAnswer = JSON.stringify(parseRandom.answer);
        // console.log("Q U E S T I O N ANSWER: " + questionAnswer);
        let temporaryBtnArrayOne = [];
        for (let i = 0; i < parseRandom.options.length; i ++) {
            let btnOption = parseRandom.options[i];
            let nextClick = this.nextQuestion;
            let correctQuestionChecker = this.correctQuestionChecker;
            // console.log("btnOption: " + btnOption);
            temporaryBtnArrayOne.push(<button className="questionButton" id={btnOption} onClick={nextClick, correctQuestionChecker}>{btnOption}</button>);
        }
        this.setState({
            correct: 0,
            message: deconstructedQuestion,
            options: temporaryBtnArrayOne,
            answer: questionAnswer
        });
    }
    
    countDown () {
        if(this.state.counter > 0) {
            this.countDown = setInterval(
                () => this.setState({
                    counter: this.state.counter - 1
                }), 1000
            );
        }
    }
    usedQuestionChecker () {
        let nextClickChecker = this.nextQuestion;
        let usedQuestions = this.state.usedQuestions.length;
        let tempBtn = [];
        if (usedQuestions === 10){
            tempBtn.push(<button className="refreshBtn" onClick={this.endBtn}>Try again?</button>);
            console.log("hey!");
            this.setState({
                counter: "",
                message: "End of Quiz",
                options: tempBtn,
            });
        } else {
            nextClickChecker();
        }
    }

    endBtn () {
        location.reload();
    }

    correctQuestionChecker (e) {
        let clickedButton = JSON.stringify(e.target.id);
        let timer = this.state.counter;
        let correctAnswer = this.state.answer;
        let endCheck = this.usedQuestionChecker;
        if(clickedButton == correctAnswer && timer >= 1) {
            console.log("CORRECT!");
            this.setState({
                correct: this.state.correct + 1
            });
            endCheck();
        } else if(clickedButton == correctAnswer && timer == 0){
            console.log("FAILURE");
            this.setState({
                incorrect: this.state.incorrect + 1
            });
            endCheck();
        } else {
            console.log("FAILURE");
            this.setState({
                incorrect: this.state.incorrect + 1
            });
            endCheck();
        }
    }

    countDownRefresh() {
        this.setState((prevState) => {
            if(prevState.counter <= 0 || $("#nextBtn").clicked == true) {
                // console.log("not sure man");
                clearInterval(this.countDown);
            } else {
                // console.log("do nothing")
            }
        });
    }

    nextQuestion() {
        if(this.state.counter === 0) {
            this.countDown = setInterval(
                () => this.setState({
                    counter: this.state.counter - 1
                }), 1000
            );
        }
        let quizQuestions = this.state.questions;
        let usedQuestion = this.state.usedQuestions;
        let newQuestion = [];
        function arrayDiff (a1, a2) {
            if (usedQuestion.length === quizQuestions.length) {
                console.log("end");
            } else {
                var a = [], diff = [];
                for (var i = 0; i < a1.length; i++) {
                    a[a1[i]] = true;
                }
                for (var i = 0; i < a2.length; i++) {
                    if (a[a2[i]]) {
                        delete a[a2[i]];
                    } else {
                        a[a2[i]] = true;
                    }
                }
                for (var k in a) {
                    diff.push(k);
                }
                let randomQuestion = diff[Math.floor(Math.random() * diff.length)];
                newQuestion.push(randomQuestion);
                usedQuestion.push(randomQuestion);
            }
        }
        arrayDiff(quizQuestions, usedQuestion);
        // console.log("new question: " + JSON.parse(newQuestion));
        if (newQuestion.length === 0) {
            console.log("uh oh scooby doo!");
        } else {
            console.log("your good~" + newQuestion.length);
            let parsedQuestion = JSON.parse(newQuestion)
            let deconstructedQuestionNew = parsedQuestion.question;
            let deconstructedQuestionAnswer = JSON.stringify(parsedQuestion.answer);
            let temporaryBtnArray = [];
            for (let i = 0; i < parsedQuestion.options.length; i ++) {
                let nextClick = this.nextQuestion;
                let correctQuestionChecker = this.correctQuestionChecker;
                let btnOption = parsedQuestion.options[i];
                temporaryBtnArray.push(<button className="questionButton" id={btnOption} onClick={nextClick, correctQuestionChecker}>{btnOption}</button>);
                // console.log("btnOption: " + btnOption);
            }
            let usedQuestions = quizQuestions.length;
            if (usedQuestions === 0) {
                this.setState({
                    message: "End of Quiz",
                    counter: 0,
                    options: "",
                    answer: deconstructedQuestionAnswer
                });
            } else {
                this.setState({
                    message: deconstructedQuestionNew,
                    counter: 10,
                    options: temporaryBtnArray,
                    answer: deconstructedQuestionAnswer
                });
            }
        }
    }

    componentDidUpdate() {
        this.countDownRefresh();
    }

    render() {
        return(
            <div className="contentContainer">
                <div className="contentDiv">
                    <h1>Time: {this.state.counter}</h1>
                </div>
                <div className="contentDiv" id="counterDiv">
                    <h1>Correct: {this.state.correct}</h1>
                    <h1>Incorrect: {this.state.incorrect}</h1>
                </div>
                <div className="contentDiv">
                    <h1>{this.state.message}</h1>
                </div>
                <div className="contentDiv">
                    <h1>{this.state.options}</h1>
                </div>
            </div>
        );
    };
};