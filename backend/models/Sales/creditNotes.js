const mongoose = require('mongoose');

const creditNotesSchema = mongoose.Schema({
    date: { type: Date, required: true },
    credit_number: { type: Number, required: true },
    order_id: { type: Number, required: true },
    customer_name: { type: String, required: true },
    item_name: { type: String, required: true },
    returned_quantity: { type: Number, required: true },
    selling_price: { type: Number, required: true },
    amount_to_return: { type: Number, required: true }
});

const creditNotesModel = mongoose.model('creditnotes', creditNotesSchema);

module.exports = creditNotesModel;