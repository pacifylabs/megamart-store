import React from "react";
import appstore from "../assets/appstore.svg";
import googleplay from "../assets/googleplay.png";
import { mostPopularCategories, customerServices } from "../data/data";
export default function Footer() {
  return (
    <footer className="bg-blue-500 text-white py-10 px-6">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4 sm:px-6">
        {}
        <div>
          <h3 className="text-xl font-bold mb-6">MegaMart</h3>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <p className="flex items-center space-x-2 mb-1">
              <i className="fa-brands fa-whatsapp w-5 h-5 text-gray-300"></i>
              <a href="https://wa.me/12029182132">
                WhatsApp <br /> +1 202-918-2132
              </a>
            </p>
            <p className="flex items-center space-x-2">
              <i className="fa-solid fa-phone w-5 h-5 text-gray-300"></i>
              <a href="tel:+12029182132">
                Call Us <br /> +1 202-918-2132
              </a>
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Download App</h4>
            <div className="flex space-x-4">
              <a href="https://apps.apple.com/app/id000000000">
                <img src={appstore} alt="App Store" className="h-12" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.example.app">
                <img src={googleplay} alt="Google Play" className="h-12" />
              </a>
            </div>
          </div>
        </div>
        {}
        <div>
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-white">
            Most Popular Categories
          </h3>
          <ul className="space-y-2">
            {mostPopularCategories.map((item, i) => (
              <li key={i} className="text-sm cursor-pointer hover:underline">
                {item}
              </li>
            ))}
          </ul>
        </div>
        {}
        <div>
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-white">
            Customer Services
          </h3>
          <ul className="space-y-2">
            {customerServices.map((item, i) => (
              <li key={i} className="text-sm cursor-pointer hover:underline">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm opacity-75">
        © {new Date().getFullYear()} All rights reserved. Reliance Retail Ltd.
      </div>
    </footer>
  );
}
