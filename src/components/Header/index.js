import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  const buttonRef = React.useRef(null);
  function handleClick() {
    const elNode = ReactDOM.findDOMNode(buttonRef.current);
    elNode.classList.toggle("show");
  }
  return (
    <header>
      <Link to="/">
        <p>HackerNews</p>
      </Link>
      <div className="navigation">
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
      <div className="dropdown-nav">
        <button type="button" onClick={handleClick} >
          ☰
        </button>
        <div className="dropdown-content" ref={buttonRef}>
          <Link to="/news">
            News
          </Link>
          <Link to="/newest">
            Newest
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
