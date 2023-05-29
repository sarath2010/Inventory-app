import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdjustForm = () => {

    const AdjustId = sessionStorage.getItem('Adjustid');
    const openingStock = sessionStorage.getItem('Openingstock');
    const sellingPrice = sessionStorage.getItem('Sellingprice');
    const itemName = sessionStorage.getItem('Itemname');

    const [quantity, setQuantity] = useState('');
    const [value, setValue] = useState('');
    const [mode_of_adjustment, setModeOfAdjustment] = useState('');
    const [reference_number, setReference_number] = useState('');
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const makeAdjust = async (e) => {
        try {
            e.preventDefault();
        const response = await axios.put(`http://localhost:5000/adjust-items/${AdjustId}`, {
            item_id: AdjustId,
            item_name: itemName,
            mode_of_adjustment,
            reference_number,
            date: new Date(),
            reason,
            description,
            quantity,
            value
        });
        if (response && response.data.success) {
            alert('Adjusted Successfull !!!');
            setQuantity('');
            setValue('');
            navigate('/adjustment-reports', { replace: true })
        }
        } catch (error) {
            console.error(error.message);
        }
    };

    const home = (e) => {
        e.preventDefault();
        navigate('/', { replace: true })
    }

    const InventoryItems = (e) => {
        e.preventDefault();
        navigate('/inventory-items',{replace:true})
    }

    return (
        <>

            <button onClick={(e) => { home(e) }}>Home</button>
            <button onClick={(e)=>{InventoryItems(e)}}>Back</button>
            <form>
                <label>Mode of adjustment</label>
                <select className="form-select w-100" value={mode_of_adjustment} onChange={(e) => { setModeOfAdjustment(e.target.value) }}>
                    <option value="" disabled={true}>--Select--</option>
                    <option value={'Quantity'}>Quantity</option>
                    <option value={'Value'}>Value</option>
                </select>

                {mode_of_adjustment === "Quantity" && (
                    <>
                        <label>Opening Stock {<h6>{openingStock}</h6>}</label>
                        <br />
                        <label>New Quantity</label>
                        <br />
                        <input type="text" onChange={(e) => { setQuantity(e.target.value) }} value={quantity} placeholder='Quantity'/>
                    </>
                )}

                {mode_of_adjustment === "Value" && (
                    <>
                        <label>Selling Price {<h6>{sellingPrice}</h6>}</label>
                        <br />
                        <label>New Price</label>
                        <br />
                        <input type="text" onChange={(e) => { setValue(e.target.value) }} value={value} placeholder='Price'/>
                    </>
                )}

                <label>reference number</label>
                <input type="text" onChange={(e) => { setReference_number(e.target.value) }} />

                <label>reason</label>
                <input type="text" onChange={(e) => { setReason(e.target.value) }} />

                <label>description</label>
                <input type="text" onChange={(e) => { setDescription(e.target.value) }} />

                <button onClick={(e) => { makeAdjust(e) }}>Apply Changes</button>
            </form>
        </>
    )
}

export default AdjustForm