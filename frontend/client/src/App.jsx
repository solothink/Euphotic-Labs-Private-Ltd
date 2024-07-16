import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import DishItem from './components/DishItem';

const socket = io('http://localhost:5000');

const App = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();

    // Listen for real-time updates
    socket.on('updateDish', (updatedDish) => {
      setDishes((prevDishes) =>
        prevDishes.map((dish) => (dish._id === updatedDish._id ? updatedDish : dish))
      );
    });

    return () => {
      socket.off('updateDish');
    };
  }, []);

  const fetchDishes = async () => {
    const response = await axios.get('http://localhost:5000/api/dishes');
    setDishes(response.data);
  };

  const togglePublish = async (id) => {
    const response = await axios.put(`http://localhost:5000/api/dishes/${id}`);
    setDishes((prevDishes) =>
      prevDishes.map((dish) => (dish._id === response.data._id ? response.data : dish))
    );
  };

  return (
    <div className="App">
      <h1>Dish Management Dashboard</h1>
      <div className="dish-list">
        {dishes.map((dish) => (
          <DishItem key={dish._id} dish={dish} togglePublish={togglePublish} />
        ))}
      </div>
    </div>
  );
};

export default App;
