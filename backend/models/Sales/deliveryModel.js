const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema({
    customer_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    customer_phone_number: { type: String, required: true },
    customer_billing_address: { type: String, required: true },
    item_name: { type: String, required: true },
    quantity: { type: String, required: true },
    delivery_id: { type: String, required: true, unique: true },
    delivery_date: { type: Date, required: true },
    delivery_status: { type: String, required: true }
});

const deliveryModel = mongoose.model('delivery', deliverySchema);

module.exports = deliveryModel;