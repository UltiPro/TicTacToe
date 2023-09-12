export class TicTacToeCell {
    #cellDiv;
    #index;
    #value;
    #gameData;

    constructor(index, gameData, gameBox) {
        this.#cellDiv = document.createElement("div");
        this.#cellDiv.classList.add("square");
        this.#cellDiv.addEventListener("click", () => this.#ClickByPlayer());
        this.#cellDiv.appendChild(document.createElement("div"));
        this.#index = index;
        this.#value = null;
        this.#gameData = gameData;
        gameBox.append(this.#cellDiv);
    }

    get Index() { return this.#index; }

    get Value() { return this.#value; }

    Click() {
        if (this.#gameData.crossTurn) this.#cellDiv.children[0].classList.add("cross");
        else this.#cellDiv.children[0].classList.add("circle");
        this.#value = this.#gameData.crossTurn;
        this.#gameData.crossTurn = !this.#gameData.crossTurn;
    }

    #ClickByPlayer() {
        if (this.#value !== null || !this.#gameData.gameStarted) return;
        this.Click();
        this.#gameData.event();
    }

    ClickByComputer() {
        if (this.#value !== null || !this.#gameData.gameStarted) return;
        this.Click();
    }

    SetActive() { this.#cellDiv.classList.add("square-active"); }

    Clear() {
        this.#cellDiv.classList.remove("square-active");
        this.#cellDiv.children[0].classList.remove("cross");
        this.#cellDiv.children[0].classList.remove("circle");
        this.#value = null;
    }
}