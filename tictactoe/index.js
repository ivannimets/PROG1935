function main() {
    const game = document.createElement("div");
    game.id = "game";
    const header = document.createElement("h1");
    header.innerText = "TIC TAC TOE";
    const rules = document.createElement("p");
    rules.id = "rules";
    rules.innerHTML = "Game starts by just Tap on box<br><br>First Player starts as <b>Player X </b>And Second Player as  <b>Player 0</b>";
    const print = document.createElement("p");
    print.id = "print";
    [
        header,
        rules,
        CreateBoard(),
        CreateButtun(),
        print
    ].forEach((el) => game.appendChild(el));
    document.body.appendChild(game);
}

const CreateBoard = () => {
    const board = document.createElement("div");
    board.id = "board";
    for (let i = 1; i <= 3; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 1; j <= 3; j++) {
            const cell = document.createElement("input");
            cell.type = "text";
            cell.id = "cell" + (3 * (i - 1) + j);
            cell.classList.add("cell");
            cell.addEventListener("click", function (e) {
                Move((3 * (i - 1) + j));
                WinnerCheck();
            })
            cell.setAttribute('readonly', true);
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    return board;
}

const CreateButtun = () => {
    const btn = document.createElement("button");
    btn.innerText = "RESET";
    btn.id = "reset";
    btn.addEventListener("click", function (e) {
        Reset();
    })
    return btn;
}

let move = 1;
const Move = (cell) => {
    if (move == 1) { 
        document.getElementById("cell" + cell).value = "X"; 
        document.getElementById("cell" + cell).disabled = true; 
        move = 0; 
    } 
    else { 
        document.getElementById("cell" + cell).value = "0"; 
        document.getElementById("cell" + cell).disabled = true; 
        move = 1; 
    }
}

const WinnerCheck = () => {
    let cells = [];
    let cellClick = [];
    let flag = 0;
    for (let i = 0; i < 9; i++) {
        cells[i] = document.getElementById("cell" + (i + 1)).value;
        cellClick[i] = document.getElementById("cell" + (i + 1));
    }
    if (flag === 0) {
        for (let i = 0; i < 3; i++) {
            if ((cells[(i * 3)] === cells[(i * 3) + 1]) && (cells[(i * 3)] === cells[(i * 3) + 2]) && (cells[(i * 3)] != "")) {
                document.getElementById('print').innerHTML = "Player " + cells[(i * 3) + 1] + " won";
                cellClick.forEach((elem) => elem.disabled = true);
                cellClick[(i * 3)].style.color = "red";
                cellClick[(i * 3) + 1].style.color = "red";
                cellClick[(i * 3) + 2].style.color = "red";
                flag = 1;
                break;
            }
        }
    }
    if (flag === 0) {
        for (let i = 0; i < 3; i++) {
            if ((cells[i] === cells[i + 3]) && (cells[i] === cells[i + 6]) && (cells[i] != "")) {
                document.getElementById('print').innerHTML = "Player " + cells[i] + " won";
                cellClick.forEach((elem) => elem.disabled = true);
                cellClick[i].style.color = "red";
                cellClick[i + 3].style.color = "red";
                cellClick[i + 6].style.color = "red";
                flag = 1;
                break;
            }
        }
    }
    if (flag === 0) {
        if ((cells[0] === cells[4]) && (cells[0] === cells[8]) && (cells[0] != "")) {
            document.getElementById('print').innerHTML = "Player " + cells[0] + " won!!!";
            cellClick.forEach((elem) => elem.disabled = true);
            cellClick[0].style.color = "red";
            cellClick[4].style.color = "red";
            cellClick[8].style.color = "red";
            flag = 1;
        }
    }
    if (flag === 0) {
        if ((cells[2] === cells[4]) && (cells[2] === cells[6]) && (cells[2] != "")) {
            document.getElementById('print').innerHTML = "Player " + cells[2] + " won!!!";
            cellClick.forEach((elem) => elem.disabled = true);
            cellClick[2].style.color = "red";
            cellClick[4].style.color = "red";
            cellClick[6].style.color = "red";
            flag = 1;
        }
    }
    if (flag === 0) {
        let draw = 1;
        cells.forEach((elem) => {
            if (elem === "") {
                draw = 0;
            }
        })
        if (draw === 1) {
            flag =1;
            document.getElementById('print').innerHTML = "Draw!!!";
        }
    }
    if (flag === 0) {
        if (move === 1) {
            document.getElementById('print').innerHTML = "Player X Move";
        } else {
            document.getElementById('print').innerHTML = "Player 0 Move";
        }
    }
}

const Reset = () => {
    location.reload();
    for (let i = 0; i < 9; i++) {
        let cell = document.getElementById("cell" + (i + 1));
        cell.value = "";
    }
}