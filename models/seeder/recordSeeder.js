const mongoose = require('mongoose')
const db = require("../../config/mongoose");
const User = require("../User");
const Category = require("../category");
const Record = require("../record");
const bcrypt = require("bcryptjs");
const user = {
  name: "DAD",
  password: "123456"
};
const records = [
  { name: "電費", date: "2023/03/01", amount: 3000, category: "家居物業" },
  { name: "火車票", date: "2023/03/02", amount: 350, category: "交通出行" },
  { name: "星際異攻隊電影票", date: "2023/05/03", amount: 250, category: "休閒娛樂" },
  { name: "珍珠奶茶", date: "2023/03/04", amount: 55, category: "餐飲食品" },
  { name: "婚禮紅包", date: "2023/03/25", amount: 6000, category: "其他" },
];

db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(user.password, salt))
    .then((hash) => User.create({ name: user.name, password: hash }))
    .then((user) => {
      const userId = user._id;
      return Promise.all(
        Array.from(records, (record) => {
          return Category.findOne({ name: record.category }).then(
            (category) => {
              const categoryId = category._id;
              return Record.create({ ...record, userId, categoryId });
            }
          );
        })
      );
    })
    .then(() => {
      console.log("recordSeeder is done!");
      process.exit();
    })
    .catch((err) => console.log(err));
});