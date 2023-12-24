import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { nav } from "../../data/Data";

const Header = () => {
  const [navList, setNavList] = useState(false);

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src="./images/logo.png" alt="" />
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="button flex">
            <Link to="/login" className="btn1">
              <i className="fa fa-sit"></i> Login
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
