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
            alert('Payment Added Successfully !!!');
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

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Received Payments</p>

            <button onClick={viewPayment}>Payments List</button>
            <form>
                <label>Choose Customer</label>
                <select className="form-select" value={customer_id} onChange={handleCustomerChange}>
                    <option value="" disabled={true}>Select Customer</option>
                    {customerData.map((item, index) => {
                        return (
                            <option key={index} value={item._id}>{item.name}</option>
                        )
                    })}
                </select>

                <label>Customer Name</label>
                <input className='form-control' disabled={true} defaultValue={customer_name} />

                <label>Customer Email</label>
                <input className='form-control' disabled={true} defaultValue={customer_email} />

                <label>Customer Address</label>
                <input className='form-control' disabled={true} defaultValue={customer_address} />

                <label>Mode of Payment</label>
                <select className="form-select" value={payment_mode} onChange={(e) => { setPaymentMode(e.target.value) }}>
                    <option value="" disabled={true}>Select Payment</option>
                    <option value="Cash">Cash</option>
                    <option value="Online">Online</option>
                </select>

                <label>Amount</label>
                <input className='form-control' type='number' value={amount} onChange={(e) => { setAmount(e.target.value) }} />

                <label>Received Date</label>
                <input className='form-control' type='date' value={received_date} onChange={(e) => { setReceivedDate(e.target.value) }} />

                <button onClick={(e) => { makePayments(e) }}>Submit</button>
            </form>
        </>
    )
}

export default Payments