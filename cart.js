document.addEventListener("DOMContentLoaded", () => {
    // Load cart from localStorage or initialize as empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to update the cart UI
    function updateCartUI() {
        const cartItemsContainer = document.getElementById("cart-items");
        const subtotalElement = document.getElementById("subtotal");
        const shippingElement = document.getElementById("shipping");
        const totalElement = document.getElementById("total");

        // Clear previous cart items
        cartItemsContainer.innerHTML = "";

        // Initialize subtotal
        let subtotal = 0;

        // Loop through the cart and create elements for each item
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" />
                <h4>${item.title}</h4>
                <p>${item.price}</p>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            // Update the subtotal (assuming price is formatted as '1200/-')
            const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            subtotal += itemPrice;
        });

        // Update the subtotal, shipping, and total values
        subtotalElement.textContent = subtotal.toFixed(2);
        const shipping = 5.00;  // You can change this value as needed
        shippingElement.textContent = shipping.toFixed(2);
        totalElement.textContent = (subtotal + shipping).toFixed(2);

        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Function to remove an item from the cart
    function removeFromCart(index) {
        cart.splice(index, 1);  // Remove the item from the cart array
        localStorage.setItem("cart", JSON.stringify(cart));  // Update localStorage
        updateCartUI();  // Update the cart UI
    }

    // Event listener for removing items from the cart
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-from-cart")) {
            const index = event.target.getAttribute("data-index");
            removeFromCart(index);  // Remove the item from the cart
        }
    });

    // Checkout button function (for now it just alerts)
    function checkout() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Proceeding to checkout!");
        }
    }

    // Expose the checkout function globally to handle checkout button click
    window.checkout = checkout;

    // Initial cart UI update
    updateCartUI();
});

// Add to Cart function (this should be included in your product pages like shop.html, makeup.html, etc.)
function addToCart(title, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Create the product object
    const product = { title, price, image };

    // Add product to cart array
    cart.push(product);

    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Optionally, show a message to the user
    alert(`${title} added to cart!`);

    // Update the cart UI after adding the item
    updateCartUI();
}

// Function to update the cart UI (for reuse, can be called after adding/removing items)
function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const shippingElement = document.getElementById("shipping");
    const totalElement = document.getElementById("total");

    // Clear previous cart items
    cartItemsContainer.innerHTML = "";

    // Initialize subtotal
    let subtotal = 0;

    // Loop through the cart and create elements for each item
    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" />
            <h4>${item.title}</h4>
            <p>${item.price}</p>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        // Update the subtotal (assuming price is formatted as '1200/-')
        const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        subtotal += itemPrice;
    });

    // Update the subtotal, shipping, and total values
    subtotalElement.textContent = subtotal.toFixed(2);
    const shipping = 5.00;  // You can change this value as needed
    shippingElement.textContent = shipping.toFixed(2);
    totalElement.textContent = (subtotal + shipping).toFixed(2);

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}
