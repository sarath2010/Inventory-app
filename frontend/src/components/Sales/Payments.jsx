import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payments = () => {

    const [customerData, setcustomerData] = useState([]);
    const [payment_mode, setPaymentMode] = useState([]);

    const [customer_id, setCustomerId] = useState('');
    const [customer_name, setCustomerName] = useState('');
    const [customer_email, setCustomerEmail] = useState('');
    const [customer_address, setCustomerAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [received_date, setReceivedDate] = useState(new Date());
    const navigate = useNavigate();

    const handleCustomerChange = (e) => {
        const selectedCustomer = customerData.find(customer => customer._id === e.target.value);
        setCustomerName(selectedCustomer.name);
        setCustomerId(selectedCustomer._id);
        setCustomerEmail(selectedCustomer.email);
        setCustomerAddress(selectedCustomer.billing_address);
    };

    const makePayments = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/payments', {
            customer_id,
            customer_name,
            customer_email,
            customer_address,
            payment_mode,
            amount,
            received_date
        });
        if (response && response.data.success) {
            alert('Payment successfully added.');
            setCustomerId('');
            setCustomerName('');
            setCustomerEmail('');
            setCustomerAddress('');
            setPaymentMode('');
            setAmount('');
            setReceivedDate(new Date());
            navigate('/viewpayments', { replace: true })
        }
    };

    const viewPayment = async () => {
        navigate('/viewpayments', { replace: true });
    }

    useEffect(() => {
        const getCustomer = async () => {
            const response = await axios.get('http://localhost:5000/customer');
            if (response && response.data.success) {
                setcustomerData(response.data.success);
            }
        }
        getCustomer();
    }, [])

    return (
        <>
            <Navbar />

            {/* LABEL-PAYMENTS */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Payments Received</span>
                </div>
            </nav>

            {/* BUTTON TOP */}

            <div className='container bg-danger mt-1 ml-10 align-content-end'>
                <div class="d-flex justify-content-end">
                    <button className="button bg-light text-danger form-control-sm mt-2 mb-2 " onClick={viewPayment}><b>Payments Received List</b></button>
                </div>
            </div>

            <div className='container bg-danger ml-10'>
                <form className="form needs-validation">
                    <label className="label mt-1 "><b>Choose Customer</b></label>
                    <select className="form-select form-select-sm w-50 mt-1" value={customer_id} onChange={handleCustomerChange}>
                        <option value="" disabled={true}>--Select Customer--</option>
                        {customerData.map((item, index) => {
                            return (
                                <option key={index} value={item._id}>{item.name}</option>
                            )
                        })}
                    </select>

                    <label className="label mt-1 "><b>Customer Name</b></label>
                    <input className='form-control w-50' disabled={true} defaultValue={customer_name} />

                    <label className="label mt-1 "><b>Customer Email</b></label>
                    <input className='form-control w-50' disabled={true} defaultValue={customer_email} />

                    <label className="label mt-1 "><b>Customer Address</b></label>
                    <input className='form-control w-50' disabled={true} defaultValue={customer_address} />

                    <label className="label mt-1 "><b>Mode of Payment</b></label>
                    <select className="form-select form-select-sm w-50 mt-1" value={payment_mode} onChange={(e) => { setPaymentMode(e.target.value) }}>
                        <option value="" disabled={true}>--Payment Mode--</option>
                        <option value="Cash">Cash</option>
                        <option value="Online">Online</option>
                    </select>

                    <label className="label mt-1 "><b>Amount</b></label>
                    <input className='form-control w-50' type='number' value={amount} onChange={(e) => { setAmount(e.target.value) }} />

                    <label className="label mt-1 "><b>Received Date</b></label>
                    <input className='form-control w-50' type='date' value={received_date} onChange={(e) => { setReceivedDate(e.target.value) }} />
                    <br />
                    <button className="button bg-light text-dark form-control-sm mt-2 mb-2 " onClick={(e) => { makePayments(e) }}><b>Submit</b></button>
                </form >
                <br />
                <br />
                <br />
            </div>
        </>
    )
}

export default Payments