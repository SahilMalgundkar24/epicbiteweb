import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-400 py-4 flex flex-col sm:flex-row justify-between items-center px-6 bg-white text-sm text-gray-600 mt-5">
      <p className="text-center sm:text-left">
        © {new Date().getFullYear()} All rights reserved.
      </p>
      <p className="text-center sm:text-right mt-2 sm:mt-0">
        Designed and Developed by{" "}
        <a
          href="https://sahilmalgundkar.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#CE2425] font-medium hover:underline"
        >
          Sahil Malgundkar
        </a>
      </p>
    </footer>
  );
};

export default Footer;
