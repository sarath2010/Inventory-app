const express = require('express');
const vendorsCreditModel = require('../../models/Purchase/vendorsCredit');
const billPaymentModel = require('../../models/Purchase/billPaymentsModel');
const purchaseOrderModel = require('../../models/Purchase/purchaseOrdersModel');
const router = express.Router();

router.put('/vendorcredits', async (req, res) => {
    const data = await vendorsCreditModel.create(req.body);
    const bills = await billPaymentModel.findOneAndUpdate(req.body.purchaseId, { $set: { status: req.body.status } });
    const purchase = await purchaseOrderModel.findOneAndUpdate(req.body.purchaseId, { $set: { status: req.body.status } })
    res.send({ success: data, bills, purchase });
});

router.get('/vendorcredits', async (req, res) => {
    const data = await vendorsCreditModel.find({});
    res.send({ success: data });
});

module.exports = router;