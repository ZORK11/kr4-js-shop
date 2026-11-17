const CART_KEY = 'kr4-cart';

function isValidCartItem(item) {
  return item
    && Number.isInteger(item.id)
    && Number.isInteger(item.qty)
    && item.qty > 0;
}

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(isValidCartItem) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // превышена квота — молча игнорируем
  }
  updateCartCounters();
}

function addToCart(id) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

function setQuantity(id, qty) {
  if (qty <= 0) {
    removeFromCart(id);
    return;
  }

  const cart = getCart();
  const item = cart.find((entry) => entry.id === id);

  if (item) {
    item.qty = qty;
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getProductById(id) {
  if (typeof products === 'undefined') return null;
  return products.find((p) => p.id === id) || null;
}

function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const product = getProductById(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

function updateCartCounters() {
  const count = getCartCount();
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = String(count);
    el.hidden = count === 0;
  });
}

function renderCartPage() {
  const list = document.querySelector('#cart-list');
  if (!list) return;

  const totalEl = document.querySelector('#cart-total');
  const emptyEl = document.querySelector('#cart-empty');
  const contentEl = document.querySelector('#cart-content');

  const cart = getCart();
  list.textContent = '';

  if (cart.length === 0) {
    if (emptyEl) emptyEl.hidden = false;
    if (contentEl) contentEl.hidden = true;
    return;
  }

  if (emptyEl) emptyEl.hidden = true;
  if (contentEl) contentEl.hidden = false;

  cart.forEach((item) => {
    const product = getProductById(item.id);
    if (!product) {
      removeFromCart(item.id);
      return;
    }

    const row = document.createElement('li');
    row.classList.add('cart-item');
    row.dataset.id = String(product.id);

    const info = document.createElement('div');
    info.classList.add('cart-item__info');

    const title = document.createElement('h3');
    title.classList.add('cart-item__title');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.classList.add('cart-item__price');
    price.textContent = `${product.price} руб. / шт.`;

    info.append(title, price);

    const qtyWrap = document.createElement('div');
    qtyWrap.classList.add('cart-item__qty');

    const minusBtn = document.createElement('button');
    minusBtn.type = 'button';
    minusBtn.classList.add('cart-item__qty-btn');
    minusBtn.dataset.cartAction = 'dec';
    minusBtn.dataset.id = String(product.id);
    minusBtn.setAttribute('aria-label', 'Уменьшить количество');
    minusBtn.textContent = '−';

    const qtyValue = document.createElement('span');
    qtyValue.classList.add('cart-item__qty-value');
    qtyValue.textContent = String(item.qty);

    const plusBtn = document.createElement('button');
    plusBtn.type = 'button';
    plusBtn.classList.add('cart-item__qty-btn');
    plusBtn.dataset.cartAction = 'inc';
    plusBtn.dataset.id = String(product.id);
    plusBtn.setAttribute('aria-label', 'Увеличить количество');
    plusBtn.textContent = '+';

    qtyWrap.append(minusBtn, qtyValue, plusBtn);

    const subtotal = document.createElement('p');
    subtotal.classList.add('cart-item__subtotal');
    subtotal.textContent = `${product.price * item.qty} руб.`;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.classList.add('cart-item__remove', 'button', 'button--secondary');
    removeBtn.dataset.cartAction = 'remove';
    removeBtn.dataset.id = String(product.id);
    removeBtn.textContent = 'Удалить';

    row.append(info, qtyWrap, subtotal, removeBtn);
    list.append(row);
  });

  if (totalEl) {
    totalEl.textContent = `Итого: ${getCartTotal()} руб.`;
  }
}

function showToast(message) {
  let toast = document.querySelector('#cart-toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cart-toast';
    toast.classList.add('cart-toast');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.classList.add('cart-toast--visible');

  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove('cart-toast--visible');
  }, 2200);
}

document.addEventListener('click', (event) => {
  const addBtn = event.target.closest('[data-add-to-cart]');
  if (addBtn) {
    const id = Number(addBtn.dataset.id);
    if (Number.isInteger(id) && id > 0) {
      addToCart(id);
      showToast('Товар добавлен в корзину');
    }
    return;
  }

  const cartBtn = event.target.closest('[data-cart-action]');
  if (cartBtn) {
    const id = Number(cartBtn.dataset.id);
    const action = cartBtn.dataset.cartAction;
    if (!Number.isInteger(id)) return;

    const item = getCart().find((entry) => entry.id === id);
    if (!item && action !== 'remove') return;

    if (action === 'inc' && item) setQuantity(id, item.qty + 1);
    else if (action === 'dec' && item) setQuantity(id, item.qty - 1);
    else if (action === 'remove') removeFromCart(id);

    renderCartPage();
    return;
  }

  if (event.target.closest('#cart-clear')) {
    clearCart();
    renderCartPage();
  }
});

updateCartCounters();
renderCartPage();