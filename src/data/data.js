import { default as accesories, default as watches } from "../assets/accessories.jpeg";
import cherry from "../assets/cherry.jpeg";
import daily from "../assets/daily.jpeg";
import fruits from "../assets/fruits.jpeg";
import furnitures from "../assets/furnitures.jpeg";
import m13 from "../assets/galaxy m13.jpeg";
import m33 from "../assets/galaxy m33.jpeg";
import m53 from "../assets/galaxy m53.jpeg";
import iphone from "../assets/iphone.jpeg";
import mango from "../assets/mango.jpeg";
import oppo from "../assets/oppo.jpeg";
import realme from "../assets/realme.jpeg";
import s22 from "../assets/s22 ultra.jpeg";
import s23 from "../assets/s23 ultra.jpeg";
import samsung from "../assets/samsung.jpeg";
import smartphones from "../assets/smartphones.png";
import strawberry from "../assets/strawberry.jpeg";
import summer from "../assets/summer.png";
import vegetables from "../assets/vegetables.jpeg";
import wearable from "../assets/wearable.png";
import xiaomi from "../assets/xiaomi.jpeg";

export const phones = [
  {
    id: 1,
    name: "Galaxy S22 Ultra",
    price: "₹32,999",
    cut: "₹40,999",
    save: "₹8,000",
    discount: "55% OFF",
    img: s22,
    category: "Phones",
    description: "A very good phone with excellent features",
    stock: 15,
  },
  {
    id: 2,
    name: "Galaxy M13 (4GB | 64 GB)",
    price: "₹10,499",
    cut: "₹14,999",
    save: "₹4,500",
    discount: "58% OFF",
    img: m13,
    category: "Phones",
    stock: 20,
  },
  {
    id: 3,
    name: "Galaxy M33 (4GB | 64 GB)",
    price: "₹16,999",
    cut: "₹24,999",
    save: "₹8,000",
    discount: "50% OFF",
    img: m33,
    category: "Phones",
  },
  {
    id: 4,
    name: "Galaxy M53 (6GB | 128 GB)",
    price: "₹31,999",
    cut: "₹40,999",
    save: "₹9,000",
    discount: "56% OFF",
    img: m53,
    category: "Phones",
    stock: 10,
  },
  {
    id: 5,
    name: "Galaxy S23 Ultra",
    price: "₹67,999",
    cut: "₹85,999",
    save: "₹18,000",
    discount: "56% OFF",
    img: s23,
    category: "Phones",
    stock: 7,
  },
  {
    id: 6,
    name: "Samsung Galaxy A14 (6GB | 128 GB)",
    price: "₹13,499",
    cut: "₹18,999",
    save: "₹5,500",
    discount: "52% OFF",
    img: samsung,
    category: "Phones",
  },
  {
    id: 7,
    name: "Oppo F23 5G (6GB | 128 GB)",
    price: "₹17,999",
    cut: "₹24,499",
    save: "₹6,500",
    discount: "53% OFF",
    img: oppo,
    category: "Phones",
  },
  {
    id: 8,
    name: "Realme Narzo 60 5G (8GB | 256 GB)",
    price: "₹25,999",
    cut: "₹34,999",
    save: "₹9,000",
    discount: "51% OFF",
    img: realme,
    category: "Phones",
  },
  {
    id: 9,
    name: "iPhone 14 Pro (128 GB)",
    price: "₹99,999",
    cut: "₹1,29,999",
    save: "₹30,000",
    discount: "46% OFF",
    img: iphone,
    category: "Phones",
  },
  {
    id: 10,
    name: "Xiaomi Redmi Note 12 Pro (8GB | 256 GB)",
    price: "₹29,499",
    cut: "₹39,999",
    save: "₹10,500",
    discount: "57% OFF",
    img: xiaomi,
    category: "Phones",
  },
];

export const heroSlides = [
  {
    titleTop: "Best Deal Online on smart watches",
    titleMain: "SMART WEARABLE.",
    subtitle: "UP TO 80% OFF",
    img: wearable,
    bg: "#0b2340",
  },
  {
    titleTop: "Exclusive Offer",
    titleMain: "SUMMER ELECTRONICS SALE",
    subtitle: "UP TO 70% OFF",
    img: summer,
    bg: "#0b2340",
  },
  {
    titleTop: "Limited Time",
    titleMain: "TOP SMARTPHONES",
    subtitle: "UP TO 60% OFF",
    img: smartphones,
    bg: "#0b2340",
  },
];

export const categories = [
  {
    name: "Mobile",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Cosmetics",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Electronics",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop",
  },
  { name: "Furniture", img: furnitures },
  { name: "Watches", img: watches },
  {
    name: "Decor",
    img: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=400&auto=format&fit=crop",
  },
  { name: "Accessories", img: accesories },
];

export const brandSlides = [
  {
    title: "IPHONE",
    subtitle: "UP to 80% OFF",
    img: iphone,
    bg: "#111827",
    color: "white",
  },
  {
    title: "realme",
    subtitle: "UP to 80% OFF",
    img: realme,
    bg: "#facc15",
    color: "black",
  },
  {
    title: "XIAOMI",
    subtitle: "UP to 80% OFF",
    img: xiaomi,
    bg: "#fb923c",
    color: "white",
  },
  {
    title: "SAMSUNG",
    subtitle: "UP to 70% OFF",
    img: samsung,
    bg: "#e6eef2",
    color: "black",
  },
  {
    title: "OPPO",
    subtitle: "UP to 75% OFF",
    img: oppo,
    bg: "#fff1f2",
    color: "black",
  },
];

export const essentials = [
  { name: "Daily Essentials", img: daily, alt: "Daily Essentials" },
  { name: "Vegetables", img: vegetables, alt: "Vegetables" },
  { name: "Fruits", img: fruits, alt: "Fruits" },
  { name: "Strawberry", img: strawberry, alt: "Strawberry" },
  { name: "Mango", img: mango, alt: "Mango" },
  { name: "Cherry", img: cherry, alt: "Cherry" },
];

export const mostPopularCategories = [
  "Staples",
  "Beverages",
  "Personal Care",
  "Home Care",
  "Baby Care",
  "Vegetables & Fruits",
  "Snacks & Foods",
  "Dairy & Bakery",
];

export const customerServices = [
  "About Us",
  "Terms & Conditions",
  "FAQ",
  "Privacy Policy",
  "E-waste Policy",
  "Cancellation & Return Policy",
];
export const essential = [
  {
    id: 11,
    name: "Sony WH-1000XM5 Headphones",
    price: "₹34,999",
    image: "",
    category: "Electronics",
    discount: "50%",
    stock: 30,
  },
  {
    id: 12,
    name: "LG 55\" 4K Smart TV",
    price: "₹59,999",
    image: "",
    category: "Electronics",
    discount: "50%",
    stock: 25,
  },
  {
    id: 13,
    name: "Apple AirPods Pro",
    price: "₹24,999",
    image: "",
    category: "Electronics",
    discount: "50%",
    stock: 40,
  },
];
export const mostPopularCategory = [
  { id: 1, title: "Smartphones" },
  { id: 2, title: "Essentials" },
  { id: 3, title: "Electronics" },
];
