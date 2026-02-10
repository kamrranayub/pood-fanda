import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {

  
    const {cartItems,addToCart,removeFromCart} = React.useContext(StoreContext);



  const handleAddClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    addToCart(id);
  }

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    removeFromCart(id);
  }

  return (
    <div className='food-item'>
      <div className="food-item-name-img-container">
        <img className='food-item-img' src={image} alt={name} draggable={false} />
        {!cartItems[id]
           ?<img className='add' onClick={handleAddClick} src={assets.add_icon_white} alt="" draggable={false} />
           :<div className='food-item-counter'>
               <img onClick={handleRemoveClick} src={assets.remove_icon_red} alt="" draggable={false} />
               <p>{cartItems[id]}</p>
               <img onClick={handleAddClick} src={assets.add_icon_green} alt="" draggable={false} />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-description'>{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
