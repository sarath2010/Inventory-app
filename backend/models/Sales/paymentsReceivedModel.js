const mongoose = require('mongoose');

const paymentsSchema = mongoose.Schema({
    customer_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    customer_address: { type: String, required: true },
    payment_mode: { type: String, required: true },
    amount: { type: Number, required: true },
    received_date: { type: Date, required: true }
});

const paymentsModel = mongoose.model('payments', paymentsSchema);

module.exports = paymentsModel;