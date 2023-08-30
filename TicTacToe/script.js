class TicTacToeCell {
    #domElement;
    #seted;

    constructor(idx, gameData) {
        this.#domElement = document.createElement("div");
        this.#domElement.classList.add("square");
        this.#domElement.setAttribute("data-square-cell", idx); //to?
        this.#domElement.addEventListener("click", () => { this.Set(gameData); });
        this.#domElement.appendChild(document.createElement("div"));
        this.#seted = false;
    }

    Get = () => this.#domElement;

    Set = (gameData) => {
        if (this.#seted) return;
        if (gameData.crossTurn) this.#domElement.children[0].classList.add("cross");
        else this.#domElement.children[0].classList.add("circle");
        gameData.crossTurn = !gameData.crossTurn;
        this.#seted = true;
    }

    Clear = () => {
        this.#domElement.children[0].classList.remove("cross");
        this.#domElement.children[0].classList.remove("circle");
        this.#seted = false;
    }
}

class TicTacToe {
    #ticTacToe;
    #gameModePlayerBtn;
    #gameModeComputerBtn;
    #scoreBox;
    #scoreCross;
    #scoreCircle;
    #gameBox;
    #gameData;
    #resetBox;

    constructor() {
        this.#ticTacToe = document.getElementById("tic-tac-toe");
        this.#scoreCross = this.#scoreCircle = 0;
        this.#gameData = {
            cells: [null, null, null, null, null, null, null, null, null],
            crossTurn: true
        };
    }

    Init() {
        this.#gameModePlayerBtn = document.createElement("button");
        this.#gameModePlayerBtn.classList.add("button-big");
        this.#gameModePlayerBtn.innerHTML = "Player Mode";
        this.#gameModePlayerBtn.addEventListener("click", () => this.LunchGame(true));
        this.#gameModeComputerBtn = document.createElement("button");
        this.#gameModeComputerBtn.classList.add("button-big");
        this.#gameModeComputerBtn.innerHTML = "Computer Mode";
        this.#gameModeComputerBtn.addEventListener("click", () => this.LunchGame(false));
        this.#ticTacToe.append(this.#gameModePlayerBtn);
        this.#ticTacToe.append(this.#gameModeComputerBtn);
    }

    LunchGame(playerMode) {
        this.#ticTacToe.removeChild(this.#gameModePlayerBtn);
        this.#ticTacToe.removeChild(this.#gameModeComputerBtn);
        this.#scoreBox = document.createElement("div");
        this.#scoreBox.classList.add("score-box");
        this.#scoreBox.innerHTML = `
            <div class="cross small"></div>
            <div>
                <span id="score-cross">0</span> : <span id="score-circle">0</span>
            </div>
            <div class="circle small"></div>
        `;
        this.#scoreCross = document.getElementById("score-cross");
        this.#scoreCircle = document.getElementById("score-circle");
        this.#ticTacToe.append(this.#scoreBox);
        this.#gameBox = document.createElement("div");
        this.#gameBox.classList.add("game-box");
        this.#gameData.cells.forEach((_, idx) => {
            this.#gameBox.append(new TicTacToeCell(idx, this.#gameData).Get());
        });
        this.#ticTacToe.append(this.#gameBox);
        this.#resetBox = document.createElement("div");
        this.#resetBox.classList.add("reset-box");
        this.#resetBox.innerHTML = `
            <button class="button-small" disabled>Play again</button>
            <button class="button-small">Change Mode</button>
        `;
        this.#ticTacToe.append(this.#resetBox);
        document.querySelector(".reset-box button:nth-child(2)").addEventListener("click", () => {
            location.reload();
        });
    }
}

const tictactoe = new TicTacToe();

tictactoe.Init();