import React, { useContext, useEffect, useState } from 'react'
import './myOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s?.includes('delivered')) return '#22c55e';
    if (s?.includes('out for delivery')) return '#3b82f6';
    if (s?.includes('processing')) return '#f59e0b';
    return '#6b7280';
  }

  if (loading) {
    return (
      <div className='myorders'>
        <h2>My Orders</h2>
        <div className="myorders-loading">
          <div className="spinner-small"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='myorders'>
      <h2>My Orders</h2>
      {data.length === 0 ? (
        <div className='myorders-empty'>
          <img src={assets.parcel_icon} alt="" />
          <p>No orders yet</p>
          <span>Your order history will appear here</span>
        </div>
      ) : (
        <div className="myorders-list">
          {data.map((order, index) => (
            <div key={index} className="myorders-order">
              <div className="myorders-order-header">
                <div className="myorders-order-icon">
                  <img src={assets.parcel_icon} alt="" />
                </div>
                <div className="myorders-order-info">
                  <p className="myorders-items-text">
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.name} x {item.quantity}
                        {i < order.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                  <p className="myorders-date">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="myorders-order-details">
                <p className="myorders-amount">${order.amount}.00</p>
                <p className="myorders-count">Items: {order.items.length}</p>
                <div className="myorders-status" style={{ color: getStatusColor(order.status) }}>
                  <span className="status-dot" style={{ backgroundColor: getStatusColor(order.status) }}></span>
                  {order.status}
                </div>
                <button onClick={fetchOrders} className="myorders-track-btn">Track Order</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders
