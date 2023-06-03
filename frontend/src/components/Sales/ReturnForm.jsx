import axios from 'axios';
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const ReturnForm = () => {

    const order_id = sessionStorage.getItem('OrderId');
    const item_id = sessionStorage.getItem('ItemId');
    const customer_name = sessionStorage.getItem('CustomerName');
    const item_name = sessionStorage.getItem('ItemName');
    const quantity = sessionStorage.getItem('Quantity');
    const selling_price = sessionStorage.getItem('SellingPrice');
    const [returned_quantity, setReturnedQuantity] = useState('');
    const [returned_date, setReturnedDate] = useState('');
    const [reason, setReason] = useState('');
    const navigate = useNavigate();

    const returnItems = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/salesreturn', {
            order_id,
            customer_name,
            item_id,
            item_name,
            ordered_quantity: quantity,
            returned_quantity,
            returned_date,
            reason,
            selling_price,
            status: 'Checking',
            sales_order_status: 'Return in Process'
        });
        if (response && response.data.success) {
            alert('Items added for Checking')
            navigate('/viewreturn', { replace: true })
        }
    };

    return (
        <>
            <Navbar />

            {/* LABEL-ENTRY SALES RETURNS */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Sales Returns Entry</span>
                </div>
            </nav>

            <div className='container bg-danger ml-10 mt-1'>
            <form className="form needs-validation">
                <label className="label mt-1 "><b>Order Id</b></label>
                <input className='form-control w-50 text-dark' disabled defaultValue={order_id} />

                <label className="label mt-1 "><b>Customer Name</b></label>
                <input className='form-control w-50 text-dark' disabled defaultValue={customer_name} />

                <label className="label mt-1 "><b>Item Name</b></label>
                <input className='form-control w-50 text-dark' disabled defaultValue={item_name} />

                <label className="label mt-1 "><b>Quantity</b></label>
                <input className='form-control w-50 text-dark' disabled defaultValue={quantity} />

                <label className="label mt-1 "><b>Returned Quantity</b></label>
                <input className='form-control w-50' type="number" value={returned_quantity} onChange={(e) => { setReturnedQuantity(e.target.value) }} />

                <label className="label mt-1 "><b>Reason</b></label>
                <input className='form-control w-50' type="text" value={reason} onChange={(e) => { setReason(e.target.value) }} />

                <label className="label mt-1 "><b>Returned Date</b></label>
                <input className='form-control w-50' type="date" value={returned_date} onChange={(e) => { setReturnedDate(e.target.value) }} /><br/>

                <button class="btn btn-dark" onClick={(e) => { returnItems(e) }}>Submit</button>
            </form>
            <br/><br/>
            </div>
        </>
    )
}

export default ReturnForm