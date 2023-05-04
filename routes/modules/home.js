const express = require("express");
const router = express.Router();
const Record = require("../../models/Record");
const Category = require("../../models/Category");

router.get("/", (req, res) => {
  const userId = req.user._id;
  Record.find({ userId })
    .lean()
    .sort({ date: "desc" })
    .then((records) => {
      let totalAmount = 0;
      const promises = records.map((record) => {
        return Category.findById(record.categoryId)
          .lean()
          .then((category) => {
            const categoryIcon = category.icon;

            const formattedRecord = {
              ...record,
              categoryIcon,
              date: new Date(record.date).toLocaleString().substring(0, 9),
            };
            totalAmount += record.amount;
            return formattedRecord;
          });
      });
      Promise.all(promises).then((formattedRecords) => {
        res.render("index", { records: formattedRecords, totalAmount });
      });
    });
});

module.exports = router;