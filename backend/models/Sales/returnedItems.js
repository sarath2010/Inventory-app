const mongoose = require('mongoose');

const returnedItemsSchema = mongoose.Schema({
    order_id: { type: Number, required: true },
    customer_name: { type: String, required: true },
    item_name: { type: String, required: true },
    ordered_quantity: { type: Number, required: true },
    returned_quantity: { type: Number, required: true },
    reason: { type: String, required: true },
    returned_date: { type: Date, required: true },
    status: { type: String, required: true },
    selling_price: { type: Number, required: true }
});

const returnedItemsModel = mongoose.model('returned-items', returnedItemsSchema);

module.exports = returnedItemsModel;