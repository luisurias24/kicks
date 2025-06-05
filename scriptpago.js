  // Cargar carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartList = document.getElementById('cartSummaryList');
    const cartTotal = document.getElementById('cartSummaryTotal');
    const cartCount = document.getElementById('cart-count');

    let total = 0;
    cartList.innerHTML = '';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${item.name}</span><span>$${item.price} MXN</span>`;
      cartList.appendChild(li);
      total += item.price;
    });
    cartTotal.textContent = total;
    cartCount.textContent = cart.length;

    // Manejar el formulario de pago
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('¡Gracias por tu compra!');
      localStorage.removeItem('cart');
      window.location.href = 'pagina.html'; // Regresa al inicio
    });