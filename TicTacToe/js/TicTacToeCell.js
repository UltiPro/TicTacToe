export class TicTacToeCell {
    #elementDiv;
    #value;

    constructor(gameBox, gameData) {
        this.#elementDiv = document.createElement("div");
        this.#elementDiv.classList.add("square");
        this.#elementDiv.addEventListener("click", () => { this.#Click(gameData); });
        this.#elementDiv.appendChild(document.createElement("div"));
        gameBox.append(this.#elementDiv);
        this.#value = null;
    }

    get Value() { return this.#value; }

    #Click(gameData) {
        if (this.#value === true || this.#value === false || !gameData.gameStarted) return;
        if (gameData.crossTurn) this.#elementDiv.children[0].classList.add("cross");
        else this.#elementDiv.children[0].classList.add("circle");
        this.#value = gameData.crossTurn;
        gameData.crossTurn = !gameData.crossTurn;
        gameData.event();
    }

    Clear() {
        this.#elementDiv.children[0].classList.remove("cross");
        this.#elementDiv.children[0].classList.remove("circle");
        this.#value = null;
    }
}