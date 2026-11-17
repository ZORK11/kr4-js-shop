const products = [
  {
    id: 1,
    title: 'Шаурма с курицей',
    category: 'shaurma',
    price: 250,
    isAvailable: true,
    description: 'Дефолтная шаурма с курицей, овощами и фирменным соусом.',
    image: 'https://images.gastronom.ru/iGE7Ep63_qPp3ulovbwQhDh5KOnzTTJJTgLrWIMCrr0/pr:product-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzk2NzBmMmMzLTdjZTYtNGMzZC04NGNjLTQzMjAwNWQ1Nzc2Yi5qcGc.webp',
    specs: {
      'Вес': '350 г',
      'Состав': 'Лаваш, курица, овощи, соус',
      'Калорийность': '520 ккал',
      'Срок годности': '2 часа'
    }
  },
  {
    id: 2,
    title: 'Шашлык в лаваше',
    category: 'shashlyk',
    price: 300,
    isAvailable: true,
    description: 'Шашлык из свинины в лаваше с овощами.',
    image: 'https://шашлыкдаром73.рф/wp-content/uploads/2022/11/Свинина-в-лаваше-768x516.jpg',
    specs: {
      'Вес': '400 г',
      'Состав': 'Лаваш, свинина, овощи, соус',
      'Калорийность': '600 ккал',
      'Срок годности': '2 часа'
    }
  },
  {
    id: 3,
    title: 'Кюфта',
    category: 'kebab',
    price: 350,
    isAvailable: true,
    description: 'Люля-кебаб, хлеб и овощи.',
    image: 'https://thecity.m24.ru/b/d/SYketSivfYE0IffObLLBFlFNGhtudTX-kYVfOS8Xp1Gj5pqKzWTJSFS-PsArI08gRZaK1yZktQXWesHOaOz7FWcJ5xZMng=H83L15SjaKQIsgSsejoTUg.jpg',
    specs: {
      'Вес': '380 г',
      'Состав': 'Люля-кебаб, лаваш, овощи, соус',
      'Калорийность': '570 ккал',
      'Срок годности': '2 часа'
    }
  },
  {
    id: 4,
    title: 'Шаурма с говядиной',
    category: 'shaurma',
    price: 320,
    isAvailable: true,
    description: 'Шаурма с говядиной и свежими овощами.',
    image: 'https://avatars.mds.yandex.net/i?id=7fa032ac64b5b20029e21349fd60a20a357625fe-9853580-images-thumbs&n=13',
    specs: {
      'Вес': '380 г',
      'Состав': 'Лаваш, говядина, овощи, соус',
      'Калорийность': '540 ккал',
      'Срок годности': '2 часа'
    }
  },
  {
    id: 5,
    title: 'Люля-кебаб',
    category: 'kebab',
    price: 340,
    isAvailable: false,
    description: 'Классический люля-кебаб с лавашом.',
    image: 'https://avatars.mds.yandex.net/i?id=fb65580f360de60dbc34b6a6092138df_l-10386268-images-thumbs&n=13',
    specs: {
      'Вес': '400 г',
      'Состав': 'Фарш, лук, специи, лаваш',
      'Калорийность': '580 ккал',
      'Срок годности': '2 часа'
    }
  },
  {
    id: 6,
    title: 'Шашлык из курицы',
    category: 'shashlyk',
    price: 280,
    isAvailable: true,
    description: 'Куриный шашлык в лаваше.',
    image: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDcwMS94WmdyYzgucG5n.jpg',
    specs: {
      'Вес': '350 г',
      'Состав': 'Лаваш, курица, овощи, соус',
      'Калорийность': '480 ккал',
      'Срок годности': '2 часа'
    }
  },
  {
    id: 7,
    title: 'Соус чесночный',
    category: 'sauces',
    price: 50,
    isAvailable: true,
    description: 'Чесночный соус к шаурме.',
    image: 'https://avatars.mds.yandex.net/i?id=97a9e49e41716d6a874db897448f42fc2d830145-3598527-images-thumbs&n=13',
    specs: {
      'Вес': '50 г',
      'Состав': 'Сметана, чеснок, зелень',
      'Калорийность': '150 ккал',
      'Срок годности': '24 часа'
    }
  },
  {
    id: 8,
    title: 'Соус острый',
    category: 'sauces',
    price: 60,
    isAvailable: true,
    description: 'Острый соус для любителей поострее.',
    image: 'https://avatars.mds.yandex.net/i?id=c1035e63c087f523a5b9197852a79546_l-13313797-images-thumbs&n=13',
    specs: {
      'Вес': '50 г',
      'Состав': 'Томаты, перец, специи',
      'Калорийность': '80 ккал',
      'Срок годности': '24 часа'
    }
  },
  {
    id: 9,
    title: 'Лимонад',
    category: 'drinks',
    price: 120,
    isAvailable: true,
    description: 'Домашний лимонад.',
    image: 'https://avatars.mds.yandex.net/i?id=9258bf506d394411de1e23b32e3ac7d6_l-10695749-images-thumbs&n=13',
    specs: {
      'Объём': '500 мл',
      'Состав': 'Вода, лимон, сахар',
      'Калорийность': '60 ккал',
      'Срок годности': '12 часов'
    }
  }
];