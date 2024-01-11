import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header style={{ backgroundColor: "#fff", height: "10vh", boxShadow: "0 5px 30px rgb(0 22 84 / 10%)", padding: "15px 0", position: "sticky", top: 0, zIndex: 99999 }}>
      <div className="container flex">
        {/* Logo */}
        <div className="logos" style={{ marginLeft: "-220px", marginTop: "-5px" }}>
          <img src="./images/logo.png" alt="Logo" style={{ width: "270px", marginTop: "-120px" }} />
        </div>

        {/* Login Button */}
        <div className="button flex">
          <Link to="/login" className="btn11" style={{ marginLeft: "100px", background: "linear-gradient(to right, #a0d8ab, #01e85e)", border: "none", color: "white", padding: "10px 20px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "12px", cursor: "pointer", borderRadius: "9px", marginTop: "-290px" }}>
            <i className="fa fa-sit"></i> Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;