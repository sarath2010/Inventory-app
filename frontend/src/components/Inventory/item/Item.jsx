import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

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
    const [image_of_item, setImageOfItem] = useState([]);
    const navigate = useNavigate();

    const addItems = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('photo', image_of_item);

            formData.append('item_group_id', item_group_id);
            formData.append('item_name', item_name);
            formData.append('unit', unit);
            formData.append('dimensions', JSON.stringify(dimensions));
            formData.append('weight', weight);
            formData.append('manufacturer', manufacturer);
            formData.append('brand', brand);
            formData.append('selling_price', selling_price);
            formData.append('cost_price', cost_price);
            formData.append('description', description);
            formData.append('opening_stock', opening_stock);
            formData.append('reorder_point', reorder_point);
            formData.append('preferred_vendor', preferred_vendor);
            formData.append('created_At', new Date());

            const response = await axios.post('http://localhost:5000/items', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response && response.data.success) {
                alert('Item added successfull !!!');
                navigate('/viewitems', { replace: true });
            }
        } catch (error) {
            console.error(error.message);
        }
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
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Add Items</p>

            <form encType='multipart/form-data'>
                <label>Item Group</label>
                <select className="form-select w-100" value={item_group_id} onChange={(e) => { setItemGroupId(e.target.value) }}>
                    <option value="" disabled={true}>--Select--</option>
                    {itemGroupData.map((item, index) => {
                        return (
                            <option key={index} value={item._id}>{item.item_group_label}</option>
                        )
                    })}
                </select>

                <label>item name</label>
                <input type='text' onChange={(e) => { setItemName(e.target.value) }}></input>

                <label>unit</label>
                <input type='text' onChange={(e) => { setUnit(e.target.value) }}></input>

                <label>Dimensions</label>
                <input type='text' onChange={(e) => { setDimensions({ length: e.target.value, width: dimensions.width, height: dimensions.height }) }} placeholder='Length'></input>
                <input type='text' onChange={(e) => { setDimensions({ length: dimensions.length, width: e.target.value, height: dimensions.height }) }} placeholder='Width'></input>
                <input type='text' onChange={(e) => { setDimensions({ length: dimensions.length, width: dimensions.width, height: e.target.value }) }} placeholder='Height'></input>

                <label>weight</label>
                <input type='number' onChange={(e) => { setWeight(e.target.value) }}></input>

                <label>manufacturer</label>
                <input type='text' onChange={(e) => { setManufacturer(e.target.value) }}></input>

                <label>brand</label>
                <input type='text' onChange={(e) => { setBrand(e.target.value) }}></input>

                <label>selling price</label>
                <input type='number' onChange={(e) => { setSellingPrice(e.target.value) }}></input>

                <label>cost price</label>
                <input type='number' onChange={(e) => { setCostPrice(e.target.value) }}></input>

                <label>description</label>
                <input type='text' onChange={(e) => { setDescription(e.target.value) }}></input>

                <label>opening stock</label>
                <input type='number' onChange={(e) => { setopening_stock(e.target.value) }}></input>

                <label>reorder_point</label>
                <input type='number' onChange={(e) => { setReorderPoint(e.target.value) }}></input>

                <label>preferred vendor</label>
                <input type='text' onChange={(e) => { setPreferredVendor(e.target.value) }}></input>

                <label>image of item</label>
                <input type="file" name='photo' onChange={(e) => { setImageOfItem(e.target.files[0]) }} />

                <button onClick={(e) => { addItems(e) }}>Submit</button>
            </form>
        </>
    )
}

export default Item