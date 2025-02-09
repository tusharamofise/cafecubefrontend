let order = {};
let totalAmount = 0;

function toggleSubItems(category) {
    let subItems = document.getElementById(category);
    subItems.style.display = (subItems.style.display === "none" || subItems.style.display === "") ? "block" : "none";
}

function addItem(itemName, itemPrice) {
    if (order[itemName]) {
        order[itemName].quantity += 1;
    } else {
        order[itemName] = { price: itemPrice, quantity: 1 };
    }

    totalAmount += itemPrice;
    updateOrderSummary();
}

function removeItem(itemName) {
    if (order[itemName]) {
        totalAmount -= order[itemName].price;
        order[itemName].quantity -= 1;

        if (order[itemName].quantity === 0) {
            delete order[itemName]; // Remove item if quantity is 0
        }
    }

    updateOrderSummary();
}

function updateOrderSummary() {
    let summary = document.getElementById("order-summary");
    let itemList = document.getElementById("order-items");
    let totalDisplay = document.getElementById("total-price");

    itemList.innerHTML = ""; // Clear previous order items

    if (Object.keys(order).length === 0) {
        summary.style.display = "none"; // Hide summary if no items
        totalAmount = 0;
        return;
    }

    for (let item in order) {
        let li = document.createElement("li");
        li.innerHTML = `
            ${order[item].quantity} x ${item} - ₹${order[item].quantity * order[item].price} 
            <button onclick="removeItem('${item}')">-</button>
        `;
        itemList.appendChild(li);
    }

    totalDisplay.textContent = `Total: ₹${totalAmount}`;
    summary.style.display = "block"; // Ensure summary is visible
}
