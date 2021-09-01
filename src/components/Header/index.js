import React from "react";
import { Link } from "react-router-dom";
import "./stylesheet.css";

function Header() {
  return (
    <header>
      <Link to="/">
        <p>HackerNews</p>
      </Link>
      <div>
        <Link to="/news">
          <button type="button">
            News
          </button>
        </Link>
        <Link to="/newest">
          <button type="button">
            Newest
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
