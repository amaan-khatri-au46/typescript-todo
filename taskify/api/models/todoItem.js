// importing mongoose from mongoose

const mongoose = require("mongoose");

// Here We Had Created a Mongoose Schema

const TodoItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
});

module.exports = mongoose.model("todo", TodoItemSchema);