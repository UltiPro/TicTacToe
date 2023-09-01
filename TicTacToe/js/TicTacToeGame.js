import { TicTacToeCell } from './TicTacToeCell.js';

export class TicTacToeGame {
    #ticTacToe;
    #mainDiv;
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
    #gameWinningCombination;

    constructor(ticTacToe, mainDiv) {
        this.#ticTacToe = ticTacToe;
        this.#mainDiv = mainDiv;
        //tutaj
        this.#gameData = {
            gameStarted: true,
            cells: [null, null, null, null, null, null, null, null, null],
            crossTurn: true,
            event: null
        };
        //tutaj
    }

    Init() {
        const gameBox = document.createElement("div");
        gameBox.classList.add("game-box");
        //tutaj
        this.#gameData.cells.forEach((_, idx) => {
            this.#gameData.cells[idx] = new TicTacToeCell(idx, this.#gameData);
            gameBox.append(this.#gameData.cells[idx].Get());
        });
        //tutaj
        this.#mainDiv.append(gameBox);
    }

    StartGame(playerMode) {
        if (playerMode) this.StartGamePlayer();
        else this.StartGameComputer();
    }

    //tutaj
    StartGamePlayer() {
        const GameHandler = () => {
            if (this.CheckWin()) {
                if (this.#gameData.cells[this.#gameWinningCombination[0]].Value()) this.#ticTacToe.TicTacToeScore.CrossWin();
                else this.#ticTacToe.TicTacToeScore.CircleWin();
                this.#gameData.gameStarted = false;
                this.#ticTacToe.TicTacToeReset.ActivePlayAgain();
            }
            /*else if (this.CheckDraw()) {
                this.#gameData.gameStarted = false;
                this.#ticTacToe.TicTacToeReset.ActivePlayAgain();
            }*/
        };
        //GameHandler.bind(this);
        this.#gameData.event = GameHandler;
    }
    //tutaj

    //tutaj
    StartGameComputer() {
        //tutaj
        const GameHandler = () => {

        };
        //tutaj
        GameHandler.bind(this);
        this.#gameData.event = GameHandler;
    }
    //tutaj

    CheckWin() {
        for (const comb of this.#gameWinningCombinations) {
            if (this.#gameData.cells[comb[0]].Value() == this.#gameData.cells[comb[1]].Value() &&
                this.#gameData.cells[comb[1]].Value() == this.#gameData.cells[comb[2]].Value() &&
                this.#gameData.cells[comb[0]].Value() != null
            ) {
                this.#gameWinningCombination = comb;
                return true;
            }
        }
        return false;
    }

    //tutaj
    CheckDraw() {
        this.#gameData.cells.forEach(e => {
            if (e.Value() == null) return false;
        });
        return true;
    }

    Reset() {
        this.#gameData.gameStarted = true;
        this.#gameData.cells.forEach(e => {
            e.Clear();
        });
        this.#gameData.crossTurn; //to
    }
    //tutaj
}