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
            const response = await axios.put(`http://localhost:5000/vendors/${id}`, { name, email, phone_number, address, payment_terms });
            if (response && response.data.success) {
                alert('Vendor details updated.');
                navigate('/vendors', { replace: true });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Navbar />

            {/* LABEL-UPDATE VENDORS */}
            <nav class="navbar navbar-light  bg-success">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Update Vendors</span>
                </div>
            </nav>

            <div className='container bg-success ml-10 mt-1 align-content-end'>
                <form>
                    <label className="label mt-1 "><b>Name</b></label>
                    <input className='form-control w-50' type="text" onChange={(e) => { setName(e.target.value) }} value={name} />

                    <label className="label mt-1 "><b>Email</b></label>
                    <input className='form-control w-50' type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />

                    <label className="label mt-1 "><b>Phone Number</b></label>
                    <input className='form-control w-50' type="number" onChange={(e) => { setPhoneNumber(e.target.value) }} value={phone_number} />

                    <label className="label mt-1 "><b>Billing Address</b></label>
                    <input className='form-control w-50' type="text" onChange={(e) => { setAddress(e.target.value) }} value={address} />

                    <label className="label mt-1 "><b>Payment Terms</b></label>
                    <input className='form-control w-50' type="number" onChange={(e) => { setPaymentTerms(e.target.value) }} value={payment_terms} /><br/>

                    <button class="btn btn-info" onClick={(e) => { updateVendors(e) }}>Update</button>
                </form>
                <br/>
                </div>
            </>
            )
}

            export default UpdateVendors