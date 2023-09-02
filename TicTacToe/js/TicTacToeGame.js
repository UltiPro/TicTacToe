import { TicTacToeCell } from './TicTacToeCell.js';

export class TicTacToeGame {
    #ticTacToe;
    #mainDiv;
    #cells;
    #gameData;
    #playerMode;
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
    #gameWinningCombination;
    #lastTurn;

    constructor(ticTacToe, mainDiv) {
        this.#ticTacToe = ticTacToe;
        this.#mainDiv = mainDiv;
        this.#cells = [null, null, null, null, null, null, null, null, null];
        this.#gameData = {
            gameStarted: true,
            crossTurn: true,
            event: null
        };
        this.#lastTurn = this.#gameData.crossTurn;
    }

    Init() {
        const gameBox = document.createElement("div");
        gameBox.classList.add("game-box");
        this.#cells.forEach((_, idx) => {
            this.#cells[idx] = new TicTacToeCell(gameBox, this.#gameData);
        });
        this.#mainDiv.append(gameBox);
    }

    StartGame(playerMode) {
        this.#playerMode = playerMode;
        if (this.#playerMode) this.#StartGamePlayer();
        else this.#StartGameComputer();
    }

    #StartGamePlayer() {
        const GameHandler = () => this.#MainGameHandler();
        this.#gameData.event = GameHandler;
    }

    //tutaj
    #StartGameComputer() {
        const GameHandler = () => {
            this.#MainGameHandler();
            const possibleMoves = [];
            this.#cells.forEach((e, idx) => {
                if (e.Value == null) possibleMoves.push(idx);
            });
            if (possibleMoves.length > 0) this.#cells[possibleMoves[Math.floor(Math.random() * possibleMoves.length)]].ClickByComputer(this.#gameData);
            if (this.#gameData.gameStarted) this.#MainGameHandler();
        };
        this.#gameData.event = GameHandler;
    }

    #MainGameHandler() {
        if (this.#CheckWin()) {
            if (this.#cells[this.#gameWinningCombination[0]].Value) this.#ticTacToe.TicTacToeScore.CrossWin();
            else this.#ticTacToe.TicTacToeScore.CircleWin();
            this.#cells[this.#gameWinningCombination[0]].SetActive();
            this.#cells[this.#gameWinningCombination[1]].SetActive();
            this.#cells[this.#gameWinningCombination[2]].SetActive();
            this.#StopGame();
        }
        else if (this.#CheckDraw()) this.#StopGame();
    }
    //tutaj

    #CheckWin() {
        for (const comb of this.#gameWinningCombinations) {
            if (this.#cells[comb[0]].Value == this.#cells[comb[1]].Value &&
                this.#cells[comb[1]].Value == this.#cells[comb[2]].Value &&
                this.#cells[comb[0]].Value != null
            ) {
                this.#gameWinningCombination = comb;
                return true;
            }
        }
        return false;
    }

    #CheckDraw() {
        for (let i = 0; i < this.#cells.length; i++) {
            if (this.#cells[i].Value == null) {
                return false;
            }
        }
        return true;
    }

    #StopGame() {
        this.#gameData.gameStarted = false;
        this.#ticTacToe.TicTacToeReset.ActivePlayAgain();
    }

    ResetGame() {
        this.#cells.forEach(cell => {
            cell.Clear();
        });
        this.#gameData.gameStarted = true;
        this.#gameData.crossTurn = this.#lastTurn = !this.#lastTurn;
        this.#ticTacToe.TicTacToeReset.DisablePlayAgain();
        if (!this.#playerMode && !this.#gameData.crossTurn) {
            this.#cells[Math.floor(Math.random() * this.#cells.length)].ClickByComputer();
        }
    }
}