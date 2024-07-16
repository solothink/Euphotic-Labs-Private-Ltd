const express = require('express');
const Dish = require('../models/Dish');

const router = express.Router();

// Fetch all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle publish status
router.put('/:id', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    dish.isPublished = !dish.isPublished;
    await dish.save();

    const io = req.app.get('socketio');
    io.emit('updateDish', dish);

    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
