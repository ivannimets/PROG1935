let grid = [];

const createPlantGrid = () => {
    // empty the current grid
    grid = [];

    // Part 2 - 1 Below
    // Write logic to get rows and columns from the input elements tree rows and tree columns
    const rows = $("#numRows").val();
    const columns = $("#numCols").val();

    // Initialize the array with the character '*' in every spot of the array
    // Do not change this loop below
    for (let y = 0; y < rows; y++) {
        grid.push([]);
        for (let x = 0; x < columns; x++) {
            grid[y][x] = '*';
        }
    }

    // Part 2 - 2 Logic Below
    // Write logic below to log to the console and then also post an alert with the same message

    loggerAlert(`“A ${rows} by ${columns} grid has been created for tree planting!`);

};

const plantTree = () => {
    // Part 3 Logic Below

    const row = $("#rowToPlant").val() - 1;
    const col = $("#colToPlant").val() - 1;
    if (validation(row, col)) {
        // validation if tree was planted or not in this coordinates
        if (grid[row][col] === '*') {
            grid[row][col] = 'Planted tree!';
            loggerAlert("Valid Coordinates, a tree has been planted here!");
        } else {
            loggerAlert("A tree already exists in this location!");
        }
    }
};

// function to validate if row/col location out of range
const validation = (row, col) => {
    let valid = true;
    if (row >= grid.length || row < 0) {
        loggerAlert("Row coordinate is not within the grid!");
        valid = false;
    }
    if (col >= grid[0].length || col < 0) {
        loggerAlert("Column coordinate is not within the grid!");
        valid = false;
    }
    // to show message if any location is wrong
    if (!valid) {
        loggerAlert("Invalid Coordinates!");
    }
    return valid;
};

const displayGridForPlantedTrees = () => {
    // Part 4 Logic Below

    console.log(grid);
    const table = document.createElement("table"); //creating table
    table.style = "border-collapse: collapse;";
    for (let i = 0; i < grid.length; i++) { // in every row of grid cteating new <tr> and append it to <table>
        const tr = document.createElement("tr"); 
        for (let j = 0; j < grid[0].length; j++) { //in every columnt of grid creating <td> and appendig it to <tr>
            const td = document.createElement("td");
            td.style = "border: 2px solid black;";
            const text = document.createTextNode(grid[i][j]); // taking text from grid and put it to <td>
            td.appendChild(text);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.getElementById("tableGrid").appendChild(table); // put table to div
};

// Part 5 - 1 below

const loggerAlert = (message) => {
    console.log(message);
    alert(message);
}