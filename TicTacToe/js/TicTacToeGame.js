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
            this.#cells[idx] = new TicTacToeCell(idx, this.#gameData, gameBox);
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

    #StartGameComputer() {
        let chosenCombination = null;
        const RandomClick = () => {
            const possibleMoves = [];
            this.#cells.forEach((e, idx) => {
                if (e.Value == null) possibleMoves.push(idx);
            });
            this.#cells[possibleMoves[Math.floor(Math.random() * possibleMoves.length)]].Click();
        };
        const StopPlayerWin = () => {
            let returnStatus = false;
            const playerCells = this.#cells.filter(cell => cell.Value === true).map(cell => cell.Index);
            this.#gameWinningCombinations.every(comb => {
                if (returnStatus) return false;
                let matches = 0;
                for (let i = 0; i < playerCells.length; i++)
                    if (comb.includes(playerCells[i])) matches++;
                if (matches == 2 && !(this.#cells[comb[0]].Value === false ||
                    this.#cells[comb[1]].Value === false || this.#cells[comb[2]].Value === false)) {
                    this.#cells[comb.filter(index => this.#cells[index].Value === null)[0]].Click();
                    returnStatus = true;
                }
                return true;
            });
            return returnStatus;
        };
        const CanClick = (combination) => {
            if (this.#cells[combination[0]].Value != true &&
                this.#cells[combination[1]].Value != true &&
                this.#cells[combination[2]].Value != true
            ) return true;
            return false;
        }
        const ChoseCombination = (circles) => {
            let possibleCombinations = new Set();
            this.#gameWinningCombinations.forEach(comb => {
                circles.forEach(circle => {
                    if (comb.includes(circle.Index) && CanClick(comb)) possibleCombinations.add(comb);
                });
            });
            possibleCombinations = Array.from(possibleCombinations);
            if (possibleCombinations.length > 0) {
                chosenCombination = possibleCombinations[Math.floor(Math.random() * possibleCombinations.length)];
                let chosenPosition = chosenCombination[Math.floor(Math.random() * chosenCombination.length)];
                while (this.#cells[chosenPosition].Value !== null)
                    chosenPosition = chosenCombination[Math.floor(Math.random() * chosenCombination.length)];
                this.#cells[chosenPosition].Click();
                return true;
            }
            else {
                if (this.#cells[4].Value === null) this.#cells[4].Click();
                else RandomClick();
                return false;
            }
        }
        const GameHandler = () => {
            this.#MainGameHandler();
            if (this.#gameData.gameStarted) {
                const circles = this.#cells.filter(cell => cell.Value === false);
                switch (circles.length) {
                    case 0:
                        RandomClick();
                        break;
                    case 1:
                        if (!StopPlayerWin()) ChoseCombination(circles);
                        break;
                    default:
                        if (chosenCombination === null) ChoseCombination(circles);
                        else {
                            if (CanClick(chosenCombination)) {
                                this.#cells[chosenCombination[0]].Click();
                                this.#cells[chosenCombination[1]].Click();
                                this.#cells[chosenCombination[2]].Click();
                            }
                            else if (!StopPlayerWin()) {
                                if (!ChoseCombination(circles)) RandomClick();
                            }
                        }
                        break;
                }
                this.#MainGameHandler();
            }
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
        else if (this.#CheckDraw()) {
            this.#cells.forEach(cell => cell.SetActive());
            this.#StopGame();
        }
    }

    #CheckWin() {
        for (const comb of this.#gameWinningCombinations)
            if (this.#cells[comb[0]].Value == this.#cells[comb[1]].Value &&
                this.#cells[comb[1]].Value == this.#cells[comb[2]].Value &&
                this.#cells[comb[0]].Value != null
            ) {
                this.#gameWinningCombination = comb;
                return true;
            }
        return false;
    }

    #CheckDraw() {
        for (let i = 0; i < this.#cells.length; i++)
            if (this.#cells[i].Value == null) return false;
        return true;
    }

    #StopGame() {
        this.#gameData.gameStarted = false;
        this.#ticTacToe.TicTacToeReset.ActivePlayAgain();
    }

    ResetGame() {
        this.#cells.forEach(cell => cell.Clear());
        this.#gameData.gameStarted = true;
        this.#gameData.crossTurn = this.#lastTurn = !this.#lastTurn;
        this.#ticTacToe.TicTacToeReset.DisablePlayAgain();
        if (!this.#playerMode && !this.#gameData.crossTurn)
            this.#cells[Math.floor(Math.random() * this.#cells.length)].Click();
    }
}