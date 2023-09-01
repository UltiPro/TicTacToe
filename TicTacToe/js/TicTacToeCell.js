export class TicTacToeCell {
    //tutaj
    #domElement;
    #seted;

    constructor(idx, gameData) {
        this.#domElement = document.createElement("div");
        this.#domElement.classList.add("square");
        this.#domElement.addEventListener("click", () => { this.Set(idx, gameData); });
        this.#domElement.appendChild(document.createElement("div"));
        this.#seted = null;
    }

    Get = () => this.#domElement;

    Set = (idx, gameData) => {
        if (this.#seted === true || this.#seted === false || !gameData.gameStarted) return;
        if (gameData.crossTurn) this.#domElement.children[0].classList.add("cross");
        else this.#domElement.children[0].classList.add("circle");
        this.#seted = gameData.crossTurn;
        gameData.crossTurn = !gameData.crossTurn;
        gameData.event();
    }

    Clear = () => {
        this.#domElement.children[0].classList.remove("cross");
        this.#domElement.children[0].classList.remove("circle");
        this.#seted = null;
    }

    Value = () => this.#seted;
    //tutaj
}