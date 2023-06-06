import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate();

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
            alert('Bill Successfully Added');
            navigate('/billandpayments', { replace: true })
        }
    }

    return (
        <>
            <Navbar />

            {/* LABEL-VENDOR' BILLS ENTRY */}
            <nav class="navbar navbar-light  bg-success">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Vendor Bills Entry</span>
                </div>
            </nav>


            <div className='container bg-success ml-10 mt-1 align-content-end'>
            <form>
                <label className="label mt-1 "><b>Item Group</b></label>
                <input className='form-control w-50' defaultValue={item_group} disabled={true} />

                <label className="label mt-1 "><b>Item</b></label>
                <input className='form-control w-50' defaultValue={item} disabled={true} />

                <label className="label mt-1 "><b>Order Quantity</b></label>
                <input className='form-control w-50' defaultValue={order_quantity} disabled={true} />

                <label className="label mt-1 "><b>Purchase Date</b></label>
                <input className='form-control w-50' defaultValue={order_Date} disabled={true} />

                <label className="label mt-1 "><b>Vendors Name</b></label>
                <input className='form-control w-50' defaultValue={vendors_name} disabled={true} />

                <label className="label mt-1 "><b>Vendors Email</b></label>
                <input className='form-control w-50' defaultValue={vendors_email} disabled={true} />

                <label className="label mt-1 "><b>Vendors Phone Number</b></label>
                <input className='form-control w-50' defaultValue={vendors_phone_number} disabled={true} />

                <label className="label mt-1 "><b>Vendors Payment Terms</b></label>
                <input className='form-control w-50' defaultValue={payment_terms} disabled={true} />

                <label className="label mt-1 "><b>Amount</b></label>
                <input className='form-control w-50' defaultValue={amount} disabled={true} />

                <label className="label mt-1 "><b>Vendor Bill Reference</b></label>
                <input className='form-control w-50' type='number' onChange={(e) => { setBillReference(e.target.value) }} /><br/>

                <button class="btn btn-info" onClick={(e) => { addToBill(e) }}>Submit</button>
                <br/><br/><br/>
            </form>
            </div>
        </>
    )
}

export default BillPayments