export class TicTacToeReset {
    #ticTacToe;
    #mainDOMElement
    #playAgainBtn;

    constructor(ticTacToe, mainDOMElement) {
        this.#ticTacToe = ticTacToe;
        this.#mainDOMElement = mainDOMElement;
    }

    Init() {
        const resetBox = document.createElement("div");
        resetBox.classList.add("reset-box");
        resetBox.innerHTML = `
            <button class="button-small" disabled>Play Again</button>
            <button class="button-small">Change Mode</button>
        `;
        this.#mainDOMElement.append(resetBox);
        this.#playAgainBtn = document.querySelector(".reset-box button:nth-child(1)");
        document.querySelector(".reset-box button:nth-child(2)").addEventListener("click", () => {
            location.reload();
        });
    }

    ActivePlayAgain() {
        this.#playAgainBtn.removeAttribute("disabled");
        this.#playAgainBtn.addEventListener("click", this.ClickPlayAgainEvent);
    }

    DisablePlayAgain() {
        this.#playAgainBtn.setAttribute("disabled", true);
        this.#playAgainBtn.removeEventListener("click", this.ClickPlayAgainEvent);
    }

    ClickPlayAgainEvent = () => this.#ticTacToe.Reset()
}