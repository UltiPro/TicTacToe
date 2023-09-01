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
            <button class="button-small" disabled>Play Again</button>
            <button class="button-small">Change Mode</button>
        `;
        this.#mainDiv.append(resetBox);
        this.#playAgainBtn = document.querySelector(".reset-box button:nth-child(1)");
        document.querySelector(".reset-box button:nth-child(2)").addEventListener("click", () => {
            location.reload();
        });
    }

    #ClickPlayAgain = () => this.#ticTacToe.TicTacToeGame.Reset();

    ActivePlayAgain() {
        this.#playAgainBtn.removeAttribute("disabled");
        this.#playAgainBtn.addEventListener("click", this.#ClickPlayAgain);
    }

    DisablePlayAgain() {
        this.#playAgainBtn.setAttribute("disabled", "");
        this.#playAgainBtn.removeEventListener("click", this.#ClickPlayAgain);
    }
}