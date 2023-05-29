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

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Generate Invoice</p>
            <div className='table-responsive'>
                <table className="table">
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
                <table className="table">
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
        </>
    )
}

export default GenerateInvoice