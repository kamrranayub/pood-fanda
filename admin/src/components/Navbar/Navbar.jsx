import React from 'react'
import './Navbar.css'
import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/orders': 'Orders',
  '/list': 'Food Items',
  '/add': 'Add New Item'
}

const Navbar = () => {
  const location = useLocation();
  const currentPage = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className='admin-navbar'>
      <div className="admin-navbar-left">
        <h1 className="admin-navbar-title">{currentPage}</h1>
      </div>
      <div className="admin-navbar-right">
        <div className="admin-navbar-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search..." />
        </div>
        <button className="admin-navbar-notif" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="notif-dot"></span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
