const mongoose = require('mongoose');

const db = require("../../config/mongoose");
const Category = require("../Category");
const category = [
  { name: "家居物業" },
  { name: "交通出行" },
  { name: "休閒娛樂" },
  { name: "餐飲食品" },
  { name: "其他" },
];
db.once("open", () => {
  Category.create(category)
    .then(() => {
      console.log("categorySeed is done!");
      process.exit();
    })
    .catch((err) => console.log(err));
});