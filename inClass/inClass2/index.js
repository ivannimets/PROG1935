class User {
    constructor(name, age, height) {
        this.name = name;
        this.age = age;
        this.height = height;
    }
}

const users = [];

function AddUserToList() {
    const name = document.getElementById("nameInput");
    const age = document.getElementById("ageInput");
    const height = document.getElementById("heightInput");
    users.push(new User(name.value, age.value, height.value));
    name.value = "";
    age.value = "";
    height.value = "";
}
function ShowUser() {
    const information = document.getElementById("information");
    const name = document.getElementById("nameToShow").value;
    if (name){
        if (users.some(e => e.name === name)) {
            let i = 0;
            while (users[i].name != name) {
                i++;
            }
            information.innerText = "Age = " + users[i].age + " Height = " + users[i].height;
        }
        else {
            information.innerText = "Not found";
        }
    }
}