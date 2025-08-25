export default class User {
    static #lastID = 0;

    constructor(username) {
        User.#lastID += 1;
        this.id = User.#lastID;
        this.username = username;
    }

    goOnline() {
        this.isOnline = true;
    }

    goOffline() {
        this.isOnline = false;
    }

    toString() {
        return `${this.username}`;
    }
}