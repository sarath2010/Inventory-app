import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Invoice = () => {

    const [customerData, setCustomerData] = useState([]);
    const navigate = useNavigate();


    const getCustomers = async () => {
        const response = await axios.get('http://localhost:5000/customer');
        if (response && response.data.success) {
            setCustomerData(response.data.success);
        }
    };

    const goToGenerateInvoice = () => {
        navigate('/orderslist', { replace: true })
    }

    const generateInvoice = (e, value) => {
        e.preventDefault();
        sessionStorage.setItem('InvoiceCustomerId', value._id);
        sessionStorage.setItem('Name', value.name);
        sessionStorage.setItem('Email', value.email);
        sessionStorage.setItem('PhoneNumber', value.phone_number);
        sessionStorage.setItem('BillingAddress', value.billing_address);
        navigate('/generateinvoice', { replace: true });
    }

    useEffect(() => {
        getCustomers();
    }, [])


    return (
        <>
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Invoice</p>

            <button onClick={goToGenerateInvoice}>Generate Invoice</button>

            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Billing Address</th>
                            <th scope="col">Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.phone_number}</td>
                                    <td>{value.billing_address}</td>
                                    <td>
                                        <button onClick={(e) => { generateInvoice(e, value) }}>Display Invoice</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Invoice