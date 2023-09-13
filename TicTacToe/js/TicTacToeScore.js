import { TicTacToeBase } from './TicTacToeBase.js';

export class TicTacToeScore extends TicTacToeBase {
    #mainDiv;
    #scoreCross;
    #scoreCircle;

    constructor(mainDiv) {
        super();
        this.#mainDiv = mainDiv;
    }

    Init() {
        if (this._inited) throw new Error("Method 'Init()' can be initialized once.");
        const scoreBox = document.createElement("div");
        scoreBox.classList.add("score-box");
        scoreBox.innerHTML = `
            <div class="cross small"></div>
            <div>
                <span id="score-cross">0</span> : <span id="score-circle">0</span>
            </div>
            <div class="circle small"></div>
        `;
        this.#mainDiv.append(scoreBox);
        this.#scoreCross = document.getElementById("score-cross");
        this.#scoreCircle = document.getElementById("score-circle");
        this._inited = true;
    }

    CrossWin = () => this.#scoreCross.innerText = +this.#scoreCross.textContent + 1;

    CircleWin = () => this.#scoreCircle.innerText = +this.#scoreCircle.textContent + 1;
}