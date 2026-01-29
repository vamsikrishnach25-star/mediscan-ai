// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 border-t mt-auto">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} MediScan AI — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
