import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ViewVendors = ({ reload }) => {

    const [vendorsData, setVendorsData] = useState([]);

    const navigate = useNavigate();

    const updateVendors = async (e, value) => {
        e.preventDefault();
        sessionStorage.setItem('Name', value.name);
        sessionStorage.setItem('Email', value.email);
        sessionStorage.setItem('UpdateId', value._id);
        sessionStorage.setItem('PhoneNumber', value.phone_number);
        sessionStorage.setItem('Address', value.address);
        sessionStorage.setItem('PaymentTerms', value.payment_terms)
        navigate('/update/vendors', { replace: true });
    };

    useEffect(() => {
        const getVendors = async () => {
            const response = await axios.get('http://localhost:5000/vendors');
            if (response && response.data.success) {
                setVendorsData(response.data.success);
            }
        }
        getVendors();
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
                        <th scope="col">Payment Terms</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vendorsData.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value.name}</td>
                                <td>{value.email}</td>
                                <td>{value.phone_number}</td>
                                <td>{value.address}</td>
                                <td>{value.payment_terms}</td>
                                <td>
                                    <button onClick={(e) => { updateVendors(e, value) }}>
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

export default ViewVendors