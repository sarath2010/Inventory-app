import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const OrdersList = () => {

    const [ordersList, setOrdersList] = useState([]);
    const navigate = useNavigate();

    const randomNum = Math.floor(Math.random() * 10000000000); // generate a random number between 0 and 999999
    const challan_id = String(randomNum).padStart(10, '0'); // convert the number to a string and add leading zeros if necessary

    const pack = async (e, value) => {
        e.preventDefault();
        const response = await axios.put('http://localhost:5000/packages', {
            customer_id: await value.customer_id,
            customer_name: await value.customer_name,
            customer_email: await value.customer_email,
            customer_phone_number: await value.customer_phone_number,
            customer_billing_address: await value.customer_billing_address,
            item_name: value.item_name,
            quantity: value.quantity,
            package_id: await value.order_id,
            package_date: new Date(),
            package_status: "Packed",
            status: "Packed",
        });
        if (response && response.data.success) {
            alert(`Packed Successfull Package Id ${value.order_id}`);
            await getOrders()
            navigate('/packages', { replace: true })
        }
    };

    const goToDeliveryChallans = () => {
        navigate('/deliverychallans', { replace: true })
    }

    const challanAndShip = async (e, value) => {
        e.preventDefault();
        const response = await axios.put('http://localhost:5000/shipping', {
            customer_id: await value.customer_id,
            customer_name: await value.customer_name,
            customer_email: await value.customer_email,
            customer_phone_number: await value.customer_phone_number,
            customer_billing_address: await value.customer_billing_address,
            item_name: await value.item_name,
            quantity: await value.quantity,
            shipping_id: await value.order_id,
            shipping_date: new Date(),
            shipping_status: 'Shipped',
            package_status: "Shipped",
            status: "Shipped",
            challan_id,
            order_id: await value.order_id
        });
        if (response && response.data.success) {
            alert(`Shipped Successfull Shipped Id ${value.order_id}`);
            await getOrders()
            navigate('/deliverychallans', { replace: true })
        }
    };

    const goToInvoice = () => {
        navigate('/invoice', { replace: true })
    }

    const markAsDelivered = async (e, value) => {
        e.preventDefault();
        const response = await axios.put('http://localhost:5000/delivery', {
            customer_id: await value.customer_id,
            customer_name: await value.customer_name,
            customer_email: await value.customer_email,
            customer_phone_number: await value.customer_phone_number,
            customer_billing_address: await value.customer_billing_address,
            item_name: await value.item_name,
            quantity: await value.quantity,
            delivery_id: await value.order_id,
            delivery_date: new Date(),
            delivery_status: 'Delivered',
        });
        if (response && response.data.success) {
            alert('Order Delivered');
            await getOrders();
        }
    };

    const generateInvoice = async (e, value) => {
        e.preventDefault();
        const response = await axios.put('http://localhost:5000/invoice', {
            customer_id: await value.customer_id,
            customer_name: await value.customer_name,
            customer_email: await value.customer_email,
            customer_phone_number: await value.customer_phone_number,
            customer_billing_address: await value.customer_billing_address,
            item_name: await value.item_name,
            quantity: await value.quantity,
            total_price: await value.total_price,
            invoice_id: await value.order_id,
            invoice_date: new Date(),
            invoice_status: 'Invoiced',
        });
        if (response && response.data.success) {
            alert('Invoice Generated');
            await getOrders();
        }
    }

    const getOrders = async () => {
        const response = await axios.get('http://localhost:5000/salesorder');
        if (response && response.data.success) {
            setOrdersList(response.data.success);
        };
    }

    const goToPackages = () => {
        navigate('/packages', { replace: true })
    }

    useEffect(() => {
        getOrders();
    }, []);


    return (
        <>
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Orders List</p>

            <button onClick={goToPackages}>Packages List</button>
            <button onClick={goToDeliveryChallans}>Delivery Challans</button>
            <button onClick={goToInvoice}>Invoice</button>

            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Date</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Billing Address</th>
                            <th scope="col">Item Group</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Selling Price (Per Item)</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Total Price</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Manage Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersList.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.order_id}</td>
                                    <td>{moment(value.date).format("DD-MM-YYYY")}</td>
                                    <td>{value.customer_name}</td>
                                    <td>{value.customer_email}</td>
                                    <td>{value.customer_phone_number}</td>
                                    <td>{value.customer_billing_address}</td>
                                    <td>{value.item_group}</td>
                                    <td>{value.item_name}</td>
                                    <td>{value.selling_price}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.total_price}</td>
                                    <td>{value.status}</td>
                                    <td>
                                        {value.status === "Ordered" && (
                                            <>
                                                <button onClick={(e) => { pack(e, value) }}>Pack</button>
                                            </>
                                        )}
                                        {value.status === "Packed" && (
                                            <>
                                                <button onClick={(e) => { challanAndShip(e, value) }}>Generate Challan and Ship</button>
                                            </>
                                        )}
                                        {value.status === "Shipped" && (
                                            <>
                                                <button onClick={(e) => { markAsDelivered(e, value) }}>Mark as Delivered</button>
                                            </>
                                        )}
                                        {value.status === "Delivered" && (
                                            <>
                                                <button onClick={(e) => { generateInvoice(e, value) }}>Generate Invoice</button>
                                            </>
                                        )}
                                        {value.status === "Invoiced" && (
                                            <>
                                                <p>Completed</p>
                                            </>
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

export default OrdersList