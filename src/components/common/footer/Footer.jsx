import React from "react"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
              <img src='../images/logo2.png' alt='' />
              <h2>Do You Need Help With Anything?</h2>
              <p>Receive updates, hot deals, tutorials, discounts sent straignt in your inbox every month</p>

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
            <li><a href="*#">+23487489o</a></li>
            
          </ul>
        </div>
      </div>
    </div>
        </div>  
      </footer>
      <div className='legal'>
        <span>© 2023 Flexile Investment. | All right reserved.</span>
      </div>
    </>
  )
}

export default Footer
