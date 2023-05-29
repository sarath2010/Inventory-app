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

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Delivery Challans</p>

            <button onClick={goToOrdersList}>Generate Delivery Challans</button>

            <div className='table-responsive'>
                <table className="table">
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
                                        <button onClick={(e) => { generateChallan(e, value) }}>Display Challans</button>
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

export default DeliveryChallans