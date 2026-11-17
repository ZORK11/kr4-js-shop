const productsGrid = document.querySelector('#products-grid');
const searchInput = document.querySelector('#product-search');
const categoryFilter = document.querySelector('#category-filter');
const sortFilter = document.querySelector('#sort-filter');
const productsCount = document.querySelector('#products-count');
const emptyState = document.querySelector('#empty-state');
const resetFiltersButton = document.querySelector('#reset-filters');

function getVisibleProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = products.filter((product) => {
    const matchesTitle = product.title.toLowerCase().includes(query);
    const matchesCategory = category === 'all' || product.category === category;
    return matchesTitle && matchesCategory;
  });

  const sorted = [...filtered];

  if (sortFilter.value === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortFilter.value === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortFilter.value === 'title-asc') {
    sorted.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  }

  return sorted;
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.classList.add('product-card');

  if (!product.isAvailable) {
    card.classList.add('product-card--unavailable');
  }

  const image = document.createElement('img');
  image.classList.add('product-card__image');
  image.src = product.image;
  image.alt = product.title;
  image.loading = 'lazy';
  image.width = 640;
  image.height = 480;

  const title = document.createElement('h3');
  title.classList.add('product-card__title');
  title.textContent = product.title;

  const description = document.createElement('p');
  description.classList.add('product-card__description');
  description.textContent = product.description;

  const price = document.createElement('p');
  price.classList.add('product-card__price');
  price.textContent = `Цена: ${product.price} руб.`;

  const availability = document.createElement('p');
  availability.classList.add('product-card__availability');
  availability.textContent = product.isAvailable ? 'В наличии' : 'Нет в наличии';

  if (!product.isAvailable) {
    availability.classList.add('product-card__availability--out');
  }

  const link = document.createElement('a');
  link.classList.add('button', 'button--primary');
  link.href = product.url;
  link.textContent = 'Подробнее';

  card.append(image, title, description, price, availability, link);

  return card;
}

function renderProducts() {
  if (!productsGrid) return;

  productsGrid.textContent = '';

  const visibleProducts = getVisibleProducts();

  if (productsCount) {
    productsCount.textContent = `Найдено товаров: ${visibleProducts.length}`;
  }

  if (emptyState) {
    emptyState.hidden = visibleProducts.length > 0;
  }

  visibleProducts.forEach((product) => {
    productsGrid.append(createProductCard(product));
  });
}

if (productsGrid && searchInput && categoryFilter && sortFilter) {
  searchInput.addEventListener('input', renderProducts);
  categoryFilter.addEventListener('change', renderProducts);
  sortFilter.addEventListener('change', renderProducts);

  if (resetFiltersButton) {
    resetFiltersButton.addEventListener('click', () => {
      searchInput.value = '';
      categoryFilter.value = 'all';
      sortFilter.value = 'default';
      renderProducts();
      searchInput.focus();
    });
  }

  renderProducts();
}