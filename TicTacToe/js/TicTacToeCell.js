import { TicTacToeBase } from './TicTacToeBase.js';

export class TicTacToeCell extends TicTacToeBase {
    #cellDiv;
    #index;
    #value;
    #gameData;

    constructor(index, gameData) {
        super();
        this.#index = index;
        this.#value = null;
        this.#gameData = gameData;
    }

    get Index() { return this.#index; }

    get Value() { return this.#value; }

    Init(gameBox) {
        if (this._inited) throw new Error("Method 'Init()' can be initialized once.");
        this.#cellDiv = document.createElement("div");
        this.#cellDiv.classList.add("square");
        this.#cellDiv.addEventListener("click", () => this.#ClickByPlayer());
        this.#cellDiv.appendChild(document.createElement("div"));
        gameBox.append(this.#cellDiv);
        this._SetInited();
        return this;
    }

    #Click() {
        if (this.#gameData.crossTurn) this.#cellDiv.children[0].classList.add("cross");
        else this.#cellDiv.children[0].classList.add("circle");
        this.#value = this.#gameData.crossTurn;
        this.#gameData.crossTurn = !this.#gameData.crossTurn;
    }

    #ClickByPlayer() {
        if (this.#value !== null || !this.#gameData.gameStarted) return;
        this.#Click();
        this.#gameData.event();
    }

    ClickByComputer() {
        if (this.#value !== null || !this.#gameData.gameStarted) return;
        this.#Click();
    }

    SetActive() { this.#cellDiv.classList.add("square-active"); }

    Clear() {
        this.#cellDiv.classList.remove("square-active");
        this.#cellDiv.children[0].classList.remove("cross");
        this.#cellDiv.children[0].classList.remove("circle");
        this.#value = null;
    }
}