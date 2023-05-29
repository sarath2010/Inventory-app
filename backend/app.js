const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static('images'));

// items route
const items = require('./routes/Inventory/itemsRoutes');
// inventory routes
const inventoryAdjustment = require('./routes/Inventory/inventoryAdjustmentsRoute');
// item groups route
const itemGroups = require('./routes/Inventory/itemGroupRoutes');
// customers route
const customers = require('./routes/Sales/customersRoute');
// sales order routes
const salesOrder = require('./routes/Sales/salesOrderRoutes');
// packages route
const packages = require('./routes/Sales/packagesRoute');
// shipment route
const shipment = require('./routes/Sales/shipmentRoutes');
// delivery route
const delivery = require('./routes/Sales/deliveryRoutes')
// invoice route
const invoice = require('./routes/Sales/invoiceRoutes');
// payments route
const payments = require('./routes/Sales/paymentsRoutes');
// sales return routes
const salesReturn = require('./routes/Sales/salesReturn');
// returned items route
const returnedItems = require('./routes/Sales/returnedItemsRoute');
// credit notes route
const creditNotes = require('./routes/Sales/creditNotesRoute');
// purchase routes
const purchaseRoutes = require('./routes/Purchase/purchaseRoutes');
// purchase orders route
const purchaseOrdersRoute = require('./routes/Purchase/purchaseOrdersRoute');
// bill payments route
const billPayments = require('./routes/Purchase/BillPaymentRoutes');
// vendors credit routes
const vendorcredits = require('./routes/Purchase/vendorsCreditsRoute');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(items);
app.use(inventoryAdjustment);
app.use(itemGroups);
app.use(customers);
app.use(salesOrder);
app.use(packages);
app.use(shipment);
app.use(delivery);
app.use(invoice);
app.use(payments);
app.use(salesReturn);
app.use(returnedItems);
app.use(creditNotes);
app.use(purchaseRoutes);
app.use(purchaseOrdersRoute);
app.use(billPayments);
app.use(vendorcredits);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on the port ${process.env.PORT}`);
})