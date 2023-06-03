import axios from 'axios';
import React, { useState } from 'react'
import ViewCustomer from './ViewCustomer';
import Navbar from '../Navbar/Navbar';

const AddCustomers = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [billing_address, setBillingAddress] = useState('');
    const [reload, setReload] = useState(false);

    const addCustomer = async (e) => {
        try {
            e.preventDefault();
            setReload(false);
            const response = await axios.post('http://localhost:5000/customer', { name, email, phone_number, billing_address });
            if (response && response.data.success) {
                alert('Customer Created !!!');
                setReload(true);
                setName('');
                setEmail('');
                setPhoneNumber('');
                setBillingAddress('');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Navbar />

            {/* LABEL-ADD Customer */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Add Customers</span>
                </div>
            </nav>

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

                    <button onClick={(e) => { addCustomer(e) }}><b>Submit</b></button> <br /><br />
                </form>

                </div>
                <p className='text-center text-danger mt-4' style={{ fontSize: '21px' }}>Customers List</p>
                <ViewCustomer reload={reload} />

            
        </>
    )
}

export default AddCustomers