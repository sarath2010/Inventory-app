import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import moment from 'moment';

const BillPayments = () => {

    const [item_group, setItemGroup] = useState(sessionStorage.getItem('ItemGroup'));
    const [item, setitem] = useState(sessionStorage.getItem('Item'));
    const [order_quantity, setOrderQuantity] = useState(sessionStorage.getItem('OrderQuantity'));
    const [date, setDate] = useState(sessionStorage.getItem('Date'));
    const order_Date = moment(date).format('DD-MM-YYYY');
    const [vendors_name, setVendorsName] = useState(sessionStorage.getItem('VendorsName'));
    const [vendors_email, setVendorsEmail] = useState(sessionStorage.getItem('VendorsEmail'));
    const [vendors_phone_number, setVendorsPhoneNumber] = useState(sessionStorage.getItem('VendorsPhoneNumber'));
    const [payment_terms, setPaymentTerms] = useState(sessionStorage.getItem('PaymentTerms'))
    const [amount, setAmount] = useState(sessionStorage.getItem('Amount'));
    const [bill_reference, setBillReference] = useState('');
    const purchaseId = sessionStorage.getItem('PurchaseIdNew');
    const item_id = sessionStorage.getItem('ItemId');

    const addToBill = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/billpayments', {
            billing_date: new Date(),
            item_group,
            item,
            order_quantity,
            order_date: date,
            vendors_name,
            vendors_email,
            vendors_phone_number,
            payment_terms,
            amount,
            bill_reference,
            purchaseId: purchaseId,
            status: "Bills Received",
            item_id
        });
        if (response && response.data.success) {
            alert('Bill Added Successfully!!!');
        }
    }

    return (
        <>
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Bill Payments</p>

            <form>
                <label>Item Group</label>
                <input defaultValue={item_group} disabled={true} />

                <label>Item</label>
                <input defaultValue={item} disabled={true} />

                <label>Order Quantity</label>
                <input defaultValue={order_quantity} disabled={true} />

                <label>Purchase Date</label>
                <input defaultValue={order_Date} disabled={true} />

                <label>Vendors Name</label>
                <input defaultValue={vendors_name} disabled={true} />

                <label>Vendors Email</label>
                <input defaultValue={vendors_email} disabled={true} />

                <label>Vendors Phone Number</label>
                <input defaultValue={vendors_phone_number} disabled={true} />

                <label>Vendors Payment Terms</label>
                <input defaultValue={payment_terms} disabled={true} />

                <label>Amount</label>
                <input defaultValue={amount} disabled={true} />

                <label>Vendor Bill Reference</label>
                <input type='number' onChange={(e) => { setBillReference(e.target.value) }} />

                <button onClick={(e) => { addToBill(e) }}>Submit</button>
            </form>
        </>
    )
}

export default BillPayments