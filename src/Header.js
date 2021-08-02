//a component captialize the first letter
import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase.js";
function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    if (user) auth.signOut();
  };
  return (
    <div className="header">
      <Link to="/">
        <FitnessCenterIcon className="header__logo" />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link
          to={!user && "/login"}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello {user ? user?.email : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link
          to="/orders"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <div className="header__option">
            <span className="header__optionLineOne">Return</span>
            <span className="header__optionLineTwo">Orders</span>
          </div>
        </Link>
        <Link
          to="/checkout"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
