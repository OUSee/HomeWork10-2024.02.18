const targetTable = document.querySelector("#Ulist");
const serverUrl = "https://jsonplaceholder.typicode.com/users";
const sortButton = document.querySelectorAll(`.sort-button`);
var users;

class User {
    constructor(id, name, nickName, email, phone) {
        this.id = id;
        this.name = name;
        this.nickName = nickName;
        this.email = email;
        this.phone = phone;
    }
}

function RunServerApp() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            users = readJson(json);
        });

    function readJson(json) {
        users = json.map(
            (user) =>
                new User(
                    user.id,
                    user.name,
                    user.username,
                    user.email,
                    user.phone
                )
        );
        fillTable(users);

        return users;
    }

    async function fillTable(users) {
        await users.forEach((user) => createHTMLInstance(user));
    }

    function cleanTable() {
        document.querySelectorAll(`.user-info-list`).forEach((e) => e.remove());
    }

    function createHTMLInstance(user) {
        listItem = document.createElement("li");
        listItem.classList.add("user-info-list");
        listItem.innerHTML = `<div class="list-item list-name">${user.name}</div><div class="list-item list-username">${user.nickName}</div><div class="list-item list-mail">${user.email}</div><div class="list-item list-phone">${user.phone}</div>`;
        listItem.setAttribute("id", `${user.id}`);
        targetTable.append(listItem);
    }

    document.addEventListener(`click`, (event) => {
        if (event.target.classList.contains("sort-button")) {
            if (event.target.id === "sbName") {
                sorted = users.sort((a, b) => a.name.localeCompare(b.name));
                cleanTable();
                fillTable(sorted);
                console.log("sorted by name");
            } else if (event.target.id === "sbUName") {
                sorted = users.sort((a, b) =>
                    a.nickName.localeCompare(b.nickName)
                );
                cleanTable();
                fillTable(sorted);
                console.log("sorted by nick");
            } else if (event.target.id === "sbMail") {
                sorted = users.sort((a, b) => a.email.localeCompare(b.email));
                cleanTable();
                fillTable(sorted);
                console.log("sorted by mail");
            } else if (event.target.id === "sbPhone") {
                sorted = users.sort((a, b) => a.phone.localeCompare(b.phone));
                cleanTable();
                fillTable(sorted);
                console.log("sorted by phone");
            }
        }
    });
}

document.body.onload = RunServerApp();
