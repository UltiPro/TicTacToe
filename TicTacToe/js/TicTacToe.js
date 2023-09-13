import { TicTacToeBase } from './TicTacToeBase.js';
import { TicTacToeScore } from './TicTacToeScore.js';
import { TicTacToeGame } from './TicTacToeGame.js';
import { TicTacToeReset } from './TicTacToeReset.js';

export class TicTacToe extends TicTacToeBase {
    #mainDiv;
    #ticTacToeScore;
    #ticTacToeGame;
    #ticTacToeReset;

    constructor() {
        super();
        this.#mainDiv = document.getElementById("tic-tac-toe");
        this.#ticTacToeScore = new TicTacToeScore(this.#mainDiv);
        this.#ticTacToeGame = new TicTacToeGame(this, this.#mainDiv);
        this.#ticTacToeReset = new TicTacToeReset(this, this.#mainDiv);
    }

    get TicTacToeScore() { return this.#ticTacToeScore; }

    get TicTacToeGame() { return this.#ticTacToeGame; }

    get TicTacToeReset() { return this.#ticTacToeReset; }

    Init() {
        if (this._inited) return;
        const playerModeBtn = document.createElement("button");
        playerModeBtn.classList.add("button-big");
        playerModeBtn.innerHTML = "Player Mode";
        playerModeBtn.addEventListener("click", () => this.#InitGame(true));
        const computerModeBtn = document.createElement("button");
        computerModeBtn.classList.add("button-big");
        computerModeBtn.innerHTML = "Computer Mode";
        computerModeBtn.addEventListener("click", () => this.#InitGame(false));
        this.#mainDiv.append(playerModeBtn);
        this.#mainDiv.append(computerModeBtn);
        this._inited = true;
    }

    #InitGame(playerMode) {
        this.#mainDiv.removeChild(this.#mainDiv.childNodes[0]);
        this.#mainDiv.removeChild(this.#mainDiv.childNodes[0]);
        this.#ticTacToeScore.Init();
        this.#ticTacToeGame.Init(playerMode);
        this.#ticTacToeReset.Init();
    }
}