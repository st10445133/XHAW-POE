let cart = [];

function addToCart(product, price) {
    cart.push({ product, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();

}
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    cartCounter.innerText = cart.length;
}
function calculateDiscount() {
    const discountPercentages = {
        2: 0.05,
        3: 0.10,
        default: 0.15
    };
    
    let discountPercentage;
    
    if (cart.length === 2) {
        discountPercentage = discountPercentages[2];
    } else if (cart.length === 3) {
        discountPercentage = discountPercentages[3];
    } else if (cart.length > 3) {
        discountPercentage = discountPercentages.default;
    } else {
        discountPercentage = 0;
    }
    
    return discountPercentage;
}



function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const itemHTML = `
            <div>
            <hr/>
                <h3>${item.product}</h3>
                <p>Price: R${item.price}</p>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItems.insertAdjacentHTML('beforeend', itemHTML);
    });
    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const discountPercentage = calculateDiscount();
    const discountAmount = subtotal * discountPercentage;
    const total = subtotal - discountAmount;
    
    cartItems.insertAdjacentHTML('beforeend', `
        <hr />
        <p>Subtotal: R${subtotal}</p>
        <p>Discount (${discountPercentage * 100}%): R${discountAmount}</p>
        <p>Total: R${total}</p>
    `);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    displayCart();
}

document.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCounter();
    displayCart();
    document.getElementById('checkout-button').addEventListener('click', () => {
        alert('Checkout successful!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        location.href = 'index.html';
    });
});