import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

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
                alert('Adjusted Successfully!');
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
        navigate('/inventory-items', { replace: true })
    }

    return (
        <>

            <Navbar />

            {/* LABEL-ADD ITEMS */}
            <nav class="navbar navbar-light  bg-primary">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Inventory Adjustments Entry</span>
                </div>
            </nav>

            <div className='container  ml-10 mt-10'>

                {/* <label className="label mt-1 text-primary"><b>Present Stock : </b>{<h4>{}</h4>}</label><br/> */}
                <form>
                    <label className="label mt-1"><b>Mode of adjustment</b></label>
                    <select className="form-select form-select-sm w-50 mt-1" value={mode_of_adjustment} onChange={(e) => { setModeOfAdjustment(e.target.value) }}>
                        <option value="" disabled={true}>--Select--</option>
                        <option value={'Quantity'}>Quantity</option>
                        <option value={'Value'}>Selling Price</option>
                    </select>

                    {mode_of_adjustment === "Quantity" && (
                        <>
                            <label className="label mt-1 text-primary"><b>Present Stock : </b>{<h4>{openingStock}</h4>}</label><br />

                            <label className="label mt-1"><b>New Quantity:</b></label><br />
                            <input className="ibox w-50 " type="number" placeholder='Enter new quantity' onChange={(e) => { setQuantity(e.target.value) }} value={quantity} /> <br />
                        </>
                    )}



                    {mode_of_adjustment === "Value" && (
                        <>
                            <label className="label mt-1 text-primary"><b>Present Selling Price : </b>{<h4>{sellingPrice}</h4>}</label><br />

                            <label className="label mt-1"><b>New Selling Price:</b></label><br />
                            <input className="ibox w-50 " type="number" placeholder='Enter new price' onChange={(e) => { setValue(e.target.value) }} value={value} /><br />
                        </>
                    )}

                    <label className="label mt-1"><b>Reference number</b></label><br />
                    <input className="ibox w-50 " type="text" onChange={(e) => { setReference_number(e.target.value) }} /><br />

                    <label className="label mt-1"><b>Reason</b></label><br />
                    <input className="ibox w-50 " type="text" onChange={(e) => { setReason(e.target.value) }} /> <br />

                    <label className="label mt-1"><b>Description</b></label><br />
                    <input className="ibox w-50 " type="text" onChange={(e) => { setDescription(e.target.value) }} /><br /><br />

                    <button className="button bg-secondary text-white w-50 form-control-md" onClick={(e) => { makeAdjust(e) }}>Apply</button><br /><br /><br />
                </form>
            </div>
        </>
    )
}

export default AdjustForm