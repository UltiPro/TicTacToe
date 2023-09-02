export class TicTacToeCell {
    #elementDiv;
    #gameData;
    #value;

    constructor(gameBox, gameData) {
        this.#elementDiv = document.createElement("div");
        this.#elementDiv.classList.add("square");
        this.#elementDiv.addEventListener("click", () => { this.#Click(); });
        this.#elementDiv.appendChild(document.createElement("div"));
        gameBox.append(this.#elementDiv);
        this.#gameData = gameData;
        this.#value = null;
    }

    get Value() { return this.#value; }

    #Click() {
        if (this.#value === true || this.#value === false || !this.#gameData.gameStarted) return;
        if (this.#gameData.crossTurn) this.#elementDiv.children[0].classList.add("cross");
        else this.#elementDiv.children[0].classList.add("circle");
        this.#value = this.#gameData.crossTurn;
        this.#gameData.crossTurn = !this.#gameData.crossTurn;
        this.#gameData.event();
    }

    ClickByComputer() {
        if (!this.#gameData.gameStarted) return;
        if (this.#gameData.crossTurn) this.#elementDiv.children[0].classList.add("cross");
        else this.#elementDiv.children[0].classList.add("circle");
        this.#value = this.#gameData.crossTurn;
        this.#gameData.crossTurn = !this.#gameData.crossTurn;
    }

    SetActive() {
        this.#elementDiv.classList.add("square-active");
    }

    Clear() {
        this.#elementDiv.classList.remove("square-active");
        this.#elementDiv.children[0].classList.remove("cross");
        this.#elementDiv.children[0].classList.remove("circle");
        this.#value = null;
    }
}