const mongoose = require('mongoose');

const salesReturnSchema = mongoose.Schema({
    order_id: { type: Number, required: true, unique: true },
    customer_name: { type: String, required: true },
    item_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    item_name: { type: String, required: true },
    ordered_quantity: { type: Number, required: true },
    returned_quantity: { type: Number, required: true },
    returned_date: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, required: true },
    selling_price: { type: Number, required: true }
});

const salesReturnModel = mongoose.model('salesreturn', salesReturnSchema);

module.exports = salesReturnModel;