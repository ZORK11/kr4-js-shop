const orderPageForm = document.querySelector('#order-form-page');
const formMessage = document.querySelector('#form-message');

const orderCartList = document.querySelector('#order-cart-list');
const orderCartTotal = document.querySelector('#order-cart-total');
const orderCartEmpty = document.querySelector('#order-cart-empty');
const orderCartContent = document.querySelector('#order-cart-content');

function renderOrderCart() {
  if (!orderCartList) return;

  const cart = getCart();
  orderCartList.textContent = '';

  if (cart.length === 0) {
    if (orderCartEmpty) orderCartEmpty.hidden = false;
    if (orderCartContent) orderCartContent.hidden = true;
    return;
  }

  if (orderCartEmpty) orderCartEmpty.hidden = true;
  if (orderCartContent) orderCartContent.hidden = false;

  cart.forEach((item) => {
    const product = getProductById(item.id);
    if (!product) return;

    const li = document.createElement('li');
    li.classList.add('cart-item');

    const title = document.createElement('h3');
    title.classList.add('cart-item__title');
    title.textContent = product.title;

    const qty = document.createElement('p');
    qty.classList.add('cart-item__price');
    qty.textContent = `${item.qty} × ${product.price} руб.`;

    const subtotal = document.createElement('p');
    subtotal.classList.add('cart-item__subtotal');
    subtotal.textContent = `${product.price * item.qty} руб.`;

    li.append(title, qty, subtotal);
    orderCartList.append(li);
  });

  if (orderCartTotal) {
    orderCartTotal.textContent = `Итого: ${getCartTotal()} руб.`;
  }
}

renderOrderCart();

if (orderPageForm && formMessage) {
  const nameField = orderPageForm.querySelector('[name="name"]');
  const emailField = orderPageForm.querySelector('[name="email"]');
  const phoneField = orderPageForm.querySelector('[name="phone"]');
  const agreeField = orderPageForm.querySelector('[name="agree"]');

  function clearErrors() {
    orderPageForm.querySelectorAll('.field-error').forEach((error) => {
      error.remove();
    });

    orderPageForm.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
      field.removeAttribute('aria-invalid');
    });

    formMessage.textContent = '';
    formMessage.classList.remove('form-message--error', 'form-message--success');
  }

  function showError(field, message) {
    const wrapper = field.closest('.order-form__field') || field.parentElement;
    const error = document.createElement('p');
    error.classList.add('field-error');
    error.textContent = message;

    field.setAttribute('aria-invalid', 'true');
    wrapper.append(error);
  }

  orderPageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const errors = [];
    const nameValue = nameField.value.trim();
    const emailValue = emailField.value.trim();
    const phoneValue = phoneField.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[0-9\s\-()]{7,18}$/;

    if (getCart().length === 0) {
      formMessage.textContent = 'Корзина пуста — добавьте товары перед оформлением заявки.';
      formMessage.classList.add('form-message--error');
      return;
    }

    if (nameValue.length < 2) {
      errors.push({ field: nameField, message: 'Введите имя не короче 2 символов.' });
    }

    if (!emailPattern.test(emailValue)) {
      errors.push({ field: emailField, message: 'Введите корректный e-mail.' });
    }

    if (phoneValue && !phonePattern.test(phoneValue)) {
      errors.push({ field: phoneField, message: 'Введите корректный телефон.' });
    }

    if (!agreeField.checked) {
      errors.push({ field: agreeField, message: 'Нужно согласие на обработку данных.' });
    }

    if (errors.length > 0) {
      errors.forEach(({ field, message }) => {
        showError(field, message);
      });

      formMessage.textContent = 'Форма содержит ошибки. Исправьте поля и попробуйте снова.';
      formMessage.classList.add('form-message--error');
      return;
    }

    // Имитация отправки заявки: очищаем корзину и показываем успех.
    clearCart();
    renderOrderCart();

    formMessage.textContent = 'Заявка подготовлена. Мы свяжемся с вами для подтверждения.';
    formMessage.classList.add('form-message--success');

    orderPageForm.reset();
  });
}