const mongoose = require('mongoose');

const vendoreCreditSchema = mongoose.Schema({
    purchaseId: { type: Number, required: true },
    item_group: { type: String, required: true },
    item: { type: String, required: true },
    order_quantity: { type: Number, required: true },
    order_date: { type: String, required: true },
    vendors_name: { type: String, required: true },
    vendors_email: { type: String, required: true },
    vendors_phone_number: { type: Number, required: true },
    payment_terms: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    credit_number: { type: Number, required: true },
    credit_date: { type: Date, required: true }
});

const vendorsCreditModel = mongoose.model('vendorcredits', vendoreCreditSchema);

module.exports = vendorsCreditModel;