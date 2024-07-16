const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Dish = require('./models/Dish');
const dishRoutes = require('./routes/dishes');
const initialDishes = require('./data/initialDishes'); // For Import the initial dishes
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use('/api/dishes', dishRoutes);

mongoose.connect('mongodb://localhost:27017/dishMDB', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');
  const dishCount = await Dish.countDocuments();
  if (dishCount === 0) {
    await Dish.insertMany(initialDishes);
    console.log('Initial dishes inserted');
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.set('socketio', io);

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});

module.exports = io;
