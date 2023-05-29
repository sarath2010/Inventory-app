const express = require('express');
const salesOrderModel = require('../../models/Sales/salesOrderModel');
const packageModel = require('../../models/Sales/PackagesModel');
const shipmentModel = require('../../models/Sales/shipmentModel');
const deliveryModel = require('../../models/Sales/deliveryModel');
const router = express.Router();

router.put('/delivery', async (req, res) => {
    const salesOrders = await salesOrderModel.findOneAndUpdate({ order_id: req.body.delivery_id }, { $set: { status: req.body.delivery_status } });
    const package = await packageModel.findOneAndUpdate({ package_id: req.body.delivery_id }, { $set: { package_status: req.body.delivery_status } });
    const shipping = await shipmentModel.findOneAndUpdate({ shipping_id: req.body.delivery_id }, { $set: { shipping_status: req.body.delivery_status } });
    const delivery = new deliveryModel(req.body);
    const data = await delivery.save();
    res.send({ success: salesOrders, package, shipping, data });
});

module.exports = router;