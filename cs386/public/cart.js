// cart.js — rewritten to use Cart module ONLY
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('cart-items-container');
    const emptyMsg = document.getElementById('empty-cart-message');
    const countEl = document.getElementById('cart-item-count');
    const subtotalEl = document.getElementById('cart-subtotal');
    const checkoutBtn = document.getElementById('checkout-button');

    function renderCart() {
        const cart = Cart.get();
        container.innerHTML = "";

        if (!cart.length) {
            emptyMsg.style.display = 'block';
            countEl.textContent = '0';
            subtotalEl.textContent = '0.00';
            checkoutBtn.disabled = true;
            return;
        }

        emptyMsg.style.display = 'none';

        let subtotal = 0;

        cart.forEach(item => {
            const row = document.createElement('div');
            row.className = 'list-group-item d-flex align-items-center';

            const img = document.createElement('img');
            img.src = item.image || '/uploads/default.jpg';
            img.alt = item.name;
            img.style.width = '64px';
            img.style.height = '64px';
            img.style.objectFit = 'cover';
            img.className = 'me-3 rounded';

            const body = document.createElement('div');
            body.className = 'flex-grow-1';

            const title = document.createElement('div');
            title.className = 'd-flex justify-content-between align-items-start';
            title.innerHTML = `
                <strong>${item.name}</strong>
                <small class="text-muted">$${(Number(item.price) || 0).toFixed(2)}</small>
            `;

            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-sm btn-outline-danger mt-2 btn-remove';
            removeBtn.textContent = 'Remove';
            removeBtn.dataset.id = item.id;

            body.appendChild(title);
            body.appendChild(removeBtn);

            row.appendChild(img);
            row.appendChild(body);
            container.appendChild(row);

            subtotal += Number(item.price) || 0;
        });

        countEl.textContent = cart.length;
        subtotalEl.textContent = subtotal.toFixed(2);
        checkoutBtn.disabled = false;
    }

    // Remove item from cart
    container.addEventListener('click', function (e) {
        const rem = e.target.closest('.btn-remove');
        if (rem) {
            const id = rem.dataset.id;
            Cart.remove(id);
            renderCart();
        }
    });

    // Re-render whenever cart changes (from other pages)
    window.addEventListener('cart-updated', function () {
        renderCart();
    });

    // Checkout simulation
    checkoutBtn.addEventListener('click', function () {
        const cart = Cart.get();
        if (!cart.length) return;
        alert(`Proceeding to checkout (${cart.length} items, subtotal $${subtotalEl.textContent})`);
    });

    renderCart();
});
