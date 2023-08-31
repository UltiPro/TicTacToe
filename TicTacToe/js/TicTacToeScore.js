export class TicTacToeScore {
    #ticTacToe;
    #scoreCross;
    #scoreCircle;

    constructor(ticTacToe) {
        this.#ticTacToe = ticTacToe;
    }

    Init() {
        const scoreBox = document.createElement("div");
        scoreBox.classList.add("score-box");
        scoreBox.innerHTML = `
            <div class="cross small"></div>
            <div>
                <span id="score-cross">0</span> : <span id="score-circle">0</span>
            </div>
            <div class="circle small"></div>
        `;
        this.#ticTacToe.mainDiv.append(scoreBox);
        this.#scoreCross = document.getElementById("score-cross");
        this.#scoreCircle = document.getElementById("score-circle");
    }

    CrossWin = () => this.#scoreCross.innerText = +this.#scoreCross.textContent + 1;

    CircleWin = () => this.#scoreCircle.innerText = +this.#scoreCircle.textContent + 1;
}