import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Item = () => {

    const [item_group_id, setItemGroupId] = useState('');
    const [itemGroupData, setItemGroupData] = useState([]);
    const [item_name, setItemName] = useState('');
    const [unit, setUnit] = useState('');
    const [dimensions, setDimensions] = useState({
        length: '',
        width: '',
        height: ''
    });
    const [weight, setWeight] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [brand, setBrand] = useState('');
    const [selling_price, setSellingPrice] = useState('');
    const [cost_price, setCostPrice] = useState('');
    const [description, setDescription] = useState('');
    const [opening_stock, setopening_stock] = useState('');
    const [reorder_point, setReorderPoint] = useState('');
    const [preferred_vendor, setPreferredVendor] = useState('');
    const [image_of_item, setImageOfItem] = useState('');
    const navigate = useNavigate();

    const addItems = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/items', {
                item_group_id,
                item_name,
                unit,
                dimensions,
                weight,
                manufacturer,
                brand,
                selling_price,
                cost_price,
                description,
                opening_stock,
                reorder_point,
                preferred_vendor,
                image_of_item
            });
            if (response && response.data.success) {
                alert('Item added successfully.');
                navigate('/viewitems', { replace: true });
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const home = (e) => {
        e.preventDefault();
        navigate('/', { replace: true })
    };

    useEffect(() => {
        const getItemsGroup = async () => {
            const response = await axios.get('http://localhost:5000/items-group');
            if (response && response.data.success) {
                setItemGroupData(response.data.success);
            }
        }
        getItemsGroup();
    }, []);


    return (
        <>
            <button onClick={(e) => { home(e) }}>Home</button>
            <form onSubmit={addItems}>
                <select className="form-select w-100" value={item_group_id} onChange={(e) => { setItemGroupId(e.target.value) }}>
                    <option value="" disabled={true}><b>Item Group (Select one)</b></option>
                    {itemGroupData.map((item, index) => {
                        return (
                            <option key={index} value={item._id}>{item.item_group_label}</option>
                        )
                    })}
                </select>

                <label><b>Item Name</b></label><br/>
                <input type='text' onChange={(e) => { setItemName(e.target.value) }}></input><br/>

                <label><b>Unit</b></label><br/>
                <input type='text' onChange={(e) => { setUnit(e.target.value) }}></input><br/>

                <label><b>Dimensions</b></label><br/>
                <input type='text' placeholder='Length' onChange={(e) => { setDimensions({ length: e.target.value, width: dimensions.width, height: dimensions.height }) }}></input>
                <input type='text' placeholder='Breadth' onChange={(e) => { setDimensions({ length: dimensions.length, width: e.target.value, height: dimensions.height }) }}></input>
                <input type='text' placeholder='Height' onChange={(e) => { setDimensions({ length: dimensions.length, width: dimensions.width, height: e.target.value }) }}></input><br/>

                <label><b>Weight</b></label><br/>
                <input type='number' onChange={(e) => { setWeight(e.target.value) }}></input><br/>

                <label><b>Manufacturer</b></label><br/>
                <input type='text' onChange={(e) => { setManufacturer(e.target.value) }}></input><br/>

                <label><b>Brand</b></label><br/>
                <input type='text' onChange={(e) => { setBrand(e.target.value) }}></input><br/>

                <label><b>Selling price</b></label><br/>
                <input type='number' onChange={(e) => { setSellingPrice(e.target.value) }}></input><br/>

                <label><b>Cost price</b></label><br/>
                <input type='number' onChange={(e) => { setCostPrice(e.target.value) }}></input><br/>

                <label><b>Description</b></label><br/>
                <input type='text' onChange={(e) => { setDescription(e.target.value) }}></input><br/>

                <label><b>Opening stock</b></label><br/>
                <input type='number' onChange={(e) => { setopening_stock(e.target.value) }}></input><br/>

                <label><b>Reorder-quantity</b></label><br/>
                <input type='number' onChange={(e) => { setReorderPoint(e.target.value) }}></input><br/>

                <label><b>Preferred vendor</b></label><br/>
                <input type='text' onChange={(e) => { setPreferredVendor(e.target.value) }}></input><br/>

                <label><b>Image of item</b></label><br/>
                <input type="file" onChange={(e) => { setImageOfItem(e.target.value) }} /><br/><br/>
                <button type='submit' >Add Item</button>
            </form>
        </>
    )
}

export default Item