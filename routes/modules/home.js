const express = require("express");
const router = express.Router();
const Record = require("./../../models/Record");
const Category = require("../../models/Category");


router.get("/", (req, res) => {
  async function getFormattedRecords() {
    const userId = req.user._id;
    const records = await Record.find({ userId }).lean().sort({ date: "desc" });
    let totalAmount = 0;
    const formattedRecords = await records.reduce(async (accPromise, record) => {
      const acc = await accPromise;
      const category = await Category.findById(record.categoryId).lean();
      const categoryIcon = category.icon;
      const formattedRecord = formatRecord(record, categoryIcon);
      totalAmount += record.amount;
      return [...acc, formattedRecord];
    }, Promise.resolve([]));

    return { formattedRecords, totalAmount };
  }

  function formatRecord(record, categoryIcon) {
    const formattedDate = new Date(record.date).toLocaleString().substring(0, 9);
    const formattedRecord = Object.assign({}, record, { categoryIcon, date: formattedDate });
    return formattedRecord;
  }

  getFormattedRecords().then(({ formattedRecords, totalAmount }) => {
    res.render("index", { records: formattedRecords, totalAmount });
  });
});

module.exports = router;