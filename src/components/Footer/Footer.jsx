import React, { memo } from "react";
import "./Footer.css";

const Footer = memo(function Footer() {
  console.log("Footer render");
  return (
    <footer className="fancy-background">
      <a href="https://github.com/IlliaMatushchak" target="_blank">
        Created by <strong>Illia Matushchak</strong>
      </a>
    </footer>
  );
});

export default Footer;
