const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    customer_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    customer_phone_number: { type: String, required: true },
    customer_billing_address: { type: String, required: true },
    item_name: { type: String, required: true },
    quantity: { type: String, required: true },
    total_price: { type: Number, required: true },
    invoice_id: { type: String, required: true, unique: true },
    invoice_date: { type: Date, required: true },
    invoice_status: { type: String, required: true }
});

const invoiceModel = mongoose.model('invoices', invoiceSchema);

module.exports = invoiceModel;