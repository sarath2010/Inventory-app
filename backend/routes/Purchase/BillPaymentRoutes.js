const express = require('express');
const billPaymentModel = require('../../models/Purchase/billPaymentsModel');
const purchaseOrderModel = require('../../models/Purchase/purchaseOrdersModel');
const itemsModel = require('../../models/Inventory/itemsModel');
const router = express.Router();

router.post('/billpayments', async (req, res) => {
    const data = await billPaymentModel.create(req.body);
    const purchase = await purchaseOrderModel.findOneAndUpdate(req.body.purchaseId, { $set: { status: req.body.status } });
    const addItems = await itemsModel.findByIdAndUpdate({ _id: req.body.item_id }, { $inc: { opening_stock: req.body.order_quantity } });
    const updateItemsDate = await itemsModel.findByIdAndUpdate({ _id: req.body.item_id }, { $set: { created_At: new Date() } })
    res.send({ success: data, purchase, addItems, updateItemsDate });
});

router.get('/billpayments', async (req, res) => {
    const data = await billPaymentModel.find({});
    res.send({ success: data });
})

module.exports = router;