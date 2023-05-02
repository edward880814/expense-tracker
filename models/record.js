const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  amount: {
    type: Number
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = mongoose.model("records", recordSchema);
