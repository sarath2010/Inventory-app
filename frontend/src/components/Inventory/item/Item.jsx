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
                // alert('New Item Added Successfully');
                alert(<div class="alert alert-primary" role="alert">
                    New Item Added Successfully
                </div>)
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

            {/* LABEL-ADD ITEMS */}
            <nav class="navbar navbar-light  bg-primary">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Add Item</span>
                </div>
            </nav>

            {/* FORM-ADD ITEMS */}

            <div className='container bg-primary ml-10'>
                <form className="form mt-1 needs-validation" encType='multipart/form-data'>
                    <div class="form-group ">
                        <label className="label mt-1" ><b>Item Group</b></label>
                        <select className="form-select form-select-sm w-50 mt-1" value={item_group_id} onChange={(e) => { setItemGroupId(e.target.value) }}>
                            <option value="" disabled={true}>--Choose one--</option>
                            {itemGroupData.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>{item.item_group_label}</option>
                                )
                            })}
                        </select>

                        <label className="label mt-1 "><b>Name of Item</b></label><br />
                        <input className="ibox w-50 " type='text' required onChange={(e) => { setItemName(e.target.value) }}></input><br />

                        <label className="label mt-1 "><b>Unit of measure</b></label><br />
                        <input className="ibox w-50" type='text' onChange={(e) => { setUnit(e.target.value) }}></input><br />

                        <label className="label mt-1 "><b>Dimensions(in CM)</b></label><br />


                        <input className="ibox" type='number' onChange={(e) => { setDimensions({ length: e.target.value, width: dimensions.width, height: dimensions.height }) }} placeholder='Length'></input>
                        <input className="ibox" type='number' onChange={(e) => { setDimensions({ length: dimensions.length, width: e.target.value, height: dimensions.height }) }} placeholder='Width'></input>
                        <input className="ibox" type='number' onChange={(e) => { setDimensions({ length: dimensions.length, width: dimensions.width, height: e.target.value }) }} placeholder='Height'></input><br />


                        <label className="label mt-1 "><b>Weight (in Kg)</b></label><br />
                        <input className="ibox w-50" type='number' onChange={(e) => { setWeight(e.target.value) }}></input><br />

                        <label className="label mt-1 "><b>Manufacturer</b></label><br />
                        <input className="ibox w-50" type='text' onChange={(e) => { setManufacturer(e.target.value) }}></input><br />

                        <label className="label mt-1 "><b>Brand</b></label><br />
                        <input className="ibox w-50" type='text' onChange={(e) => { setBrand(e.target.value) }}></input><br />

                        <label className="label mt-1"><b>Selling Price (INR)</b></label><br />
                        <input className="ibox w-50" type='number' onChange={(e) => { setSellingPrice(e.target.value) }}></input><br />

                        <label className="label mt-1"><b>Cost Price (INR)</b></label><br />
                        <input className="ibox w-50" type='number' onChange={(e) => { setCostPrice(e.target.value) }}></input><br />

                        <label className="label mt-1"><b>Description</b></label><br />
                        <input className="ibox w-50" type='text' onChange={(e) => { setDescription(e.target.value) }}></input><br />

                        <label className="label mt-1"><b>Opening Stock(Quantity)</b></label><br />
                        <input className="ibox w-50" type='number' onChange={(e) => { setopening_stock(e.target.value) }}></input><br />

                        <label className="label mt-1"><b>Re-order Point(Quantity)</b></label><br />
                        <input className="ibox w-50" type='number' onChange={(e) => { setReorderPoint(e.target.value) }}></input><br />

                        <label className="label mt-1"><b>Preferred Vendor</b></label><br />
                        <input className="ibox w-50" type='text' onChange={(e) => { setPreferredVendor(e.target.value) }}></input><br />

                        <label className="label mt-1"><b>Item Image(upload)</b></label><br />
                        <input className="ibox w-50 mt-2" type="file" name='photo' onChange={(e) => { setImageOfItem(e.target.files[0]) }} /><br /><br />

                        <button className="button bg-secondary form-control-sm" onClick={(e) => { addItems(e) }}><b>Submit</b></button><br /><br /><br />
                    </div>

                </form>
            </div>






        </>
    )
}

export default Item