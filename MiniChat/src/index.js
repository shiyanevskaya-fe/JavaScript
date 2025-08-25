import User from "./User.js";
import Chat from "./Chat.js";

const chat = new Chat();

const alice = new User("Alice");
const bob = new User("Bob");

chat.addUser(alice);
chat.addUser(bob);

alice.goOnline();
bob.goOnline();

const history = document.querySelector(".history");
const fieldContent = document.querySelector('input[name=ms-content]');
const btn = document.querySelector('button');
const fieldSelect = document.querySelector('select[name=user]');

let users = chat.getUsers();
for (let user of users) {
    let option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.username;
    fieldSelect.append(option);
}

function renderHistory() {
    let elem = '';
    chat.getHistory().forEach(m => {
        let [username, content, date] = m.getMessage();
        let d = new Date(date);
        let formatted = d.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        elem += `<div class='message ${username === 'Alice' ? 'first' : 'second'}'>
                    <div class='username'>${username}</div>
                    <div class='content'>${content}</div>
                    <div class='date'>${formatted}</div>
                </div>`;
    });

    history.innerHTML = elem;
}

renderHistory();

btn.onclick = () => {
    let content = fieldContent.value.trim();
    if (!content) return;

    let selectedUserId = parseInt(fieldSelect.value, 10);
    chat.sendMessage(selectedUserId, content);

    fieldContent.value = '';
    renderHistory();

    // Автоскролл вниз
    history.scrollTop = history.scrollHeight;
};

