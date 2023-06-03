import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

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
                alert('New Details Updated !!!');
                navigate('/addcustomer', { replace: true });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>

            <Navbar />

            {/* LABEL-UPDATE CUSTOMER */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Update Customer Details</span>
                </div>
            </nav>

            {/* FORM-UPDATE CUSTOMER */}

            <div className='container-fluid bg-danger mt-1 ml-10 justify-content-center'>
                <form>
                    <label className="label mt-1 "><b>Name</b></label><br />
                    <input className="ibox w-50 " type="text" onChange={(e) => { setName(e.target.value) }} value={name} /><br />

                    <label className="label mt-1 "><b>Email</b></label><br />
                    <input className="ibox w-50 " type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} /><br />

                    <label className="label mt-1 "><b>Phone Number</b></label><br />
                    <input className="ibox w-50 " type="number" onChange={(e) => { setPhoneNumber(e.target.value) }} value={phone_number} /><br />

                    <label className="label mt-1 "><b>Billing Address</b></label><br />
                    <input className="ibox w-50 " type="text" onChange={(e) => { setBillingAddress(e.target.value) }} value={billing_address} /><br /><br />

                    <button onClick={(e) => { updateCustomer(e) }}><b>Update Customer</b></button><br /><br />
                </form>
            </div>
        </>
    )
}

export default UpdateCustomer