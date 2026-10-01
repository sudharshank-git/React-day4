import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import InputBar from "./InputBar";

export default function Header(props) {
  const [searchText, setSearchText] = useState("");
  const [searchedTxt, setSearchedTxt] = useState("");

  function onchanging(event) {
    const value = event.target.value;
    setSearchText(value);
  }

  function onSearchSubmit(e) {
    e.preventDefault();
    props.onClick(searchText);
    setSearchText("");
  }

  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="header-brand">Minion</h1>

        <div className="header-filters">
          <form
            className="seach-bar-container"
            onSubmit={onSearchSubmit}
            role="search"
          >
            <InputBar
              type="text"
              value={searchText}
              placeholder="Search Products"
              onChange={onchanging}
            />
            <Button type="submit" id="search-btn">
              🔍
            </Button>
          </form>
        </div>

        <nav className="header-nav">
          <Link to="/" className="btn btn-secondary">
            Home
          </Link>
          <Link to="/Wishlist">
            <Button>Wishlist ♡</Button>
          </Link>
          <Link to="/cart">
            <Button>🛒 Cart</Button>
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
          <Link to="/dashboard" className="btn btn-secondary">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
