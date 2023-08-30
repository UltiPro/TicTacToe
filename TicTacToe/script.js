//tutaj
class TicTacToeCell {
    #domElement;
    #seted;

    constructor(idx, gameData) {
        this.#domElement = document.createElement("div");
        this.#domElement.classList.add("square");
        this.#domElement.addEventListener("click", () => { this.Set(idx, gameData); });
        this.#domElement.appendChild(document.createElement("div"));
        this.#seted = false;
    }

    Get = () => this.#domElement;

    Set = (idx, gameData) => {
        if (this.#seted) return;
        if (gameData.crossTurn) this.#domElement.children[0].classList.add("cross");
        else this.#domElement.children[0].classList.add("circle");
        gameData.cells[idx] = gameData.crossTurn;
        gameData.crossTurn = !gameData.crossTurn;
        this.#seted = true;
        gameData.event();
    }

    Clear = () => {
        this.#domElement.children[0].classList.remove("cross");
        this.#domElement.children[0].classList.remove("circle");
        this.#seted = false;
    }
}
//tutaj

class TicTacToe {
    #ticTacToe;
    #initPlayerModeBtn;
    #initComputerModeBtn;
    #scoreBox;
    #scoreCross;
    #scoreCircle;
    #scoreCrossSpan;
    #scoreCircleSpan;
    #gameBox;
    #gameData; //tutaj
    #gameWinningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    #gameWinningCombination; // to
    #resetBox; //tutaj

    constructor() {
        this.#ticTacToe = document.getElementById("tic-tac-toe");
        this.#scoreCross = this.#scoreCircle = 0;
        this.#gameData = { //tutaj
            gameStarted: true, // to
            cells: [null, null, null, null, null, null, null, null, null],
            crossTurn: true,
            event: null
        };
        this.#gameWinningCombination = null; // to
    }

    Init() {
        this.#initPlayerModeBtn = document.createElement("button");
        this.#initPlayerModeBtn.classList.add("button-big");
        this.#initPlayerModeBtn.innerHTML = "Player Mode";
        this.#initPlayerModeBtn.addEventListener("click", () => this.InitGame(true));
        this.#initComputerModeBtn = document.createElement("button");
        this.#initComputerModeBtn.classList.add("button-big");
        this.#initComputerModeBtn.innerHTML = "Computer Mode";
        this.#initComputerModeBtn.addEventListener("click", () => this.InitGame(false));
        this.#ticTacToe.append(this.#initPlayerModeBtn);
        this.#ticTacToe.append(this.#initComputerModeBtn);
    }

    InitGame(playerMode) {
        this.#ticTacToe.removeChild(this.#initPlayerModeBtn);
        this.#ticTacToe.removeChild(this.#initComputerModeBtn);
        this.#scoreBox = document.createElement("div");
        this.#scoreBox.classList.add("score-box");
        this.#scoreBox.innerHTML = `
            <div class="cross small"></div>
            <div>
                <span id="score-cross">0</span> : <span id="score-circle">0</span>
            </div>
            <div class="circle small"></div>
        `;
        this.#ticTacToe.append(this.#scoreBox);
        this.#scoreCrossSpan = document.getElementById("score-cross");
        this.#scoreCircleSpan = document.getElementById("score-circle");
        this.#gameBox = document.createElement("div");
        this.#gameBox.classList.add("game-box");
        this.#gameData.cells.forEach((_, idx) => {
            this.#gameBox.append(new TicTacToeCell(idx, this.#gameData).Get());
        });
        this.#ticTacToe.append(this.#gameBox);
        //tutaj
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
        //tutaj
        this.StartGame(playerMode);
    }

    StartGame(playerMode) {
        if (playerMode) this.StartGamePlayer();
        else this.StartGameComputer();
    }

    //tutaj
    StartGamePlayer() {
        const GameHandler = () => {
            if (this.CheckWin()) {
                if (this.#gameData.cells[this.#gameWinningCombination[0]] == true) {
                    this.#scoreCross++;
                    this.#scoreCrossSpan.innerText = this.#scoreCross;
                }
                else {
                    this.#scoreCircle++;
                    this.#scoreCircleSpan.innerText = this.#scoreCircle;
                }
                this.#gameData.gameStarted = false;
            }
        };
        GameHandler.bind(this);
        this.#gameData.event = GameHandler;
    }

    StartGameComputer() {
        const GameHandler = () => {

        };
        GameHandler.bind(this);
        this.#gameData.event = GameHandler;
    }
    //tutaj

    CheckWin() {
        for (const comb of this.#gameWinningCombinations) {
            if (this.#gameData.cells[comb[0]] == this.#gameData.cells[comb[1]] ==
                this.#gameData.cells[comb[2]] && this.#gameData.cells[comb[0]] != null
            ) {
                this.#gameWinningCombination = comb;
                return true;
            }
        }
        return false;
    }
}

const ticTacToe = new TicTacToe();

ticTacToe.Init();