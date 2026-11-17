const products = [
  {
    id: 1,
    title: 'Шаурма с курицей',
    category: 'shaurma',
    price: 250,
    isAvailable: true,
    description: 'Дефолтная шаурма с курицей, овощами и фирменным соусом.',
    image: 'https://images.gastronom.ru/iGE7Ep63_qPp3ulovbwQhDh5KOnzTTJJTgLrWIMCrr0/pr:product-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzk2NzBmMmMzLTdjZTYtNGMzZC04NGNjLTQzMjAwNWQ1Nzc2Yi5qcGc.webp',
    url: 'product.html'
  },
  {
    id: 2,
    title: 'Шашлык в лаваше',
    category: 'shashlyk',
    price: 300,
    isAvailable: true,
    description: 'Шашлык из свинины в лаваше с овощами.',
    image: 'https://шашлыкдаром73.рф/wp-content/uploads/2022/11/Свинина-в-лаваше-768x516.jpg',
    url: 'product_2.html'
  },
  {
    id: 3,
    title: 'Кюфта',
    category: 'kebab',
    price: 350,
    isAvailable: true,
    description: 'Люля-кебаб, хлеб и овощи.',
    image: 'https://thecity.m24.ru/b/d/SYketSivfYE0IffObLLBFlFNGhtudTX-kYVfOS8Xp1Gj5pqKzWTJSFS-PsArI08gRZaK1yZktQXWesHOaOz7FWcJ5xZMng=H83L15SjaKQIsgSsejoTUg.jpg',
    url: 'product_3.html'
  },
  {
    id: 4,
    title: 'Шаурма с говядиной',
    category: 'shaurma',
    price: 320,
    isAvailable: true,
    description: 'Шаурма с говядиной и свежими овощами.',
    image: 'https://images.gastronom.ru/iGE7Ep63_qPp3ulovbwQhDh5KOnzTTJJTgLrWIMCrr0/pr:product-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzk2NzBmMmMzLTdjZTYtNGMzZC04NGNjLTQzMjAwNWQ1Nzc2Yi5qcGc.webp',
    url: 'catalog.html'
  },
  {
    id: 5,
    title: 'Люля-кебаб',
    category: 'kebab',
    price: 340,
    isAvailable: false,
    description: 'Классический люля-кебаб с лавашом.',
    image: 'https://thecity.m24.ru/b/d/SYketSivfYE0IffObLLBFlFNGhtudTX-kYVfOS8Xp1Gj5pqKzWTJSFS-PsArI08gRZaK1yZktQXWesHOaOz7FWcJ5xZMng=H83L15SjaKQIsgSsejoTUg.jpg',
    url: 'catalog.html'
  },
  {
    id: 6,
    title: 'Шашлык из курицы',
    category: 'shashlyk',
    price: 280,
    isAvailable: true,
    description: 'Куриный шашлык в лаваше.',
    image: 'https://шашлыкдаром73.рф/wp-content/uploads/2022/11/Свинина-в-лаваше-768x516.jpg',
    url: 'catalog.html'
  },
  {
    id: 7,
    title: 'Соус чесночный',
    category: 'sauces',
    price: 50,
    isAvailable: true,
    description: 'Чесночный соус к шаурме.',
    image: 'https://images.gastronom.ru/iGE7Ep63_qPp3ulovbwQhDh5KOnzTTJJTgLrWIMCrr0/pr:product-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzk2NzBmMmMzLTdjZTYtNGMzZC04NGNjLTQzMjAwNWQ1Nzc2Yi5qcGc.webp',
    url: 'catalog.html'
  },
  {
    id: 8,
    title: 'Соус острый',
    category: 'sauces',
    price: 60,
    isAvailable: true,
    description: 'Острый соус для любителей поострее.',
    image: 'https://images.gastronom.ru/iGE7Ep63_qPp3ulovbwQhDh5KOnzTTJJTgLrWIMCrr0/pr:product-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzk2NzBmMmMzLTdjZTYtNGMzZC04NGNjLTQzMjAwNWQ1Nzc2Yi5qcGc.webp',
    url: 'catalog.html'
  },
  {
    id: 9,
    title: 'Лимонад',
    category: 'drinks',
    price: 120,
    isAvailable: true,
    description: 'Домашний лимонад.',
    image: 'https://images.gastronom.ru/iGE7Ep63_qPp3ulovbwQhDh5KOnzTTJJTgLrWIMCrr0/pr:product-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzk2NzBmMmMzLTdjZTYtNGMzZC04NGNjLTQzMjAwNWQ1Nzc2Yi5qcGc.webp',
    url: 'catalog.html'
  },
  {
    id: 10,
    title: 'Айран',
    category: 'drinks',
    price: 100,
    isAvailable: false,
    description: 'Кисломолочный напиток.',
    image: 'https://images.gastronom.ru/iGE7Ep63_qPp3ulovbwQhDh5KOnzTTJJTgLrWIMCrr0/pr:product-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzk2NzBmMmMzLTdjZTYtNGMzZC04NGNjLTQzMjAwNWQ1Nzc2Yi5qcGc.webp',
    url: 'catalog.html'
  }
];