const mongoose = require('mongoose');

const vendorsSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    payment_terms: { type: Number, required: true }
});

const vendorsModel = mongoose.model('vendors', vendorsSchema);

module.exports = vendorsModel;