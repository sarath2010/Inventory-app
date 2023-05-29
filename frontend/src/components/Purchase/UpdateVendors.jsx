import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateVendors = () => {

    const [name, setName] = useState(sessionStorage.getItem('Name'));
    const [email, setEmail] = useState(sessionStorage.getItem('Email'));
    const [phone_number, setPhoneNumber] = useState(sessionStorage.getItem('PhoneNumber'));
    const [address, setAddress] = useState(sessionStorage.getItem('Address'));
    const id = sessionStorage.getItem('UpdateId');
    const [payment_terms, setPaymentTerms] = useState(sessionStorage.getItem('PaymentTerms'))
    const navigate = useNavigate();

    const updateVendors = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.put(`http://localhost:5000/vendors/${id}`, { name, email, phone_number, address ,payment_terms});
            if (response && response.data.success) {
                alert('Vendors Updated !!!');
                navigate('/vendors', { replace: true });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Update Vendors</p>

            <form>
                <label>Name</label>
                <input type="text" onChange={(e) => { setName(e.target.value) }} value={name} />

                <label>Email</label>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />

                <label>Phone Number</label>
                <input type="number" onChange={(e) => { setPhoneNumber(e.target.value) }} value={phone_number} />

                <label>Billing Address</label>
                <input type="text" onChange={(e) => { setAddress(e.target.value) }} value={address} />

                <label>Payment Terms</label>
                <input type="text" onChange={(e) => { setPaymentTerms(e.target.value) }} value={payment_terms} />

                <button onClick={(e) => { updateVendors(e) }}>Submit</button>
            </form>
        </>
    )
}

export default UpdateVendors