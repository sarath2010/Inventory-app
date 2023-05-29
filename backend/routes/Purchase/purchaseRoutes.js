const express = require('express');
const vendorsModel = require('../../models/Purchase/vendors');
const router = express.Router();

router.post('/vendors', async (req, res) => {
    const data = await vendorsModel.create(req.body);
    res.send({ success: data })
})

router.get('/vendors', async (req, res) => {
    const data = await vendorsModel.find({});
    res.send({ success: data })
})

router.put('/vendors/:id', async (req, res) => {
    const data = await vendorsModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send({ success: data })
})

module.exports = router;