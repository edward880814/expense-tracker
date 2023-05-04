const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/:category", (req, res) => {
  const category = req.params.category;
  const userId = res.locals.user._id;
  Category.findOne({ name: category }).then((category) => {
    const categoryId = category._id;

    return Record.find({ userId, categoryId })
      .lean()
      .sort({ date: "desc" })
      .then((records) => {
        let totalAmount = 0;
        const formattedRecords = records.map((record) => {
          totalAmount += record.amount;
          record.date = new Date(record.date).toLocaleString().substring(0, 9);
          record.categoryIcon = category.icon;
          return record;
        });
        res.render("index", { records: formattedRecords, totalAmount });
      });
  });
});

module.exports = router;