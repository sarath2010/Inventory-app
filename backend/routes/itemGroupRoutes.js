const express = require('express');
const itemsGroupModel = require('../models/itemsGroupModel');
const router = express.Router();

// Add item-group
router.post('/items-group', async (req, res) => {
    const itemGroup = new itemsGroupModel(req.body);
    const data = await itemGroup.save();
    res.send({ success: data });
});

// Get item-groups
router.get('/items-group', async (req, res) => {
    const data = await itemsGroupModel.find({});
    res.send({ success: data });
});

module.exports = router;