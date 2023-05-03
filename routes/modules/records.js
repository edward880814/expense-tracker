//為了創建新的紀錄並在資料庫保存他們
const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');
const Category = require('../../models/Category');

// 新增紀錄頁面
router.get('/create', async (req, res) => {
  try {
    res.render('create');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// 新增紀錄
router.post('/', async (req, res) => {
  try {
    const record = req.body;
    const userId = req.user._id;
    const category = await Category.findOne({ name: record.category });

    if (!category) {
      throw new Error('Category not found');
    }

    await Record.create({ ...record, categoryId: category._id, userId });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



//* 修改功能
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  Record.findById(id)
    .lean()
    .then((record) => {
      record.date = record.date.toISOString().substring(0, 10);
      Category.findById(record.categoryId).then((category) => {
        record.category = category.name;
        res.render("edit", { record });
      });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const record = req.body;
  Category.findOne({ name: record.category })
    .then((category) => {
      record.categoryId = category._id;
      return Record.findByIdAndUpdate(id, { ...record });
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});


//* 刪除支出紀錄
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Record.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Detect Error!");
  }
});

module.exports = router;
