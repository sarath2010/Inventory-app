import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const DeliveryChallans = () => {

    const [customerData, setCustomerData] = useState([]);
    const navigate = useNavigate();


    const getCustomers = async () => {
        const response = await axios.get('http://localhost:5000/customer');
        if (response && response.data.success) {
            setCustomerData(response.data.success);
        }
    };

    const goToOrdersList = () => {
        navigate('/orderslist', { replace: true })
    }

    const generateChallan = (e, value) => {
        e.preventDefault();
        sessionStorage.setItem('ChallanCustomerId', value._id);
        sessionStorage.setItem('CustomerName', value.name);
        sessionStorage.setItem('CustomerEmail', value.email);
        sessionStorage.setItem('CustomerPhoneNumber', value.phone_number);
        sessionStorage.setItem('CustomerBillingAddress', value.billing_address);
        navigate('/generatechallans', { replace: true });
    }

    useEffect(() => {
        getCustomers();
    }, [])


    return (
        <>
            <Navbar />

            {/* LABEL-DELIVERY CHALLANS */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Delivery Challans</span>
                </div>
            </nav>

            {/* BUTTON TOP */}

            <div className='container bg-danger mt-1 ml-10 align-content-end'>
                <div class="d-flex justify-content-end">
                    <button className="button bg-light text-danger form-control-sm mt-2 mb-2 " onClick={goToOrdersList}><b>Generate Delivery Challans</b></button>
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
                            <th scope="col">Delivery Challans</th>
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
                                        <button class="btn btn-danger" onClick={(e) => { generateChallan(e, value) }}>Display Challans</button>
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

export default DeliveryChallans