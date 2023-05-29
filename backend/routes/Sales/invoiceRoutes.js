const express = require('express');
const salesOrderModel = require('../../models/Sales/salesOrderModel');
const shipmentModel = require('../../models/Sales/shipmentModel');
const packageModel = require('../../models/Sales/PackagesModel');
const deliveryModel = require('../../models/Sales/deliveryModel');
const invoiceModel = require('../../models/Sales/invoiceModel');
const router = express.Router();

router.put('/invoice', async (req, res) => {
    const salesOrders = await salesOrderModel.findOneAndUpdate({ order_id: req.body.invoice_id }, { $set: { status: req.body.invoice_status } });
    const package = await packageModel.findOneAndUpdate({ package_id: req.body.invoice_id }, { $set: { package_status: req.body.invoice_status } });
    const shipping = await shipmentModel.findOneAndUpdate({ shipping_id: req.body.invoice_id }, { $set: { shipping_status: req.body.invoice_status } });
    const delivery = await deliveryModel.findOneAndUpdate({ delivery_id: req.body.invoice_id }, { $set: { delivery_status: req.body.invoice_status } });
    const invoice = new invoiceModel(req.body);
    const data = await invoice.save();
    res.send({ success: salesOrders, package, shipping, delivery, data });
});

router.get('/invoice/:id', async (req, res) => {
    const data = await invoiceModel.find({ customer_id: req.params.id });
    res.send({ success: data });
});

module.exports = router;