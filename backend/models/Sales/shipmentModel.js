const mongoose = require('mongoose');

const shipmentSchema = mongoose.Schema({
    customer_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    customer_phone_number: { type: String, required: true },
    customer_billing_address: { type: String, required: true },
    item_name: { type: String, required: true },
    quantity: { type: String, required: true },
    shipping_id: { type: String, required: true, unique: true },
    shipping_date: { type: Date, required: true },
    shipping_status: { type: String, required: true }
});

const shipmentModel = mongoose.model('shipments', shipmentSchema);

module.exports = shipmentModel;