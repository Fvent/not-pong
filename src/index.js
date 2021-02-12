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

        this.state = {
            gameStarted : false,
            direction: "left"
        }

        this.leftPaddleTop = 0;
        this.rightPaddleTop = 0;

        this.puckLeft = 38;
        this.puckTop = 33;

        this.movePaddle = this.movePaddle.bind(this);
        this.handleStartButton = this.handleStartButton.bind(this);
        this.movingPuckFunction = this.movingPuckFunction.bind(this);
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

    handleStartButton(){
        this.setState({
            gameStarted: true,
            direction: "left"
        });
        setInterval(this.movingPuckFunction, 5);
    }

   movingPuckFunction(){

        var puck = document.getElementById('puck');

        var puckMovement = 0.1;

        if(this.state.direction === "left"){
                this.puckLeft -= puckMovement;
                puck.style.left = this.puckLeft + 'vw';
        }
        if(this.state.direction === "right"){
                this.puckLeft += puckMovement;
                puck.style.left = this.puckLeft + 'vw';
        }
   }


    render(){
        return (<div id="board" onKeyDown={this.movePaddle} tabIndex='0'>
           <div id="left-paddle"></div>
           <div id="puck"></div>
            <div id="right-paddle"></div>
            <button id="start-btn" onClick={this.handleStartButton}>Start</button>
        </div>);
    }
}





ReactDOM.render(<App />, document.getElementById('root'));