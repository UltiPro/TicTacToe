class TicTacToeCell {
    #DOMElement;

    constructor(idx, shape) {
        this.#DOMElement = document.createElement("div");
        this.#DOMElement.classList.add("tic-tac-toe-game-square");
        this.#DOMElement.id = "tic-tac-toe-game-square-cell-" + idx;
        this.#DOMElement.addEventListener("click", () => {
            this.Set(shape.turn);
            shape.turn = !shape.turn;
        });
        this.#DOMElement.appendChild(document.createElement("div"));
    }

    Get = () => this.#DOMElement;

    Set = (shape) => {
        if (shape == true) this.#DOMElement.children[0].classList.add("tic-tac-toe-game-square-circle");
        else this.#DOMElement.children[0].classList.add("tic-tac-toe-game-square-cross");
    }

    Hide = () => {
        this.#DOMElement.children[0].classList.remove("tic-tac-toe-game-square-circle");
        this.#DOMElement.children[0].classList.remove("tic-tac-toe-game-square-cross");
    }
}

class TicTacToe {
    #ticTacToe;
    #ticTacToeGamePlayerBtn;
    #ticTacToeGameComputerBtn;
    #ticTacToeScore;
    #ticTacToeScoreCross;
    #ticTacToeScoreCircle;
    #ticTacToeGame;
    #ticTacToeReset;
    #ticTacToeResetPlay;
    #ticTacToeResetReset;
    #cells;
    #shapeTurn;
    #crossScore;
    #circleScore;

    constructor() {
        this.#ticTacToe = document.getElementById("tic-tac-toe");
        this.#cells = [null, null, null, null, null, null, null, null, null];
        this.#shapeTurn = { crossTurn: true };
        this.#crossScore = this.#circleScore = 0;
    }

    Init() {
        this.#ticTacToeGamePlayerBtn = document.createElement("button");
        this.#ticTacToeGamePlayerBtn.classList.add("tic-tac-toe-btn");
        this.#ticTacToeGamePlayerBtn.innerHTML = "Player Mode";
        this.#ticTacToeGamePlayerBtn.addEventListener("click", () => this.LunchGame(true));
        this.#ticTacToeGameComputerBtn = document.createElement("button");
        this.#ticTacToeGameComputerBtn.classList.add("tic-tac-toe-btn");
        this.#ticTacToeGameComputerBtn.innerHTML = "Computer Mode";
        this.#ticTacToeGameComputerBtn.addEventListener("click", () => this.LunchGame(false));
        this.#ticTacToe.append(this.#ticTacToeGamePlayerBtn);
        this.#ticTacToe.append(this.#ticTacToeGameComputerBtn);
    }

    LunchGame(playerMode) {
        this.#ticTacToe.removeChild(this.#ticTacToeGamePlayerBtn);
        this.#ticTacToe.removeChild(this.#ticTacToeGameComputerBtn);
        this.#ticTacToeScore = document.createElement("div");
        this.#ticTacToeScore.classList.add("tic-tac-toe-score");
        this.#ticTacToeScore.innerHTML = `
            <div class="tic-tac-toe-game-square-cross" style="transform: scale(0.6) rotate(45deg);"></div>
            <div>
                <span id="tic-tac-toe-score-cross">0</span>
                <span>:</span>
                <span id="tic-tac-toe-score-circle">0</span>
            </div>
            <div class="tic-tac-toe-game-square-circle" style="transform: scale(0.6);"></div>
        `;
        this.#ticTacToeScoreCross = document.getElementById("tic-tac-toe-score-cross");
        this.#ticTacToeScoreCircle = document.getElementById("tic-tac-toe-score-circle");
        this.#ticTacToe.append(this.#ticTacToeScore);
        this.#ticTacToeGame = document.createElement("div");
        this.#ticTacToeGame.classList.add("tic-tac-toe-game");
        this.#cells.forEach((_, idx) => {
            this.#ticTacToeGame.append(new TicTacToeCell(idx, this.#shapeTurn).Get());
        });
        this.#ticTacToe.append(this.#ticTacToeGame);
        this.#ticTacToeReset = document.createElement("div");
        this.#ticTacToeReset.classList.add("tic-tac-toe-reset");
        this.#ticTacToeReset.innerHTML = `
            <button id="tic-tac-toe-reset-play" class="tic-tac-toe-btn" style="width: 47%; margin-right: 5%;">Play again</button>
            <button id="tic-tac-toe-reset-reset" class="tic-tac-toe-btn" style="width: 47%">Change Mode</button>
        `;
        this.#ticTacToeResetPlay = document.getElementById("tic-tac-toe-reset-play");
        this.#ticTacToe.append(this.#ticTacToeReset);
        document.getElementById("tic-tac-toe-reset-reset").addEventListener("click", () => {
            location.reload();
        });
    }
}

const tictactoe = new TicTacToe();

tictactoe.Init();