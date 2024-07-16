import React from 'react';

const DishItem = ({ dish, togglePublish }) => {
  return (
    <div className="dish-item">
      <img src={dish.imageUrl} alt={dish.dishName} />
      <h3>{dish.dishName}</h3>
      <button onClick={() => togglePublish(dish._id)}>
        {dish.isPublished ? 'Unpublish' : 'Publish'}
      </button>
    </div>
  );
};

export default DishItem;
