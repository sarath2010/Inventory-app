import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';

const ViewPurchaseOrders = () => {

    const [purchaseData, setPurchaseData] = useState([]);

    const navigate = useNavigate();

    const goToPurchase = () => {
        navigate('/purchaseorders', { replace: true })
    }

    const goToBill = async (e, value) => {
        e.preventDefault();
        sessionStorage.setItem('ItemGroup', value.item_group);
        sessionStorage.setItem('Item', value.item);
        sessionStorage.setItem('OrderQuantity', value.order_quantity);
        sessionStorage.setItem('Date', value.date);
        sessionStorage.setItem('VendorsName', value.vendors_name);
        sessionStorage.setItem('VendorsEmail', value.vendors_email);
        sessionStorage.setItem('VendorsPhoneNumber', value.vendors_phone_number);
        sessionStorage.setItem('PaymentTerms', value.payment_terms);
        sessionStorage.setItem('Amount', value.amount);
        sessionStorage.setItem('PurchaseIdNew', value.purchase_order_id);
        sessionStorage.setItem('ItemId', value.item_id)
        navigate('/billpayments', { replace: true })
    }

    useEffect(() => {
        const getPurchase = async () => {
            const response = await axios.get('http://localhost:5000/purchaseorders');
            if (response && response.data.success) {
                setPurchaseData(response.data.success);
            }
        }
        getPurchase()
    }, [])


    return (
        <>
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Purchase Orders List</p>

            <button onClick={goToPurchase}>Purchase</button>

            <div className="table table-responsive">
                <table className="table">
                    <thead>
                        <tr>
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
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.purchase_order_id}</td>
                                    <td>{value.item_group}</td>
                                    <td>{value.item}</td>
                                    <td>{value.order_quantity}</td>
                                    <td>{moment(value.date).format('DD-MM-YYYY')}</td>
                                    <td>{value.vendors_name}</td>
                                    <td>{value.vendors_email}</td>
                                    <td>{value.vendors_phone_number}</td>
                                    <td>{value.payment_terms}</td>
                                    <td>{value.amount}</td>
                                    <td>{value.status}</td>
                                    <td>
                                        {value.status === "Order Issued" && (
                                            <button onClick={(e) => { goToBill(e, value) }}>Enter Vendor Bill</button>
                                        )}
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

export default ViewPurchaseOrders