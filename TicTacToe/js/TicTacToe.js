import { TicTacToeScore } from './TicTacToeScore.js';
import { TicTacToeGame } from './TicTacToeGame.js';
import { TicTacToeReset } from './TicTacToeReset.js';

export class TicTacToe {
    ticTacToeDiv;
    ticTacToeScore;
    ticTacToeGame;
    ticTacToeReset;

    constructor() {
        this.ticTacToeDiv = document.getElementById("tic-tac-toe");
        this.ticTacToeScore = new TicTacToeScore(this);
        this.ticTacToeGame = new TicTacToeGame(this);
        this.ticTacToeReset = new TicTacToeReset(this);
    }

    Init() {
        const playerModeBtn = document.createElement("button");
        playerModeBtn.classList.add("button-big");
        playerModeBtn.innerHTML = "Player Mode";
        playerModeBtn.addEventListener("click", () => this.InitGame(true));
        const computerModeBtn = document.createElement("button");
        computerModeBtn.classList.add("button-big");
        computerModeBtn.innerHTML = "Computer Mode";
        computerModeBtn.addEventListener("click", () => this.InitGame(false));
        this.ticTacToeDiv.append(playerModeBtn);
        this.ticTacToeDiv.append(computerModeBtn);
    }

    InitGame(playerMode) {
        this.ticTacToeDiv.removeChild(this.ticTacToeDiv.childNodes[0]);
        this.ticTacToeDiv.removeChild(this.ticTacToeDiv.childNodes[0]);
        this.ticTacToeScore.Init();
        this.ticTacToeGame.Init();
        this.ticTacToeReset.Init();
        this.ticTacToeGame.StartGame(playerMode);
    }
}