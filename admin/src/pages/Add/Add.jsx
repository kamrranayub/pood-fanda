import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salads",
    price: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Please upload a food image");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        toast.success("Food item added successfully!");
        setData({ name: "", description: "", category: "Salads", price: "" });
        setImage(null);
      } else {
        toast.error(response.data.message || "Failed to add item");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding food item");
    }
    setLoading(false);
  }

  return (
    <div className='add-page'>
      <div className="add-page-header">
        <h2>Add New Food Item</h2>
        <p>Fill in the details below to add a new item to the menu</p>
      </div>

      <form onSubmit={onSubmitHandler} className='add-form card'>
        {/* Image Upload */}
        <div className="form-section">
          <label className="form-label">Food Image</label>
          <label htmlFor="food-image" className="image-upload-area">
            {image ? (
              <div className="image-preview">
                <img src={URL.createObjectURL(image)} alt="Preview" />
                <div className="image-overlay">
                  <span>Change Image</span>
                </div>
              </div>
            ) : (
              <div className="image-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>Click to upload image</span>
                <span className="upload-hint">PNG, JPG up to 5MB</span>
              </div>
            )}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="food-image"
            accept="image/*"
            hidden
          />
        </div>

        {/* Name */}
        <div className="form-section">
          <label className="form-label" htmlFor="food-name">Product Name</label>
          <input
            id="food-name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name='name'
            placeholder='e.g. Margherita Pizza'
            className="form-input"
            required
          />
        </div>

        {/* Description */}
        <div className="form-section">
          <label className="form-label" htmlFor="food-desc">Description</label>
          <textarea
            id="food-desc"
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            rows="4"
            placeholder='Brief description of the dish...'
            className="form-input form-textarea"
            required
          />
        </div>

        {/* Category & Price - Two columns */}
        <div className="form-row">
          <div className="form-section">
            <label className="form-label" htmlFor="food-category">Category</label>
            <select
              id="food-category"
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              className="form-input form-select"
            >
              <option value="Salads">Salads</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="form-section">
            <label className="form-label" htmlFor="food-price">Price ($)</label>
            <input
              id="food-price"
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name='price'
              placeholder='12.99'
              className="form-input"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <button type='submit' className='btn-primary' disabled={loading}>
          {loading ? (
            <span className="btn-loading">
              <span className="btn-spinner"></span>
              Adding...
            </span>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Food Item
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default Add
