import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const RIGHT='right';
const LEFT = 'left';
const UP = 'up';
const DOWN = 'down';
const NONE = 'none';
const LPL = '5vw'; //leftPaddle style left
const RPL = '71vw'; // rightPaddle style left

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
            direction: LEFT,
            verticalDirection: NONE
        }

        this.leftPaddleTop = 0;
        this.rightPaddleTop = 0;

        this.puckLeft = 38;
        this.puckTop = 33;

        this.movePaddle = this.movePaddle.bind(this);
        this.handleStartButton = this.handleStartButton.bind(this);
        this.movingPuckFunction = this.movingPuckFunction.bind(this);

        this.lastLeftMOVEMENT = NONE;
        this.lastRightMOVEMENT = NONE;
        
    }

    movePaddle(event){
        var leftPaddle = document.getElementById('left-paddle');
        var rightPaddle = document.getElementById('right-paddle');
        
        // console.log(this.leftPaddleTop);
        if(event.keyCode === 83){
            if(this.leftPaddleTop > 0){
                this.leftPaddleTop =  this.leftPaddleTop - 5;
                console.log(this.leftPaddleTop);
                leftPaddle.style.top = this.leftPaddleTop + 'vh';
                this.lastLeftMOVEMENT = UP;
            }
        }
        if(event.keyCode === 88){
            if(this.leftPaddleTop < 55){
                this.leftPaddleTop = this.leftPaddleTop + 5;
                console.log(this.leftPaddleTop);
                leftPaddle.style.top = this.leftPaddleTop + 'vh';
                this.lastLeftMOVEMENT = DOWN;
            }
        }
        if(event.keyCode === 38){
            if(this.rightPaddleTop > 0){
                this.rightPaddleTop  = this.rightPaddleTop - 5;
                rightPaddle.style.top = this.rightPaddleTop + 'vh';
                this.lastRightMOVEMENT = UP;
            }
        }
        if(event.keyCode === 40){
            if(this.rightPaddleTop < 55){
                this.rightPaddleTop  = this.rightPaddleTop + 5;
                rightPaddle.style.top = this.rightPaddleTop + 'vh';
                this.lastRightMOVEMENT = DOWN;
            }
           
        }
    }

    handleStartButton(){
        this.setState({
            gameStarted: true,
            direction: LEFT
        });
        setInterval(this.movingPuckFunction, 5);
    }

   movingPuckFunction(){

        var puck = document.getElementById('puck');

        var puckMovement = 0.1;
        var puckVerticalMovement = 0.1;
        
        if(this.state.direction === LEFT){
            
            if((this.leftPaddleTop < this.puckTop && this.leftPaddleTop+15>this.puckTop) && LPL === puck.style.left){
                this.setState({
                    direction: RIGHT,
                    verticalDirection: this.lastLeftMOVEMENT
                });
            }else{

                if(this.puckTop < 0){
                    this.setState({
                        verticalDirection: DOWN
                    });
                }if(this.puckTop > 70){
                    this.setState({
                        verticalDirection: UP
                    });
                }

                this.puckLeft -= puckMovement;
                puck.style.left = this.puckLeft + 'vw';
                if(this.state.verticalDirection === UP){
                    this.puckTop -= puckVerticalMovement;
                    puck.style.top = this.puckTop+'vh';
                }
                if(this.state.verticalDirection === DOWN){
                    this.puckTop += puckVerticalMovement;
                    puck.style.top = this.puckTop+'vh';
                }
            }

            
        }
        if(this.state.direction === RIGHT){

            if((this.rightPaddleTop < this.puckTop && this.rightPaddleTop+15>this.puckTop) && RPL === puck.style.left){
                this.setState({
                    direction: LEFT,
                    verticalDirection: this.lastRightMOVEMENT
                })
            }else{

                if(this.puckTop < 0){
                    this.setState({
                        verticalDirection: DOWN
                    });
                }if(this.puckTop > 70){
                    this.setState({
                        verticalDirection: UP
                    });
                }

                this.puckLeft += puckMovement;
                puck.style.left = this.puckLeft + 'vw';
                if(this.state.verticalDirection === UP){
                    this.puckTop -= puckVerticalMovement;
                    puck.style.top = this.puckTop+'vh';
                }
                if(this.state.verticalDirection === DOWN){
                    this.puckTop += puckVerticalMovement;
                    puck.style.top = this.puckTop+'vh';
                }
            }
                
        }
   }


    render(){
        return (<div id="board" onKeyDown={this.movePaddle} tabIndex='1'>
           <div id="left-paddle"></div>
           <div id="puck"></div>
            <div id="right-paddle"></div>
            <button id="start-btn" onClick={this.handleStartButton}>Start</button>
        </div>);
    }
}





ReactDOM.render(<App />, document.getElementById('root'));