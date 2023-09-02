export class TicTacToeReset {
    #ticTacToe;
    #mainDiv;
    #playAgainBtn;

    constructor(ticTacToe, mainDiv) {
        this.#ticTacToe = ticTacToe;
        this.#mainDiv = mainDiv;
    }

    Init() {
        const resetBox = document.createElement("div");
        resetBox.classList.add("reset-box");
        resetBox.innerHTML = `
            <button class="button-small button-slow" disabled>Play Again</button>
            <button class="button-small">Reset Game</button>
        `;
        this.#mainDiv.append(resetBox);
        this.#playAgainBtn = document.querySelector(".reset-box button:nth-child(1)");
        document.querySelector(".reset-box button:nth-child(2)").addEventListener("click", () => {
            location.reload();
        });
    }

    #ClickPlayAgain = () => this.#ticTacToe.TicTacToeGame.ResetGame();

    ActivePlayAgain() {
        this.#playAgainBtn.removeAttribute("disabled");
        this.#playAgainBtn.addEventListener("click", this.#ClickPlayAgain);
        setTimeout(function () {
            this.#playAgainBtn.classList.remove("button-slow");
        }.bind(this), 1200);
    }

    DisablePlayAgain() {
        this.#playAgainBtn.setAttribute("disabled", "");
        this.#playAgainBtn.removeEventListener("click", this.#ClickPlayAgain);
        setTimeout(function () {
            this.#playAgainBtn.classList.add("button-slow");
        }.bind(this), 1200);
    }
}