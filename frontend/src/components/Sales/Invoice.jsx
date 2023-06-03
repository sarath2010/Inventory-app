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

            {/* LABEL-INVOICES LIST */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Sales Invoices</span>
                </div>
            </nav>

{/* BUTTON TOP */}

            <div className='container bg-danger mt-1 ml-10 align-content-end'>
                <div class="d-flex justify-content-end">
            <button className="button bg-light text-danger form-control-sm mt-2 mb-2 " onClick={goToGenerateInvoice}><b>Generate Invoice</b></button>
            </div>
            </div>

            <div className='container bg-danger ml-10'>
                <table className="table table-danger table-striped table-bordered ">
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
                                        <button class="btn btn-dark btn-sm" onClick={(e) => { generateInvoice(e, value) }}>Display Invoice</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br />
                <br />
            </div>
        </>
    )
}

export default Invoice