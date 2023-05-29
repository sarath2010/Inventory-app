import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ViewCustomer = ({ reload }) => {

    const [customerData, setCustomerData] = useState([]);
    const navigate = useNavigate();

    const updateCustomer = async (e, value) => {
        e.preventDefault();
        sessionStorage.setItem('Name', value.name);
        sessionStorage.setItem('Email', value.email);
        sessionStorage.setItem('UpdateId', value._id);
        sessionStorage.setItem('PhoneNumber', value.phone_number);
        sessionStorage.setItem('BillingAddress', value.billing_address);
        navigate('/update/customer', { replace: true });
    };

    useEffect(() => {
        const getCustomer = async () => {
            const response = await axios.get('http://localhost:5000/customer');
            if (response && response.data.success) {
                setCustomerData(response.data.success);
            }
        }
        getCustomer();
    }, [reload])

    return (
        <>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Billing Address</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customerData.map((value, index) => {
                        return (
                            <tr>
                                <td>{value.name}</td>
                                <td>{value.email}</td>
                                <td>{value.phone_number}</td>
                                <td>{value.billing_address}</td>
                                <td>
                                    <button onClick={(e) => { updateCustomer(e, value) }}>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ViewCustomer