import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    
    <div className='footer' id='footer'>
        
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque id rerum pariatur quidem cum, hic nulla. Porro, maxime consequuntur. Omnis nam accusamus esse! Dolores, perspiciatis quidem!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </div>

            <div className="footer-content-right">
                <h2>Get in Touch</h2>
                <ul>
                    <li>+92-314234-1</li>
                    <li>food@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            &copy; 2024 PoodFanda. All rights reserved.
        </p>
    </div>
  )
}

export default Footer