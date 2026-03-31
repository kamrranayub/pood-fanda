import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">PF</div>
          <div className="sidebar-logo-text">
            <span className="sidebar-brand">Pood Fanda</span>
            <span className="sidebar-role">Admin Panel</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-section-label">MENU</p>

        <NavLink to='/orders' className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            <path d="M9 14l2 2 4-4"/>
          </svg>
          <span>Orders</span>
        </NavLink>

        <NavLink to='/list' className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          <span>Food Items</span>
        </NavLink>

        <NavLink to='/add' className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          <span>Add Item</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-info">
          <div className="sidebar-avatar">
            <img src={assets.profile_image} alt="Admin" />
          </div>
          <div className="sidebar-user">
            <span className="sidebar-user-name">Admin</span>
            <span className="sidebar-user-role">Manager</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
