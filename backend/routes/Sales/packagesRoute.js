const express = require('express');
const packageModel = require('../../models/Sales/PackagesModel');
const salesOrderModel = require('../../models/Sales/salesOrderModel');
const router = express.Router();

router.put('/packages', async (req, res) => {
    const salesOrderStatus = await salesOrderModel.findOneAndUpdate({ order_id: req.body.package_id }, { $set: { status: req.body.status } });
    const package = new packageModel(req.body);
    const data = await package.save();
    res.send({ success: data, salesOrderStatus });
});

router.get('/packages', async (req, res) => {
    const data = await packageModel.find({});
    res.send({ success: data });
});

router.get('/packages/view/:id', async (req, res) => {
    const data = await packageModel.find({ customer_id: req.params.id });
    res.send({ success: data });
});

module.exports = router;