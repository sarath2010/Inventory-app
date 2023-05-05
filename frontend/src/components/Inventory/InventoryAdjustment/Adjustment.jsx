import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Adjustment = () => {

    const [mode_of_adjustment, setModeOfAdjustment] = useState('');
    const [itemGroupId, setItemGroupId] = useState('');
    const [itemId, setItemId] = useState('');
    const [itemsGroupData, setItemsGroupData] = useState([]);
    const [itemsData, setItemsData] = useState([]);

    const [opening_stock, setOpeningStock] = useState('');
    const [selling_price, setSellingPrice] = useState('');
    const [reference_number, setReference_number] = useState('');
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');

    const getItemsGroup = async () => {
        const response = await axios.get('http://localhost:5000/items-group');
        if (response && response.data.success) {
            setItemsGroupData(response.data.success);
        }
    };

    const getItems = async (id) => {
        const response = await axios.get(`http://localhost:5000/items/${id}`);
        if (response && response.data.success) {
            setItemsData(response.data.success);
        }
    };

    const getOpeningStock = async (id) => {
        const response = await axios.get(`http://localhost:5000/items/open/${id}`);
        if (response && response.data.success) {
            setOpeningStock(response.data.success[0].opening_stock);
        }
    };

    useEffect(() => {
        getItemsGroup();
    }, [])


    return (
        <>
            <form>
                <select className="form-select w-100" value={mode_of_adjustment} onChange={(e) => { setModeOfAdjustment(e.target.value) }}>
                    <option value="" disabled={true}>Mode of Adjustment</option>
                    <option value={'Quantity'}>Quantity</option>
                    <option value={'Value'}>Value</option>
                </select>

                <select className="form-select w-100" value={itemGroupId} onChange={(e) => { setItemGroupId(e.target.value); getItems(e.target.value) }}>
                    <option value="" disabled={true}>Item Group</option>
                    {itemsGroupData.map((value, index) => {
                        return (
                            <option key={index} value={value._id}>{value.item_group_label}</option>
                        )
                    })}
                </select>

                <select className="form-select w-100" value={itemId} onChange={(e) => { setItemId(e.target.value); getOpeningStock(e.target.value) }}>
                    <option value="" disabled={true}>Item Name</option>
                    {itemsData.map((value, index) => {
                        return (
                            <option key={index} value={value._id}>{value.item_name}</option>
                        )
                    })}
                </select>

                <label>Opening Stock{opening_stock}</label>
                <input type="text" onChange={(e) => { setOpeningStock(e.target.value) }} />

                {/* <label>Selling Price {<h6>{sellingPrice}</h6>}</label>
                <input type="text" onChange={(e) => { setSellingPrice(e.target.value) }} /> */}

                <label>Reference number</label>
                <input type="text" onChange={(e) => { setReference_number(e.target.value) }} />

                <label>Reason</label>
                <input type="text" onChange={(e) => { setReason(e.target.value) }} />

                <label>Description</label>
                <input type="text" onChange={(e) => { setDescription(e.target.value) }} />

                {/* <button onClick={(e) => { makeAdjust(e) }}>Make Adjust</button> */}
            </form>
        </>
    )
}

export default Adjustment