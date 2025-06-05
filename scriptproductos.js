let cart = JSON.parse(localStorage.getItem('cart') || '[]');
const extraProductsData = {
  urbanos: [
    { name: 'Tenis Urbano Extra 1', price: 1300, img: 'hola11.jpg' },
    { name: 'Tenis Urbano Extra 2', price: 1400, img: 'hola12.jpg' },
    { name: 'Tenis Urbano Extra 3', price: 1250, img: 'hola16.jpg' },
    { name: 'Tenis Urbano Extra 4', price: 1350, img: 'hola15.jpg' }
  ],
  deportivos: [
    { name: 'Tenis Deportivo Extra 1', price: 1600, img: 'hola21.jpg' },
    { name: 'Tenis Deportivo Extra 2', price: 1700, img: 'hola22.jpg' },
    { name: 'Tenis Deportivo Extra 3', price: 1650, img: 'hola23.jpg' },
    { name: 'Tenis Deportivo Extra 4', price: 1800, img: 'hola24.jpeg' }
  ],
  exclusivos: [
    { name: 'Tenis Exclusivo Extra 1', price: 3000, img: 'hola31.jpg' },
    { name: 'Tenis Exclusivo Extra 2', price: 3200, img: 'hola34.jpeg' },
    { name: 'Tenis Exclusivo Extra 3', price: 3100, img: 'hola33.jpg' },
    { name: 'Tenis Exclusivo Extra 4', price: 3300, img: 'hola32.jpg' }
  ]
};

    function addToCart(name, price) {
      cart.push({ name, price });
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
    }

    function updateCartUI() {
      const cartCount = document.getElementById('cart-count');
      const cartItems = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');

      cartCount.textContent = cart.length;
      cartItems.innerHTML = '';
      let total = 0;

      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${item.name} - $${item.price} MXN 
          <button onclick="removeFromCart(${index})">X</button>
        `;
        cartItems.appendChild(li);
        total += item.price;
      });

      cartTotal.textContent = total;
    }

    function toggleCart() {
      const summary = document.getElementById('cart-summary');
      summary.style.display = summary.style.display === 'block' ? 'none' : 'block';
    }

    window.addEventListener('load', updateCartUI);
  document.querySelectorAll('.show-more-btn').forEach(button => {
  button.addEventListener('click', () => {
    const productType = button.getAttribute('data-product');
    const container = button.nextElementSibling; // .extra-products-container

    const allProducts = document.querySelectorAll('.product-list > .product');

    if (container.style.display === 'block') {
      // Mostrar menos productos: ocultar extra y mostrar todos los tenis principales
      container.style.display = 'none';
      button.textContent = 'Mostrar más productos';

      allProducts.forEach(prod => {
        prod.style.display = 'block';  // Mostrar todos
      });
    } else {
      // Mostrar más productos: cargar si no están, mostrar extra y ocultar los otros tenis
      if (container.children.length === 0) {
        extraProductsData[productType].forEach(prod => {
          const div = document.createElement('div');
          div.classList.add('product');
          div.style.marginTop = '10px';
          div.innerHTML = `
            <img src="${prod.img}" alt="${prod.name}" />
            <h3>${prod.name}</h3>
            <p>$${prod.price} MXN</p>
            <button onclick="addToCart('${prod.name}', ${prod.price})">Agregar al carrito</button>
          `;
          container.appendChild(div);
        });
      }

      container.style.display = 'block';
      button.textContent = 'Mostrar menos productos';

      // Ocultar todos los tenis principales excepto el que corresponde al botón clickeado
      allProducts.forEach(prod => {
        if (prod.querySelector('button.show-more-btn').getAttribute('data-product') !== productType) {
          prod.style.display = 'none';
        } else {
          prod.style.display = 'block';
        }
      });
    }
  });
});
window.addEventListener('load', () => {
  // Obtener la categoría desde la URL
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');

  if (category) {
    // Buscar el botón correspondiente y disparar su click programáticamente
    const button = document.querySelector(`.show-more-btn[data-product="${category}"]`);
    if (button && button.style.display !== 'none') {
      button.click();
      // Opcional: hacer scroll hacia ese producto para mejor UX
      button.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
