export class TicTacToeCell {
    #elementDiv;
    #index;
    #value;
    #gameData;

    constructor(index, gameData, gameBox) {
        this.#elementDiv = document.createElement("div");
        this.#elementDiv.classList.add("square");
        this.#elementDiv.addEventListener("click", () => this.#ClickByPlayer());
        this.#elementDiv.appendChild(document.createElement("div"));
        this.#index = index;
        this.#value = null;
        this.#gameData = gameData;
        gameBox.append(this.#elementDiv);
    }

    get Index() { return this.#index; }

    get Value() { return this.#value; }

    Click() {
        if (this.#value !== null || !this.#gameData.gameStarted) return;
        if (this.#gameData.crossTurn) this.#elementDiv.children[0].classList.add("cross");
        else this.#elementDiv.children[0].classList.add("circle");
        this.#value = this.#gameData.crossTurn;
        this.#gameData.crossTurn = !this.#gameData.crossTurn;
    }

    #ClickByPlayer() {
        this.Click();
        this.#gameData.event();
    }

    SetActive() { this.#elementDiv.classList.add("square-active"); }

    Clear() {
        this.#elementDiv.classList.remove("square-active");
        this.#elementDiv.children[0].classList.remove("cross");
        this.#elementDiv.children[0].classList.remove("circle");
        this.#value = null;
    }
}