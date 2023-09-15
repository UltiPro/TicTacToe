export class TicTacToeBase {
    #inited;

    constructor() {
        if (this.constructor === TicTacToeBase)
            throw new Error("Abstract classes can't be instantiated.");
        this.#inited = false;
    }

    Init() {
        throw new Error("Method 'Init()' must be implemented.");
        /*
            if (this._inited) throw new Error("Method 'Init()' can be initialized once.");
            this._SetInited();
        */
    }

    _SetInited = () => this.#inited = true;
}