import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UpdateCustomer = () => {

    const [name, setName] = useState(sessionStorage.getItem('Name'));
    const [email, setEmail] = useState(sessionStorage.getItem('Email'));
    const [phone_number, setPhoneNumber] = useState(sessionStorage.getItem('PhoneNumber'));
    const [billing_address, setBillingAddress] = useState(sessionStorage.getItem('BillingAddress'));
    const id = sessionStorage.getItem('UpdateId');
    const navigate = useNavigate();

    const updateCustomer = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.put(`http://localhost:5000/customer/${id}`, { name, email, phone_number, billing_address });
            if (response && response.data.success) {
                alert('Customer Updated !!!');
                navigate('/addcustomer', { replace: true });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <form>
                <label>Name</label>
                <input type="text" onChange={(e) => { setName(e.target.value) }} value={name} />

                <label>Email</label>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />

                <label>Phone Number</label>
                <input type="number" onChange={(e) => { setPhoneNumber(e.target.value) }} value={phone_number} />

                <label>Billing Address</label>
                <input type="text" onChange={(e) => { setBillingAddress(e.target.value) }} value={billing_address} />

                <button onClick={(e) => { updateCustomer(e) }}>Submit</button>
            </form>
        </>
    )
}

export default UpdateCustomer