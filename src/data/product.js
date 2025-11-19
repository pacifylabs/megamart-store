import m13 from "../assets/galaxy m13.jpeg";
import m33 from "../assets/galaxy m33.jpeg";
import m53 from "../assets/galaxy m53.jpeg";
import s22 from "../assets/s22 ultra.jpeg";
import s23 from "../assets/s23 ultra.jpeg";

import iphone from "../assets/iphone.jpeg";
import oppo from "../assets/oppo.jpeg";
import realme from "../assets/realme.jpeg";
import samsung from "../assets/samsung.jpeg";
import xiaomi from "../assets/xiaomi.jpeg";

import cherry from "../assets/cherry.jpeg";
import daily from "../assets/daily.jpeg";
import fruits from "../assets/fruits.jpeg";
import mango from "../assets/mango.jpeg";
import strawberry from "../assets/strawberry.jpeg";
import vegetables from "../assets/vegetables.jpeg";

export const flatProducts = [
  // ---- Phones ----
  {
    id: 1,
    name: "Galaxy S22 Ultra",
    price: "₹32,999",
    cut: "₹40,999",
    save: "₹3,2999",
    discount: "55%",
    category: "Phones",
    image: s22,
  },
  {
    id: 2,
    name: "Galaxy M13 (4GB | 64 GB)",
    price: "₹10,499",
    cut: "₹14,999",
    save: "₹4,500",
    discount: "58%",
    category: "Phones",
    image: m13,
  },
  {
    id: 3,
    name: "Galaxy M33 (4GB | 64 GB)",
    price: "₹16,999",
    cut: "₹24,999",
    save: "₹8,000",
    discount: "50%",
    category: "Phones",
    image: m33,
  },
  {
    id: 4,
    name: "Galaxy M53 (4GB | 64 GB)",
    price: "₹31,999",
    cut: "₹40,999",
    save: "₹9,000",
    discount: "56%",
    category: "Phones",
    image: m53,
  },
  {
    id: 5,
    name: "Galaxy S23 Ultra",
    price: "₹67,999",
    cut: "₹85,999",
    save: "₹18,000",
    discount: "56%",
    category: "Phones",
    image: s23,
  },

  // ---- Brands (smartphones) ----
  {
    id: 6,
    name: "iPhone 14 Pro Max",
    price: "₹1,29,999",
    cut: "₹1,49,999",
    save: "₹20,000",
    discount: "15%",
    category: "Phones",
    image: iphone,
  },
  {
    id: 7,
    name: "Realme GT Neo",
    price: "₹25,999",
    cut: "₹29,999",
    save: "₹4,000",
    discount: "13%",
    category: "Phones",
    image: realme,
  },
  {
    id: 8,
    name: "Xiaomi 12 Pro",
    price: "₹52,999",
    cut: "₹59,999",
    save: "₹7,000",
    discount: "12%",
    category: "Phones",
    image: xiaomi,
  },
  {
    id: 9,
    name: "Samsung Galaxy Z Fold 4",
    price: "₹1,54,999",
    cut: "₹1,69,999",
    save: "₹15,000",
    discount: "9%",
    category: "Phones",
    image: samsung,
  },
  {
    id: 10,
    name: "Oppo Reno 8",
    price: "₹34,999",
    cut: "₹39,999",
    save: "₹5,000",
    discount: "12%",
    category: "Phones",
    image: oppo,
  },

  // ---- Essentials (Groceries / Daily) ----
  {
    id: 11,
    name: "Daily Essentials Pack",
    price: "₹1,499",
    cut: "₹1,999",
    save: "₹500",
    discount: "25%",
    category: "Essentials",
    image: daily,
  },
  {
    id: 12,
    name: "Fresh Vegetables Basket",
    price: "₹799",
    cut: "₹1,099",
    save: "₹300",
    discount: "27%",
    category: "Essentials",
    image: vegetables,
  },
  {
    id: 13,
    name: "Fruit Combo Pack",
    price: "₹1,299",
    cut: "₹1,699",
    save: "₹400",
    discount: "24%",
    category: "Essentials",
    image: fruits,
  },
  {
    id: 14,
    name: "Fresh Strawberry Box",
    price: "₹599",
    cut: "₹799",
    save: "₹200",
    discount: "25%",
    category: "Essentials",
    image: strawberry,
  },
  {
    id: 15,
    name: "Mango Box (5kg)",
    price: "₹999",
    cut: "₹1,499",
    save: "₹500",
    discount: "33%",
    category: "Essentials",
    image: mango,
  },
  {
    id: 16,
    name: "Cherry Pack",
    price: "₹699",
    cut: "₹999",
    save: "₹300",
    discount: "30%",
    category: "Essentials",
    image: cherry,
  },
];

export const phones = flatProducts.filter((p) => p.category === "Phones");
const products = flatProducts;
export { products };
