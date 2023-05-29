const express = require('express');
const itemsModel = require('../../models/Inventory/itemsModel');
const router = express.Router();
const multer = require('multer');
const uuidv4 = require('uuid')

const DIR = './images/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// const { v4: uuidv4 } = require('uuid');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../../images');
//     },
//     filename: function (req, file, cb) {
//         cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if (allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// let upload = multer({ storage, fileFilter });
// create items
router.post('/items', upload.single('photo'), async (req, res) => {

    const url = req.protocol + '://' + req.get('host')

    const reqItems = {
        item_group_id: req.body.item_group_id,
        item_name: req.body.item_name,
        unit: req.body.unit,
        dimensions: JSON.parse(req.body.dimensions),
        weight: req.body.weight,
        manufacturer: req.body.manufacturer,
        brand: req.body.brand,
        selling_price: req.body.selling_price,
        cost_price: req.body.cost_price,
        description: req.body.description,
        opening_stock: req.body.opening_stock,
        reorder_point: req.body.reorder_point,
        preferred_vendor: req.body.preferred_vendor,
        image_of_item: url + '/images/' + req.file.filename,
        created_At: req.body.created_At
    }

    const items = new itemsModel(reqItems);
    const data = await items.save();
    res.send({ success: data });
});

// retrieve items
router.get('/items', async (req, res) => {
    const data = await itemsModel.find({});
    res.send({ success: data });
});

// get items by id
router.get('/items/:id', async (req, res) => {
    const data = await itemsModel.find({ item_group_id: req.params.id });
    res.send({ success: data });
});

router.get('/filteritems/:id', async (req, res) => {
    const data = await itemsModel.find({ _id: req.params.id });
    res.send({ success: data });
});

module.exports = router;