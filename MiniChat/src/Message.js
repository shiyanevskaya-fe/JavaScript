export default class Message {
    static #lastID = 0;

    constructor(sender, content) {
        Message.#lastID += 1;
        this.id = Message.#lastID;
        this.sender = sender;
        this.content = content;
        this.timestamp = Date.now();
    }

    getMessage() {
        return [this.sender.username, this.content, this.timestamp];
    }

    getUsername() {
        return this.sender.username;
    }

    toString() {
        return `[${this.timestamp}] ${this.sender.username}: ${this.content}`;
    }
}