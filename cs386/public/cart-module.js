// cart-module.js
(function (global) {
  const STORAGE_KEY = 'linku_cart';

  function read() {
    try { 
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); 
    } catch {
      return [];
    }
  }

  function write(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

    // total items = sum of qty
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

    window.dispatchEvent(new CustomEvent('cart-updated', {
      detail: { count: total }
    }));
  }

  const Cart = {
    get() {
      return read();
    },

    add(item) {
      const cart = read();
      const idx = cart.findIndex(i => String(i.id) === String(item.id));

      if (idx >= 0) {
        cart[idx].qty += 1;
      } else {
        cart.push({
          id: item.id,
          name: item.name,
          price: Number(item.price) || 0,
          image: item.image,
          qty: 1
        });
      }

      write(cart);
    },

    remove(id) {
      const cart = read().filter(i => String(i.id) !== String(id));
      write(cart);
    },

    updateQty(id, qty) {
      const cart = read();
      const item = cart.find(i => String(i.id) === String(id));
      if (item) item.qty = qty;
      write(cart);
    }
  };

  global.Cart = Cart;
})(window);
