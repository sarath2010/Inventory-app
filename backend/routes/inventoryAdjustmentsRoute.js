const express = require('express');
const itemsModel = require('../models/itemsModel');
const inventoryAdjModel = require('../models/inventoryAdjustmentsModel');
const moment = require('moment');
const router = express.Router();

// Items updation
router.put('/adjust-items/:id', async (req, res) => {
    const adjustments = new inventoryAdjModel(req.body);
    const items = await itemsModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    const data = await adjustments.save();
    res.send({ success: data });
});

// Inventory adjustments
router.get('/adjust-reports', async (req, res) => {
    const data = await inventoryAdjModel.find({});
    res.send({ success: data })
});

// Adjustment reports by date
router.post('/date-range-reports/:start/:end', async (req, res) => {
    try {
        const { start, end } = req.params;

        const startDate = moment(start).startOf('date');
        const endDate = moment(end).endOf('date');

        const data = await inventoryAdjModel.find({ date: { $gte: startDate, $lte: endDate } });
        res.send({ success: data });
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;