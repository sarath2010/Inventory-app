const mongoose = require('mongoose');

const billPaymentSchema = mongoose.Schema({
    billing_date: { type: Date, required: true },
    item_group: { type: String, required: true },
    item: { type: String, required: true },
    order_quantity: { type: Number, required: true },
    order_date: { type: Date, required: true },
    vendors_name: { type: String, required: true },
    vendors_email: { type: String, required: true },
    vendors_phone_number: { type: Number, required: true },
    payment_terms: { type: Number, required: true },
    amount: { type: Number, required: true },
    bill_reference: { type: Number, required: true },
    purchaseId: { type: Number, required: true },
    status: { type: String, required: true }
});

const billPaymentModel = mongoose.model('billpayments', billPaymentSchema);

module.exports = billPaymentModel