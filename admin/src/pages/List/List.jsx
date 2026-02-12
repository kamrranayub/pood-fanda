import React, { useState, useEffect } from 'react'
import './List.css'
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.status === 200) {
        setList(response.data);
      }
    } catch (error) {
      toast.error("Error fetching food list: " + error.message);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id });
      if (response.data.success) {
        toast.success("Food item deleted successfully!");
        fetchList();
      } else {
        toast.error("Error deleting food item");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);


  return (
    <div className='list add flex-col'>
      <p>All Food Lists</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Action</b>
          <b>Category</b>
          <b>Price</b>
        </div>
        {list.map((item, index)=>{
          return (
            <div key={index} className="list-table-format">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <button onClick={() => handleDelete(item._id)} className='cursor'>X</button>
              <p>{item.category}</p>
              <p>${item.price}</p>
            </div>
          )
        } )}
      </div>
    </div>
  )
}

export default List
