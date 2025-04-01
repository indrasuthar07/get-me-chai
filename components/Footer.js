"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-2 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Get Me a Chai - By Indra Suthar. All rights reserved.
      </p>
      <div className="flex justify-center gap-4 mt-1">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white hover:text-blue-400 transition duration-300"
        >
          <img
            src="/twitter.svg"
            alt="Twitter"
            className="w-5 h-5 filter invert"
          />
          Twitter
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white hover:text-blue-400 transition duration-300"
        >
          <img
            src="/facebook.svg"
            alt="Facebook"
            className="w-5 h-5 filter invert"
          />
          Facebook
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white hover:text-blue-400 transition duration-300"
        >
          <img
            src="/instagram.svg"
            alt="Instagram"
            className="w-5 h-5 filter invert"
          />
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;