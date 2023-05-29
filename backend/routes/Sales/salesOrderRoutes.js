const express = require('express');
const salesOrderModel = require('../../models/Sales/salesOrderModel');
const itemsModel = require('../../models/Inventory/itemsModel');
const router = express.Router();

router.put('/salesorders', async (req, res) => {
    try {
        req.body.map(async (value) => {
            await itemsModel.updateOne({ _id: value.item_id }, { $set: { opening_stock: value.opening_stock } });
        })
        const salesOrder = await salesOrderModel.insertMany(req.body);
        res.send({ success: salesOrder });
    } catch (error) {
        res.send(error);
        return;
    }
});

// get sales order
router.get('/salesorder', async (req, res) => {
    const data = await salesOrderModel.find({});
    res.send({ success: data });
});

router.get('/salesorder/:id', async (req, res) => {
    const data = await salesOrderModel.find({ customer_id: req.params.id });
    res.send({ success: data });
});

router.get('/salesorderbyitems/:id', async (req, res) => {
    const data = await salesOrderModel.find({ item_id: req.params.id });
    res.send({ success: data });
});

router.get('/salesorderbycustomers/:name', async (req, res) => {
    const data = await salesOrderModel.find({ customer_name: req.params.name });
    res.send({ success: data });
});

module.exports = router;