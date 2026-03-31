import React, { useState, useEffect } from 'react'
import './List.css'
import { toast } from 'react-toastify'
import axios from 'axios'

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.status === 200) {
        setList(response.data);
      }
    } catch (error) {
      toast.error("Error fetching food list");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchList();
  }, [url]);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id });
      if (response.data.success) {
        toast.success("Item deleted successfully");
        setList(prev => prev.filter(item => item._id !== id));
      } else {
        toast.error("Error deleting item");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  }

  const filtered = list.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="list-loading">
        <div className="list-spinner"></div>
        <p>Loading food items...</p>
      </div>
    )
  }

  return (
    <div className='list-page'>
      <div className="list-header">
        <div>
          <h2>Food Items</h2>
          <p className="list-count">{list.length} items in menu</p>
        </div>
        <div className="list-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="list-empty card">
          <p>{search ? 'No items match your search' : 'No food items added yet'}</p>
        </div>
      ) : (
        <div className="list-grid">
          {filtered.map((item) => (
            <div key={item._id} className="list-card card">
              <div className="list-card-img">
                <img src={item.image} alt={item.name} loading="lazy" />
                <span className="list-card-category">{item.category}</span>
              </div>
              <div className="list-card-body">
                <h3 className="list-card-name">{item.name}</h3>
                <p className="list-card-price">${item.price}</p>
              </div>
              <div className="list-card-actions">
                <button
                  onClick={() => handleDelete(item._id, item.name)}
                  className="list-card-delete"
                  title="Delete item"
                  aria-label={`Delete ${item.name}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default List
