import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className='containers '>
          <div className='box'>
            <div className='logo'>
              <img src='../images/logo2.png' alt='' />
              <h2>Do You Need Help With Anything?</h2>
              <p>Receive updates, hot deals, tutorials, discounts sent straight to your inbox every month</p>

              <div className='input flex'>
                <input type='text' placeholder='Email Address' />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex">
              <div className="nav-item">
                <h4>Contact Us</h4>
                <ul>
                  <li><span>Address:</span> No 142, Oba akran, ikeja, Lagos</li>
                  <li><span>Phone:</span> +234 874 890</li>
                  <li><span>Email:</span> flexileinvestments@gmail.com</li>
                  <li><span>Facebook:</span> <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">Flexile Investment</a></li>
                  <li><span>Instagram:</span> <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">flexileinvestments</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <span>© 2023 Flexile Investment. | All rights reserved.</span>
      </div>
    </>
  )
}

export default Footer;