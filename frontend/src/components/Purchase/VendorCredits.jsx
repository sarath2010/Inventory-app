import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';

const VendorCredits = () => {

    const [vendorsCreditData, setVendorsCreditData] = useState([]);

    useEffect(() => {
        const getVendorCredits = async () => {
            const response = await axios.get('http://localhost:5000/vendorcredits');
            if (response && response.data.success) {
                setVendorsCreditData(response.data.success);
            }
        }
        getVendorCredits();
    }, [])

    return (
        <>
            <Navbar />

            {/* LABEL-VENDOR CREDITS */}
            <nav class="navbar navbar-light  bg-success">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Bills & Payments</span>
                </div>
            </nav>

            <div className='container bg-success mt-1'><br/>
                <table className="table table-success table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Credit Date</th>
                            <th scope="col">Credit Number</th>
                            <th scope="col">Purchase Id</th>
                            <th scope="col">Item Group</th>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Date</th>
                            <th scope="col">Vendor's Name</th>
                            <th scope="col">Vendor's Email</th>
                            <th scope="col">Vendor's Phone Number</th>
                            <th scope="col">Vendor's Payment Terms (days)</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendorsCreditData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{moment(value.credit_date).format('DD-MM-YYYY')}</td>
                                    <td>{value.credit_number}</td>
                                    <td>{value.purchaseId}</td>
                                    <td>{value.item_group}</td>
                                    <td>{value.item}</td>
                                    <td>{value.order_quantity}</td>
                                    <td>{value.order_date}</td>
                                    <td>{value.vendors_name}</td>
                                    <td>{value.vendors_email}</td>
                                    <td>{value.vendors_phone_number}</td>
                                    <td>{value.payment_terms}</td>
                                    <td>{value.amount}</td>
                                    <td>{value.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br/>
            </div>
        </>
    )
}

export default VendorCredits