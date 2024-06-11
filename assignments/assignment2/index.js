//creating class to make it easier to wokr with items in future
class Item {
    constructor(name, price, amountInCart) {
        this.name = name;
        this.price = price;
        this.amountInCart = amountInCart;
    }
}
// create array of items
const items = [];
items[0] = new Item("Caps", 20, 0);
items[1] = new Item("Water Bottles", 5, 0);
items[2] = new Item("Pens", 2, 0);
items[3] = new Item("Candy Bags", 10, 0);
items[4] = new Item("Cup Cakes", 3, 0);

//function for checkout button
function CheckoutClicked() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const creditCardNum = document.getElementById("creditCardNum");
    const creditCardExpMonth = document.getElementById("creditCardExpMonth");
    const creditCardExpYear = document.getElementById("creditCardExpYear");

    //filling amount of items in cart 
    items[0].amountInCart = document.getElementById("numCaps").value;
    items[1].amountInCart = document.getElementById("numBottles").value;
    items[2].amountInCart = document.getElementById("numPens").value;
    items[3].amountInCart = document.getElementById("numCandyBags").value;
    items[4].amountInCart = document.getElementById("numCupCakes").value;

    //call validation and get answer
    const validation = Validation(name, email, creditCardNum, creditCardExpMonth, creditCardExpYear);

    //if answer is empty than code move forward, else show the problem on errors field
    if (validation === "") {
        document.getElementById("error").style.display = "none";
        document.getElementById("form").style.display = "none";
        document.getElementById("receipt").style.display = "grid";
        document.getElementById("usersName").innerText = name.value;
        document.getElementById("usersEmail").innerText = email.value;
        document.getElementById("usersCreditCard").innerText = "xxxx-xxxx-xxxx-" + creditCardNum.value.slice(-4);
        ReceiptPrinting();
    }
    else {
        const error = document.getElementById("error");
        error.innerText = validation;
        error.style.display = "block";
    }
}

//functions for validations
function Validation(name, email, cardNum, monthExp, yearExp) {
    let validation = "";
    let regex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (!name.value) {
        validation += "Name is required\n";
    }
    if (!email.value) {
        validation += "Email is required\n";
    }
    if (!cardNum.value) {
        validation += "Credit Card Number is required\n";
    } else {
        if (!regex.test(cardNum.value)) {
            validation += "Credit Card Number must match with \"xxxx-xxxx-xxxx-xxxx\" pattern\n";
        }
    }
    if (!monthExp.value) {
        validation += "Credit Card Expiry Month is required\n";
    } else {
        regex = /^[A-Z]{3}$/
        if (!regex.test(monthExp.value)) {
            validation += "Credit Card Expiry Month must match with \"MMM\" pattern\n"
        }
    }
    if (!yearExp.value) {
        validation += "Credit Card Expiry Year is required\n";
    } else {
        regex = /^\d{4}$/
        if (!regex.test(yearExp.value)) {
            validation += "Credit Card Expiry Year must match with \"yyyy\" pattern\n"
        }
    }

    //check it is et least one item in the cart
    let cartEmpty = false;
    let allIntegers = true;
    items.forEach(element => {
        if (element.amountInCart && element.amountInCart != 0) {
            cartEmpty = true;
        }
        if (isNaN(element.amountInCart) && element.amountInCart) {
            allIntegers = false;
        }
    });
    if (cartEmpty === false) {
        validation += "Choose at least one item"
    } else {
        if (allIntegers === false) {
            validation += "Invalid input, enter number of items as an integer";
        }
    }
    return validation;
}

// creating table for receipt
function ReceiptPrinting() {
    let total = 0;

    let tr = document.createElement("tr");
    let td = document.createElement("td");
    const table = document.getElementById("receiptInformation");

    //first row with column titles
    td.innerText = "Item";
    td.style.fontWeight = "bold";
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerText = "Quantity";
    td.style.fontWeight = "bold";
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerText = "UnitPrice";
    td.style.fontWeight = "bold";
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerText = "Total Price";
    td.style.fontWeight = "bold";
    tr.appendChild(td);
    table.appendChild(tr);

    //filling table with items
    items.forEach(element => {
        if (element.amountInCart > 0) {
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.innerText = element.name;
            tr.appendChild(td);
            td = document.createElement("td");
            td.innerText = element.amountInCart;
            tr.appendChild(td);
            td = document.createElement("td");
            td.innerText = "$" + element.price;
            tr.appendChild(td);
            let localTotal = element.price * element.amountInCart;
            total += localTotal;
            td = document.createElement("td");
            td.innerText = "$" + localTotal;
            tr.appendChild(td);
            table.appendChild(tr);
        }
    });
    let donation = 10;
    // adding donation 
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.innerText = "Donation";
    tr.appendChild(td);
    if (total < 100) {
        td = document.createElement("td");
        td.innerText = "Minimum";
        td.colSpan = 2;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerText = "$10";
        tr.appendChild(td);
    } else {
        donation = total / 10;
        td = document.createElement("td");
        td.innerText = "10%";
        td.colSpan = 2;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerText = "$" + donation;
        tr.appendChild(td);
    }
    table.appendChild(tr);

    //adding total price
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.innerText = "Total";
    td.style.fontWeight = "bold";
    td.colSpan = 3;
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerText = "$" + (total + donation);
    td.style.fontWeight = "bold";
    tr.appendChild(td);
    table.appendChild(tr);
}

function EditClicked() {
    document.getElementById("receiptInformation").innerHTML = "";
    document.getElementById("form").style.display = "grid";
    document.getElementById("receipt").style.display = "none";
}

function PrintClicked() {
    window.print();
}