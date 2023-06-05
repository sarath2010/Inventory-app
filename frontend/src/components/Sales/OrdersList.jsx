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
            alert(`Packing completed, Package# ${value.order_id}`);
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
            alert(`Shipped with Shipping# ${value.order_id}`);
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
            alert('Delivery of the order is completed.');
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
            alert('Invoice Issued.');
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

            {/* LABEL-SALES ORDERS LIST */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Sales Orders List</span>
                </div>
            </nav>

            <div className='container bg-danger mt-1 ml-10'>
                <div class="d-flex justify-content-around">
                    <button className="button bg-light text-danger form-control-sm mt-2 mb-2 " onClick={goToPackages}><b>Packages List</b></button>
                    <button className="button bg-light text-danger form-control-sm mt-2 mb-2 " onClick={goToDeliveryChallans}><b>Delivery Challans</b></button>
                    <button className="button bg-light text-danger form-control-sm mt-2 mb-2 " onClick={goToInvoice}><b>Invoices List</b></button>
                </div>
            </div>

            <div className='container bg-danger'>
            <div className='table-responsive'>
                <table className="table table-danger table-striped table-bordered">
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
                                    <td><b>{value.order_id}</b></td>
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
                                    <td><b>{value.status}</b></td>
                                    <td>
                                        {value.status === "Ordered" && (
                                            <>
                                                <button class="btn btn-primary" onClick={(e) => { pack(e, value) }}>Pack the Order</button>
                                            </>
                                        )}
                                        {value.status === "Packed" && (
                                            <>
                                                <button class="btn btn-info" onClick={(e) => { challanAndShip(e, value) }}>Delivery Challan & Ship</button>
                                            </>
                                        )}
                                        {value.status === "Shipped" && (
                                            <>
                                                <button class="btn btn-warning" onClick={(e) => { markAsDelivered(e, value) }}>Mark as Delivered</button>
                                            </>
                                        )}
                                        {value.status === "Delivered" && (
                                            <>
                                                <button class="btn btn-dark" onClick={(e) => { generateInvoice(e, value) }}>Generate Invoice</button>
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
            <br/>
            <br/>
            </div>
        </>
    )
}

export default OrdersList