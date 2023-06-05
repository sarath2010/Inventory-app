import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';

const GenerateInvoice = () => {

    const id = sessionStorage.getItem('InvoiceCustomerId');
    const [invoiceData, setInvoiceData] = useState([]);

    const name = sessionStorage.getItem('Name');
    const email = sessionStorage.getItem('Email');
    const phone_number = sessionStorage.getItem('PhoneNumber');
    const billing_address = sessionStorage.getItem('BillingAddress');

    useEffect(() => {
        const getInvoice = async () => {
            const response = await axios.get(`http://localhost:5000/invoice/${id}`);
            if (response && response.data.success) {
                setInvoiceData(response.data.success);
            }
        }
        getInvoice();
    }, [id]);

    return (
        <>
            <Navbar />

            {/* LABEL-CUSTOMER DC */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand h1 text-white">Invoices by Customer</span>
                </div>
            </nav>

            <div className='container bg-danger text-white ml-10 mt-1'><br />
                <p><h5><u>Customer</u></h5></p>
                <table className="table text-white">
                    <thead>
                        <tr>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Customer Email</th>
                            <th scope="col">Customer Phone Number</th>
                            <th scope="col">Customer Billing Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{phone_number}</td>
                            <td>{billing_address}</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div className='container bg-danger ml-10 mt-1'><br />
                <p className='text-white'><u><h5>Invoices</h5></u></p>
                <table className="table table-danger table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.invoice_id}</td>
                                    <td>{value.item_name}</td>
                                    <td>{moment(value.date).format('DD-MM-YYYY')}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.total_price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br />
            </div>
        </>
    )
}

export default GenerateInvoice