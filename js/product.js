const params = new URLSearchParams(window.location.search);
const productId = Number(params.get('id'));

const productContent = document.querySelector('#product-content');
const productNotFound = document.querySelector('#product-not-found');

function formatSku(id) {
  return `Артикул: SP-${String(id).padStart(3, '0')}`;
}

function renderProduct(product) {
  document.title = `${product.title} — Учебный интернет-магазин`;

  const imageEl = document.querySelector('#product-image');
  imageEl.src = product.image;
  imageEl.alt = product.title;

  const titleEl = document.querySelector('#product-title');
  titleEl.textContent = product.title;

  const breadcrumbCurrent = document.querySelector('#breadcrumb-current');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.title;

  const skuEl = document.querySelector('#product-sku');
  skuEl.textContent = formatSku(product.id);

  const priceEl = document.querySelector('#product-price');
  priceEl.textContent = `${product.price} руб.`;

  const descriptionEl = document.querySelector('#product-description');
  descriptionEl.textContent = product.description;

  const availabilityEl = document.querySelector('#product-availability');
  availabilityEl.textContent = product.isAvailable ? 'В наличии' : 'Нет в наличии';
  availabilityEl.classList.add(
    product.isAvailable ? 'product__availability--in' : 'product__availability--out'
  );

  const orderBtn = document.querySelector('#product-order-btn');
  if (orderBtn) {
    if (product.isAvailable) {
      orderBtn.dataset.product = product.title;
    } else {
      orderBtn.disabled = true;
      orderBtn.classList.add('button--disabled');
      orderBtn.textContent = 'Нет в наличии';
    }
  }

  const cartBtn = document.querySelector('#product-cart-btn');
  if (cartBtn) {
    if (product.isAvailable) {
      cartBtn.dataset.addToCart = '';
      cartBtn.dataset.id = String(product.id);
    } else {
      cartBtn.disabled = true;
      cartBtn.classList.add('button--disabled');
      cartBtn.textContent = 'Нет в наличии';
    }
  }

  const specsBody = document.querySelector('#product-specs');
  if (specsBody) {
    specsBody.textContent = '';

    if (product.specs && typeof product.specs === 'object') {
      Object.entries(product.specs).forEach(([key, value]) => {
        const tr = document.createElement('tr');

        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = key;

        const td = document.createElement('td');
        td.textContent = String(value);

        tr.append(th, td);
        specsBody.append(tr);
      });
    }
  }
}

if (productContent && productNotFound) {
  const product = Number.isInteger(productId) && productId > 0
    ? products.find((p) => p.id === productId)
    : null;

  if (product) {
    productContent.hidden = false;
    productNotFound.hidden = true;
    renderProduct(product);
  } else {
    productContent.hidden = true;
    productNotFound.hidden = false;
    document.title = 'Товар не найден — Учебный интернет-магазин';
  }
}