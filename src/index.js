import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class App extends React.Component {
    render(){
        return (<div id="app">
            <h1>Not PONG</h1>
            <Board />
        </div>);
    }
}

class Board extends React.Component {
    constructor(props){
        super(props);

        this.leftPaddleTop = 0;
        this.rightPaddleTop = 0;

        this.movePaddle = this.movePaddle.bind(this);
    }

    movePaddle(event){
        var leftPaddle = document.getElementById('left-paddle');
        var rightPaddle = document.getElementById('right-paddle');

        console.log(event.keyCode);
        if(event.keyCode === 83){
            this.leftPaddleTop -= 20;
            leftPaddle.style.top = this.leftPaddleTop + 'px';
        }
        if(event.keyCode === 88){
            this.leftPaddleTop += 20;
            leftPaddle.style.top = this.leftPaddleTop + 'px';
        }
        if(event.keyCode === 38){
            this.rightPaddleTop -= 20;
            rightPaddle.style.top = this.rightPaddleTop + 'px';
        }
        if(event.keyCode === 40){
            this.rightPaddleTop += 20;
            rightPaddle.style.top = this.rightPaddleTop + 'px';
        }



    }

    
    render(){
        return (<div id="board" onKeyDown={this.movePaddle} tabIndex='0'>
           <div id="left-paddle"></div>
            <div id="right-paddle"></div>
        </div>);
    }
}





ReactDOM.render(<App />, document.getElementById('root'));