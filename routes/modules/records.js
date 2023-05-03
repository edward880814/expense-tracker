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
    const category = await Category.findOne({ name: record.category });

    if (!category) {
      throw new Error('Category not found');
    }

    await Record.create({ ...record, categoryId: category._id });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
