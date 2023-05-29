const mongoose = require('mongoose');

const packagesSchema = mongoose.Schema({
    customer_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    customer_phone_number: { type: String, required: true },
    customer_billing_address: { type: String, required: true },
    item_name: { type: String, required: true },
    quantity: { type: String, required: true },
    package_id: { type: String, required: true, unique: true },
    package_date: { type: Date, required: true },
    package_status: { type: String, required: true }
});

const packageModel = mongoose.model('packages', packagesSchema);

module.exports = packageModel;