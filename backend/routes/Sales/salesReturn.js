const express = require('express');
const salesReturnModel = require('../../models/Sales/salesReturnModel');
const salesOrderModel = require('../../models/Sales/salesOrderModel');
const router = express.Router();

router.post('/salesreturn', async (req, res) => {
    const salesReturn = new salesReturnModel(req.body);
    const data = await salesReturn.save();
    const salesOrders = await salesOrderModel.findOneAndUpdate({ order_id: req.body.order_id }, { $set: { status: req.body.sales_order_status } })
    res.send({ success: data, salesOrders });
});

router.get('/salesreturn', async (req, res) => {
    const data = await salesReturnModel.find({});
    res.send({ success: data });
});

module.exports = router;