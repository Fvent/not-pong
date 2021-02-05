import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class App extends React.Component {
    render(){
        return (<div id="app">
            <h1>Not PONG</h1>
            <Board />
            <h3>Left Paddle: up -- s |  down -- x</h3>
            <h3>Right Paddle: up -- ↑ |  down -- ↓</h3>
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

        console.log(event);
        if(event.keyCode === 83){
            if(this.leftPaddleTop > 0){
                this.leftPaddleTop -= 5;
                leftPaddle.style.top = this.leftPaddleTop + 'vh';
            }
        }
        if(event.keyCode === 88){
            if(this.leftPaddleTop < 55){
                this.leftPaddleTop += 5;
                leftPaddle.style.top = this.leftPaddleTop + 'vh';
            }
        }
        if(event.keyCode === 38){
            if(this.rightPaddleTop > 0){
                this.rightPaddleTop -= 5;
                rightPaddle.style.top = this.rightPaddleTop + 'vh';
            }
        }
        if(event.keyCode === 40){
            if(this.rightPaddleTop < 55){
                this.rightPaddleTop += 5;
                rightPaddle.style.top = this.rightPaddleTop + 'vh';
            }
           
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