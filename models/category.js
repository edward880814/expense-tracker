const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String
  }
});

const CategoryModel = mongoose.model("categories", CategorySchema);

module.exports = CategoryModel;
