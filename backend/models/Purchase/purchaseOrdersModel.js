const mongoose = require('mongoose');

const purchaseOrderSchema = mongoose.Schema({
    item_group: { type: String, required: true },
    item: { type: String, required: true },
    order_quantity: { type: Number, required: true },
    date: { type: Date, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true },
    purchase_order_id: { type: Number, required: true },
    vendors_name: { type: String, required: true },
    vendors_email: { type: String, required: true },
    vendors_phone_number: { type: Number, required: true },
    payment_terms: { type: Number, required: true },
    item_id: { type: mongoose.SchemaTypes.ObjectId, required: true }
});

const purchaseOrderModel = mongoose.model('purchaseorders', purchaseOrderSchema);

module.exports = purchaseOrderModel;