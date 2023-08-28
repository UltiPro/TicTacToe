class TicTacToeCell {
    #DOMElement;

    constructor(idx) {
        this.#DOMElement = document.createElement("div");
        this.#DOMElement.classList.add("tictactoe-square");
        this.#DOMElement.id = "tictactoeCell" + idx;
        this.#DOMElement.addEventListener("click", () => {
            this.Set(true);
        });
        this.#DOMElement.appendChild(document.createElement("div"));
    }

    Get = () => this.#DOMElement;

    Set = (shape) => {
        if (shape == true) this.#DOMElement.children[0].classList.add("tictactoe-square-circle");
        else this.#DOMElement.children[0].classList.add("tictactoe-square-cross");
    }

    Hide = () => {
        this.#DOMElement.children[0].classList.remove("tictactoe-square-circle");
        this.#DOMElement.children[0].classList.remove("tictactoe-square-cross");
    }
}

class TicTacToe {
    #tictactoe;
    #cells = [null, null, null, null, null, null, null, null, null]
    #crossScore = 0;
    #circleScore = 0;

    constructor() {
        this.#tictactoe = document.querySelector("#tictactoe");
        this.#cells.forEach((_, idx) => {
            this.#tictactoe.append(new TicTacToeCell(idx).Get());
        });
    }

    Init() {

    }
}

const tictactoe = new TicTacToe();