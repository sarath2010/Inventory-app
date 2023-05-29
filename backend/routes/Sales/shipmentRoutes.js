const express = require('express');
const salesOrderModel = require('../../models/Sales/salesOrderModel');
const packageModel = require('../../models/Sales/PackagesModel');
const shipmentModel = require('../../models/Sales/shipmentModel');
const challanModel = require('../../models/Sales/challanModel');
const router = express.Router();

// challan and shipping
router.put('/shipping', async (req, res) => {
    const salesOrders = await salesOrderModel.findOneAndUpdate({ order_id: req.body.shipping_id }, { $set: { status: req.body.shipping_status } });
    const package = await packageModel.findOneAndUpdate({ package_id: req.body.shipping_id }, { $set: { package_status: req.body.shipping_status } });
    const shipping = new shipmentModel(req.body);
    const shippingData = await shipping.save();
    const challan = new challanModel(req.body);
    const challanData = await challan.save();
    res.send({ success: shippingData, challanData, salesOrders, package });
});

router.get('/challans/:id', async (req, res) => {
    const data = await challanModel.find({ customer_id: req.params.id });
    res.send({ success: data });
});

module.exports = router;