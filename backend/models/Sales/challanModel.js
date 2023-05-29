const mongoose = require('mongoose');

const challanSchema = mongoose.Schema({
    customer_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    customer_phone_number: { type: String, required: true },
    customer_billing_address: { type: String, required: true },
    item_name: { type: String, required: true },
    quantity: { type: String, required: true },
    order_id: { type: String, required: true, unique: true },
    challan_id: { type: String, required: true }
});

const challanModel = mongoose.model('challans', challanSchema);

module.exports = challanModel;