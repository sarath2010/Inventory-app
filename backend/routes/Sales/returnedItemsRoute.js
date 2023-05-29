const express = require('express');
const returnedItemsModel = require('../../models/Sales/returnedItems');
const salesReturnModel = require('../../models/Sales/salesReturnModel');
const itemsModel = require('../../models/Inventory/itemsModel');
const salesOrderModel = require('../../models/Sales/salesOrderModel');
const router = express.Router();

router.put('/addinventory', async (req, res) => {
    // const salesReturn = await salesReturnModel.findOneAndUpdate({ order_id: req.body.order_id }, { $set: { status: req.body.status } });
    // const findItems = await itemsModel.find({ _id: req.body.item_id });
    // if (findItems) {
    //     findItems.opening_stock += req.body.returned_quantity;
    // }
    // console.log(findItems);
    // // const items = await itemsModel.findOneAndUpdate({ _id: req.body.item_id }, { $set: { opening_stock: total_stock } });
    // const returnedItems = new returnedItemsModel(req.body);
    // const data = await returnedItems.save();
    // const salesReturn = await salesReturnModel.find({ order_id: req.body.order_id });
    // console.log(salesReturn);
    // const salesOrders = await salesOrderModel.find({ order_id: req.body.order_id });
    // // const items = await itemsModel.find({ _id: salesOrders.item_id })
    // for (const order of salesOrders) {
    //     const items = await itemsModel.find({ _id: order.item_id });
    //     if (items) {
    //         console.log(items);
    //     }
    //     console.log(items);
    // }
    // console.log(salesOrders);
    // res.send({ success: items });

    const body = req.body;

    const salesOrders = await salesOrderModel.find({ order_id: body.order_id });
    for (const orders of salesOrders) {
        const items = await itemsModel.find({ _id: orders.item_id });
        if (items.length > 0) {
            const item = items[0];
            item.opening_stock += body.returned_quantity;
            await item.save();
        }
    }
    const salesReturn = await salesReturnModel.findOneAndUpdate({ order_id: body.order_id }, { $set: { status: body.status } });
    const returnItems = new returnedItemsModel(req.body);
    const data = await returnItems.save();
    res.send({ success: salesOrders, salesReturn, data });
});

module.exports = router;