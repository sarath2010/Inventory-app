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

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Create Returns</p>

            <form>
                <label>Order Id</label>
                <input disabled defaultValue={order_id} />

                <label>Customer Name</label>
                <input disabled defaultValue={customer_name} />

                <label>Item Name</label>
                <input disabled defaultValue={item_name} />

                <label>Quantity</label>
                <input disabled defaultValue={quantity} />

                <label>Returned Quantity</label>
                <input type="number" value={returned_quantity} onChange={(e) => { setReturnedQuantity(e.target.value) }} />

                <label>Reason</label>
                <input type="text" value={reason} onChange={(e) => { setReason(e.target.value) }} />

                <label>Returned Date</label>
                <input type="date" value={returned_date} onChange={(e) => { setReturnedDate(e.target.value) }} />

                <button onClick={(e) => { returnItems(e) }}>Submit</button>
            </form>
        </>
    )
}

export default ReturnForm