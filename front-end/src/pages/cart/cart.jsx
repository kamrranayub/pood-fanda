import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const totalAmount = getTotalCartAmount();
  const hasItems = totalAmount > 0;

  return (
    <div className='cart'>
      {!hasItems ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet</p>
          <button onClick={() => navigate('/')}>Browse Menu</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Item</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr />
            {food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div className="cart-items-title cart-items-item" key={item._id}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <div className="cart-qty-controls">
                      <button onClick={() => removeFromCart(item._id)} className="qty-btn">−</button>
                      <span>{cartItems[item._id]}</span>
                      <button onClick={() => addToCart(item._id)} className="qty-btn">+</button>
                    </div>
                    <p className="cart-item-total">${item.price * cartItems[item._id]}</p>
                    <button onClick={() => removeFromCart(item._id)} className="cart-remove-btn">✕</button>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${totalAmount}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>$2</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${totalAmount + 2}</b>
                </div>
              </div>
              <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>Have a promo code?</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder='Enter promo code' />
                  <button>Apply</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
