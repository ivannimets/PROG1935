
// Class for Items on my page
class Item {
    constructor(name, price, imgLink, amountInCart) {
        this.name = name;
        this.price = price;
        this.imgLink = imgLink;
        this.amountInCart = amountInCart;
    }
}
// array of items
const items = [];
items[0] = new Item("Tent", 70, "images/61DalYGrFdL._AC_SL1500_.jpg", 0);
items[1] = new Item("Bike", 500, "images/360_F_234956425_JFdJ1zSitfgwvJx5TD9xbXlOBOTgeqKn.jpg", 0);
items[2] = new Item("Iphone 14", 700, "images/518bzP8VW1L._AC_UF894,1000_QL80_.jpg", 0);
items[3] = new Item("Climbing shoes", 100, "images/51rpcRQl9zL._AC_UY900_.jpg", 0);
items[4] = new Item("Chair", 50, "images/depositphotos_8346493-stock-photo-wooden-chair-over-white-with.jpg", 0);
let cartIsEmpty = true;

// function to create a catalog dynamiclly
function CreateCatalog() {
    // loop to create all of items
    for (let i = 0; i < items.length; i++) {
        const item = document.createElement("div");
        item.id = "item" + i;
        item.classList.add("item");

        const image = document.createElement("img");
        image.src = items[i].imgLink;
        image.style.width = "150px";
        image.style.height = "100px";
        image.alt = "items image";
        item.appendChild(image);

        const name = document.createElement("p");
        name.innerText = items[i].name;
        name.classList.add("name");
        item.appendChild(name);

        const price = document.createElement("p");
        price.innerText = items[i].price + "$";
        price.classList.add("price");
        item.appendChild(price);

        const amountItemsInCart = document.createElement("p");
        amountItemsInCart.id = "amountItem" + i + "inCart";
        amountItemsInCart.hidden = true;
        item.appendChild(amountItemsInCart);


        const addItem = document.createElement("button");
        addItem.innerText = "Add Item to Cart";
        addItem.id = "addItemButton" + i;
        addItem.classList.add("addItemButton");
        addItem.classList.add("buttons");
        addItem.addEventListener("click", function (e) {
            AddItemToCart(i);
        });
        item.appendChild(addItem);

        document.getElementById('catalog').appendChild(item);
    }
    //add checkout button
    const checkoutButton = document.createElement("button");
    checkoutButton.id = "checkoutBtn";
    checkoutButton.classList.add("buttons");
    checkoutButton.innerText = "Checkout";
    checkoutButton.addEventListener("click", function (e) {
        Checkout();
    });
    document.body.appendChild(checkoutButton);
}

// fuction for addidng items to cart with validation
const AddItemToCart = (i) => {
    const toAdd = prompt("How many items do you want to add?");
    if (toAdd != null) {
        if (isNaN(toAdd) || toAdd <= 0) {
            alert("Enter Numeric Number > 0");
        } else {
            items[i].amountInCart += parseInt(toAdd);
            const item = document.getElementById("amountItem" + i + "inCart");
            item.innerText = "You have " + items[i].amountInCart + " in your cart";
            item.hidden = false;
            cartIsEmpty = false;
        }
    }
};

// function for checkout button with Name validation
const Checkout = () => {
    const receipt = document.getElementById("receipt");
    const customerName = prompt("What is your name?");
    const totalTaxName = document.createElement("p");
    let total = 0;
    let tax = 0;
    if (!cartIsEmpty) {
        if (customerName) {
            receipt.innerHTML = "";
            receipt.hidden = false;
            for (let i = 0; i < items.length; i++) {
                if (items[i].amountInCart > 0) {
                    const item = document.createElement("p");
                    const cost = items[i].price * items[i].amountInCart;
                    item.innerText = items[i].name + " x " + items[i].amountInCart + " = " + cost + "$" +"\n     " + items[i].price + "$ per item";
                    receipt.appendChild(item);
                    total += cost;
                    const itemLabel = document.getElementById("amountItem" + i + "inCart");
                    itemLabel.innerText = "";
                    itemLabel.hidden = true;
                    items[i].amountInCart = 0;
                }
            }
            tax = total * 0.13;
            cartIsEmpty = true;
            totalTaxName.innerText = "Total before tax: " + total + "$\nTax: " + tax + "$\nTotal: " + (total + tax) + "$\nCustomers Name: " + customerName;
            receipt.appendChild(totalTaxName);

        } else {
            alert("Name is required");
        }
    } else {
        alert("Your cart is empty.");
    }
};

CreateCatalog();
