import React, { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
    setLoading(false);
  }

  const updateStatus = async (orderId, status) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, { orderId, status });
      if (response.data.success) {
        toast.success(`Order marked as "${status}"`);
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const stats = {
    total: orders.length,
    processing: orders.filter(o => o.status === 'Food Processing').length,
    delivery: orders.filter(o => o.status === 'Out for Delivery').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    revenue: orders.filter(o => o.payment).reduce((sum, o) => sum + o.amount, 0)
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const getStatusBadgeClass = (status) => {
    if (status === 'Delivered') return 'status-badge success';
    if (status === 'Out for Delivery') return 'status-badge info';
    return 'status-badge warning';
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="orders-spinner"></div>
        <p>Loading orders...</p>
      </div>
    )
  }

  return (
    <div className='orders-page'>
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon stat-icon-total">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
          </div>
          <div className="stat-content">
            <p className="stat-value">{stats.total}</p>
            <p className="stat-label">Total Orders</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon stat-icon-processing">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div className="stat-content">
            <p className="stat-value">{stats.processing}</p>
            <p className="stat-label">Processing</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon stat-icon-delivery">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <div className="stat-content">
            <p className="stat-value">{stats.delivery}</p>
            <p className="stat-label">Out for Delivery</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon stat-icon-revenue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div className="stat-content">
            <p className="stat-value">${stats.revenue}</p>
            <p className="stat-label">Revenue</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="orders-toolbar">
        <div className="filter-tabs">
          {[
            { key: 'all', label: 'All Orders', count: stats.total },
            { key: 'Food Processing', label: 'Processing', count: stats.processing },
            { key: 'Out for Delivery', label: 'In Transit', count: stats.delivery },
            { key: 'Delivered', label: 'Delivered', count: stats.delivered },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
            >
              {tab.label}
              <span className="filter-count">{tab.count}</span>
            </button>
          ))}
        </div>
        <button onClick={fetchOrders} className="refresh-btn" title="Refresh orders" aria-label="Refresh orders">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
        </button>
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="orders-empty card">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{opacity:0.3}}>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
          </svg>
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-list">
          {filtered.map((order, index) => (
            <div key={order._id || index} className="order-card card">
              <div className="order-card-top">
                <div className="order-card-id">
                  <span className="order-hash">#</span>{(order._id || '').slice(-6).toUpperCase()}
                </div>
                <span className={getStatusBadgeClass(order.status)}>{order.status}</span>
              </div>

              <div className="order-card-items">
                {order.items.map((item, i) => (
                  <span key={i} className="order-item-tag">
                    {item.name} <span className="order-item-qty">x{item.quantity}</span>
                  </span>
                ))}
              </div>

              <div className="order-card-info">
                <div className="order-customer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <span>{order.address?.firstName} {order.address?.lastName}</span>
                </div>
                <div className="order-address">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{order.address?.street}, {order.address?.city}</span>
                </div>
                {order.address?.phoneNumber && (
                  <div className="order-phone">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span>{order.address?.phoneNumber}</span>
                  </div>
                )}
              </div>

              <div className="order-card-bottom">
                <div className="order-amount">
                  <span className="amount-label">Total</span>
                  <span className="amount-value">${order.amount}</span>
                </div>
                <div className="order-date">
                  {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="order-status-select"
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
