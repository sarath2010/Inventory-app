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

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Vendors</p>

            <form>
                <label>Name</label>
                <input type="text" onChange={(e) => { setName(e.target.value) }} value={name} />

                <label>Email</label>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />

                <label>Phone Number</label>
                <input type="number" onChange={(e) => { setPhoneNumber(e.target.value) }} value={phone_number} />

                <label>Address</label>
                <input type="text" onChange={(e) => { setAddress(e.target.value) }} value={address} />

                <label>Payment Terms</label>
                <input type="number" onChange={(e) => { setPaymentTerms(e.target.value) }} value={payment_terms} placeholder='No of Days'/>

                <button onClick={(e) => { addVendors(e) }}>Submit</button>
            </form>

            <ViewVendors reload={reload} />
        </>
    )
}

export default Vendors