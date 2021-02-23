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
const LEFT_WINS = 'LEFT WINS';
const RIGHT_WINS = 'RIGHT WINS';

class App extends React.Component {
    render(){
        return (<div id="app">
            <h1>NOT-PONG</h1>
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
            verticalDirection: NONE,
            leftScore: 0, 
            rightScore: 0,
            message: ''
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
        
        this.inter = null;
        
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
        this.inter = setInterval(this.movingPuckFunction, 5);
        
    }

   movingPuckFunction(){

        if(this.puckLeft>80){
            clearInterval(this.inter);
            this.setState({
                gameStarted : false,
                leftScore : this.state.leftScore + 1
            });
            this.puckLeft = 38;
            this.puckTop = 33;
            // console.log('interval cleared  > 80');
            if(this.state.leftScore === 11){
                this.setState({message: LEFT_WINS});
            }
        }
        if(this.puckLeft<-2){
            clearInterval(this.inter);
            this.setState({
                gameStarted : false,
                rightScore : this.state.rightScore + 1
            });
            this.puckLeft = 38;
            this.puckTop = 33;
            // console.log('interval cleared  < 0')
            if(this.state.rightScore === 11){
                this.setState({message: RIGHT_WINS});
            }
        }
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
            <div id="scoreboard">
                <div id='leftscore'><h2>Left: {this.state.leftScore}</h2></div>
                <div id='rightscore'><h2>Right: {this.state.rightScore}</h2></div>
            </div>
            <div id="win-message">{this.state.message}</div>
           <div id="left-paddle"></div>
           <div id="puck"></div>
            <div id="right-paddle"></div>
            <button id="start-btn" onClick={this.handleStartButton}>Serve</button>
        </div>);
    }
}





ReactDOM.render(<App />, document.getElementById('root'));