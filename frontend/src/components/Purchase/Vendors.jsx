import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import ViewVendors from './ViewVendors';

const Vendors = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [payment_terms, setPaymentTerms] = useState('');
    const [reload, setReload] = useState(false);

    const addVendors = async (e) => {
        try {
            e.preventDefault();
            setReload(false);
            const response = await axios.post('http://localhost:5000/vendors', { name, email, phone_number, address, payment_terms });
            if (response && response.data.success) {
                alert('Vendors Created !!!');
                setReload(true);
                setName('');
                setEmail('');
                setPhoneNumber('');
                setAddress('');
                setPaymentTerms('');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Navbar />

            {/* LABEL-VENDORS */}
            <nav class="navbar navbar-light  bg-success">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Vendors</span>
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

                    <label className="label mt-1 "><b>Address</b></label>
                    <input className='form-control w-50' type="text" onChange={(e) => { setAddress(e.target.value) }} value={address} />

                    <label className="label mt-1 "><b>Payment Terms(calendar days)</b></label>
                    <input className='form-control w-50' type="number" onChange={(e) => { setPaymentTerms(e.target.value) }} value={payment_terms} /><br />

                    <button class="btn btn-info" onClick={(e) => { addVendors(e) }}>Submit</button>
                </form>
                <br />
            </div>

            <div className='container bg-success ml-10 text-white'>
                <ViewVendors reload={reload} />
                <br />
            </div>

        </>
    )
}

export default Vendors