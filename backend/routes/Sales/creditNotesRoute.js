const express = require('express');
const creditNotesModel = require('../../models/Sales/creditNotes');
const salesReturnModel = require('../../models/Sales/salesReturnModel');
const router = express.Router();

router.post('/creditnotes', async (req, res) => {
    const returned_items = await salesReturnModel.findOneAndUpdate({ order_id: req.body.order_id }, { $set: { status: req.body.status } });
    const data = await creditNotesModel.create(req.body);
    res.send({ success: data, returned_items });
});

router.get('/creditnotes', async (req, res) => {
    const data = await creditNotesModel.find({});
    res.send({ success: data });
});

module.exports = router;