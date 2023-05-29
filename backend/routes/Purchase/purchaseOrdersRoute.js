const express = require('express');
const purchaseOrderModel = require('../../models/Purchase/purchaseOrdersModel');
const router = express.Router();

router.post('/purchaseorders', async (req, res) => {
    const data = await purchaseOrderModel.create(req.body);
    res.send({ success: data })
});

router.get('/purchaseorders', async (req, res) => {
    const data = await purchaseOrderModel.find({});
    res.send({ success: data })
})

module.exports = router