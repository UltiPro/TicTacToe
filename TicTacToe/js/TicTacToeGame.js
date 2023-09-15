import { TicTacToeBase } from './TicTacToeBase.js';
import { TicTacToeCell } from './TicTacToeCell.js';

export class TicTacToeGame extends TicTacToeBase {
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
        super();
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

    Init(playerMode) {
        if (this._inited) throw new Error("Method 'Init()' can be initialized once.");
        this.#playerMode = playerMode;
        const gameBox = document.createElement("div");
        gameBox.classList.add("game-box");
        this.#cells.forEach((_, idx) => {
            this.#cells[idx] = new TicTacToeCell(idx, this.#gameData).Init(gameBox);
        });
        this.#mainDiv.append(gameBox);
        if (this.#playerMode) this.#StartGamePlayer();
        else this.#StartGameComputer();
        this._SetInited();
    }

    #StartGamePlayer() {
        const GameHandler = () => this.#MainGameHandler();
        this.#gameData.event = GameHandler;
    }

    #StartGameComputer() {
        let computerCombinations = [];
        let chosenCombination = null;
        const ComputerCombinations = () => {
            const crosses = this.#cells.filter(cell => cell.Value === true);
            computerCombinations = computerCombinations.filter(combination => {
                for (let i = 0; i < crosses.length; i++)
                    if (combination.includes(crosses[i].Index)) return false;
                return true;
            });
        };
        const ChooseBestCombination = (circles, countOfMatching) => {
            if (countOfMatching == 0) return null;
            let possibleCombinations = [];
            let matching = 0;
            computerCombinations.forEach(combination => {
                for (let i = 0; i < circles.length; i++)
                    if (combination.includes(circles[i].Index)) matching++;
                if (matching == countOfMatching) possibleCombinations.push(combination);
                matching = 0;
            });
            if (possibleCombinations.length == 0) return ChooseBestCombination(circles, countOfMatching - 1);
            return possibleCombinations[Math.floor(Math.random() * possibleCombinations.length)];
        };
        const ChooseCombination = (circles) => {
            ComputerCombinations();
            if (computerCombinations.length > 0) {
                chosenCombination = ChooseBestCombination(circles, 2);
                if (chosenCombination === null) chosenCombination = computerCombinations[Math.floor(Math.random() * computerCombinations.length)];
            }
            else chosenCombination = null;
        };
        const Click = () => {
            if (chosenCombination === null) return;
            let position = Math.floor(Math.random() * chosenCombination.length);
            while (this.#cells[chosenCombination[position]].Value !== null)
                position = position == 2 ? 0 : ++position;
            this.#cells[chosenCombination[position]].ClickByComputer();
        };
        const LastToClick = () => {
            if (chosenCombination === null) return false;
            let count = 0;
            for (let i = 0; i < chosenCombination.length; i++)
                if (this.#cells[chosenCombination[i]].Value === null) count++;
            return count > 1 ? false : true;
        };
        const StopPlayerWin = () => {
            let returnStatus = false;
            //tutaj
            const playerCells = this.#cells.filter(cell => cell.Value === true).map(cell => cell.Index);
            this.#gameWinningCombinations.every(comb => {
                if (returnStatus) return false;
                let matches = 0;
                for (let i = 0; i < playerCells.length; i++)
                    if (comb.includes(playerCells[i])) matches++;
                if (matches == 2 && !(this.#cells[comb[0]].Value === false ||
                    this.#cells[comb[1]].Value === false || this.#cells[comb[2]].Value === false)) {
                    this.#cells[comb.filter(index => this.#cells[index].Value === null)[0]].ClickByComputer();
                    returnStatus = true;
                }
                return true;
            });
            //tutaj
            return returnStatus;
        };
        const GameHandler = () => {
            this.#MainGameHandler();
            if (this.#gameData.gameStarted && !this.#gameData.crossTurn) {
                const circles = this.#cells.filter(cell => cell.Value === false);
                if (circles.length == 0) computerCombinations = Array.from(this.#gameWinningCombinations);
                ChooseCombination(circles);
                switch (circles.length) {
                    case 0:
                        Click();
                        break;
                    case 1:
                        if (!StopPlayerWin()) Click();
                        break;
                    default:
                        if (LastToClick()) Click();
                        else if (!StopPlayerWin()) {
                            if (chosenCombination !== null) Click();
                            else {
                                this.#cells.every(cell => {
                                    if (cell.Value === null) {
                                        cell.ClickByComputer();
                                        return false;
                                    }
                                    return true;
                                });
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
            this.#cells.forEach(cell => cell.RemoveHover());
            this.#cells[this.#gameWinningCombination[0]].SetActive();
            this.#cells[this.#gameWinningCombination[1]].SetActive();
            this.#cells[this.#gameWinningCombination[2]].SetActive();
            this.#StopGame();
        }
        else if (this.#CheckDraw()) {
            this.#cells.forEach(cell => {
                cell.RemoveHover()
                cell.SetActive()
            });
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
            if (this.#cells[i].Value === null) return false;
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
        if (!this.#playerMode && !this.#gameData.crossTurn) this.#gameData.event();
    }
}