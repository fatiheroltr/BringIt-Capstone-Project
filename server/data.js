const categories = [
  {
    _id: 1,
    name: "Hamburger",
    imgSrc: "../assets/category-icons/hamburger-icon.png",
  },
  { _id: 2, name: "Pizza", imgSrc: "../assets/category-icons/pizza-icon.png" },
  {
    _id: 3,
    name: "Italian",
    imgSrc: "../assets/category-icons/italian-icon.png",
  },
  { _id: 4, name: "Asian", imgSrc: "../assets/category-icons/asian-icon.png" },
  {
    _id: 5,
    name: "Mexican",
    imgSrc: "../assets/category-icons/mexican-icon.png",
  },
  {
    _id: 6,
    name: "Bakery",
    imgSrc: "../assets/category-icons/dessert-icon.png",
  },
  {
    _id: 7,
    name: "Coffee & Tea",
    imgSrc: "../assets/category-icons/coffee-tea-icon.png",
  },
  {
    _id: 8,
    name: "Cold Drinks",
    imgSrc: "../assets/category-icons/drinks-icon.png",
  },
];

const restaurants = [
  { _id: 453, name: "Pizzeria Napoli", itemsIds: [4531, 4532, 4533, 4534] },
  { _id: 454, name: "Pizzeria Napoli", itemsIds: [4531, 4532, 4533, 4534] },
];

const products = [
  {
    _id: 4531,
    name: "Margherita",
    price: 11,
    category: "pizza",
    desc: "Lorem ipsum dolor sit amet, consec-tetur adipiscing elit.",
    imageSrc: "../assets/products/margherita-pizza.png",
  },
  {
    _id: 4532,
    name: "Caprese",
    price: 12,
    category: "pizza",
    desc: "Lorem ipsum dolor sit amet, consec-tetur adipiscing elit.",
    imageSrc: "../assets/products/caprese-pizza.png",
  },
  {
    _id: 4533,
    name: "Classic",
    price: 11,
    category: "pizza",
    desc: "Lorem ipsum dolor sit amet, consec-tetur adipiscing elit.",
    imageSrc: "../assets/products/classic-pizza.png",
  },
  {
    _id: 4534,
    name: "Quattro Formaggi",
    price: 13,
    category: "pizza",
    desc: "Lorem ipsum dolor sit amet, consec-tetur adipiscing elit.",
    imageSrc: "client/src/assets/products/quattro-pizza.png",
  },
];

module.exports = { categories, restaurants, products };
