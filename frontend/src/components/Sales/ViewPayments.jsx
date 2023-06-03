import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import moment from 'moment';

const ViewPayments = () => {

    const [paymentsData, setPaymentsData] = useState([]);

    useEffect(() => {
        const getPayments = async () => {
            const response = await axios.get('http://localhost:5000/payments');
            if (response && response.data.success) {
                setPaymentsData(response.data.success);
            }
        }
        getPayments();
    }, []);


    return (
        <>
            <Navbar />

            {/* LABEL-PAYMENTS LIST */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Payments Received List</span>
                </div>
            </nav>

            <div className='container bg-danger mt-1 ml-10'>
                <br />
                <table className="table table-danger table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Payment Mode</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Received Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.customer_name}</td>
                                    <td>{value.customer_email}</td>
                                    <td>{value.customer_address}</td>
                                    <td>{value.payment_mode}</td>
                                    <td>{value.amount.toLocaleString('en-IN')}</td>
                                    <td>{moment(value.received_date).format('DD-MM-YYYY')}</td>
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

export default ViewPayments