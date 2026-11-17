const orderPageForm = document.querySelector('#order-form-page');
const formMessage = document.querySelector('#form-message');

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

    formMessage.textContent = 'Заявка подготовлена. Мы свяжемся с вами для подтверждения.';
    formMessage.classList.add('form-message--success');

    orderPageForm.reset();
  });
}