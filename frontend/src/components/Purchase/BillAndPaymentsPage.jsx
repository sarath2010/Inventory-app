import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import moment from 'moment';

const BillAndPaymentsPage = () => {

    const [billsData, setBillsData] = useState([]);
    const randomNum = Math.floor(Math.random() * 10000000000); // generate a random number between 0 and 999999
    const credit_number = String(randomNum).padStart(10, '0'); // convert the number to a string and add leading zeros if necessary

    const vendorCredit = async (e, value) => {
        e.preventDefault();
        const response = await axios.put('http://localhost:5000/vendorCredits', {
            purchaseId: await value.purchaseId,
            item_group: await value.item_group,
            item: await value.item,
            order_quantity: await value.order_quantity,
            order_date: String(moment(value.date).format('DD-MM-YYYY')),
            vendors_name: await value.vendors_name,
            vendors_email: await value.vendors_email,
            vendors_phone_number: await value.vendors_phone_number,
            payment_terms: await value.payment_terms,
            amount: await value.amount,
            status: "CR.Issued",
            credit_number,
            credit_date: new Date()
        });
        if (response && response.data.success) {
            alert('Vendors Credited');
            await getBills();
        }
    }

    const getBills = async () => {
        const response = await axios.get('http://localhost:5000/billpayments');
        if (response && response.data.success) {
            setBillsData(response.data.success);
        }
    }

    useEffect(() => {
        getBills();
    }, [])


    return (
        <>
            <Navbar />

            {/* LABEL-BILLS N PAYMENTS */}
            <nav class="navbar navbar-light  bg-success">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Bills & Payments</span>
                </div>
            </nav>

             <div className='container bg-success mt-1'><br/>
                <table className="table table-success table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">PO Number</th>
                            <th scope="col">Item Group</th>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Date</th>
                            <th scope="col">Vendor</th>
                            <th scope="col">Vendor Email</th>
                            <th scope="col">Vendor Phone</th>
                            <th scope="col">Payment Terms (days)</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.purchaseId}</td>
                                    <td>{value.item_group}</td>
                                    <td>{value.item}</td>
                                    <td>{value.order_quantity.toLocaleString('en-IN')}</td>
                                    <td>{value.date}</td>
                                    <td>{value.vendors_name}</td>
                                    <td>{value.vendors_email}</td>
                                    <td>{value.vendors_phone_number}</td>
                                    <td>{value.payment_terms}</td>
                                    <td>{value.amount.toLocaleString('en-IN')}</td>
                                    <td>{value.status}</td>
                                    <td>
                                        {value.status === "Bills Received" && (
                                            <button class="btn btn-dark btn-sm" onClick={(e) => { vendorCredit(e, value) }}>Vendor Credit Notes</button>
                                        )}
                                    </td>
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

export default BillAndPaymentsPage