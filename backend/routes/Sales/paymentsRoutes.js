const express = require('express');
const paymentsModel = require('../../models/Sales/paymentsReceivedModel');
const router = express.Router();

router.post('/payments', async (req, res) => {
    const payments = new paymentsModel(req.body);
    const data = await payments.save();
    res.send({ success: data });
});

router.get('/payments', async (req, res) => {
    const data = await paymentsModel.find({});
    res.send({ success: data });
});

module.exports = router;