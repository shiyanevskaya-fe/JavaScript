import Message from "./Message.js";


export default class Chat {
    #users = [];
    #messages = [];

    constructor() {

    }

    addUser(user) {
        this.#users.push(user);
    }

    removeUser(userId) {
        let removed_user_id = this.#users.findIndex(user => user.id === userId);
        this.#users.splice(removed_user_id, 1);
    }

    sendMessage(userId, content) {
        let sender = this.#users.find(user => user.id === userId);
        if (!sender) {
            throw new Error("Пользователь не найден");
        } else if (!sender.isOnline) {
            throw new Error("Пользователь оффлайн и не может отправить сообщение");
        } else if (!content.trim()) {
            throw new Error("Нельзя отправить пустое сообщение");
        } else {
            this.#messages.push(new Message(sender, content));
        }
    }

    getHistory(limit = 10) {
        if (this.#messages.length > limit) {
            let history = [];

            for (let i = this.#messages.length - limit; i < this.#messages.length; i++) {
                history.push(this.#messages[i]);
            }

            return history;
        } else {
            return this.#messages;
        }
    }

    getUsers(){
        return this.#users.concat();
    }
}