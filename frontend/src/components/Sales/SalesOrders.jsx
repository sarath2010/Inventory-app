import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const SalesOrders = () => {

    const [customerData, setcustomerData] = useState([]);
    const [itemsGroupData, setItemsGroupData] = useState([]);
    const [itemsData, setItemsData] = useState([]);

    const randomNum = Math.floor(Math.random() * 10000000000); // generate a random number between 0 and 999999
    const order_id = String(randomNum).padStart(10, '0'); // convert the number to a string and add leading zeros if necessary
    const [customer_id, setCustomerId] = useState('');
    const [customer_name, setCustomerName] = useState('');
    const [customer_email, setCustomerEmail] = useState('');
    const [customer_billing_address, setCustomerBillingAddress] = useState('');
    const [customer_phone_number, setCustomePhoneNumber] = useState('');
    const [item_group, setItemGroup] = useState('');
    const [item_group_id, setItemGroupId] = useState('');
    const [item_name, setItemName] = useState('');
    const [item_id, setItemId] = useState('');
    const [selling_price, setSellingPrice] = useState('');
    const [stock, setStock] = useState('');
    const [quantity, setQuantity] = useState('');
    const opening_stock = stock - quantity;
    const total_price = selling_price * quantity;
    const [salesOrdersList, setSalesOrdersList] = useState([]);
    const [viewItemsCart, setViewItemsCart] = useState(false);

    const navigate = useNavigate();

    const order = async (e) => {
        try {
            e.preventDefault();
            if (quantity > stock) {
                return alert('Invalid Quantity');
            }
            const updatedSalesOrdersList = salesOrdersList.map(order => {
                return {
                    ...order,
                    status: "Ordered"
                };
            });
            const response = await axios.put('http://localhost:5000/salesorders', updatedSalesOrdersList);
            if (response && response.data.success) {
                alert('Order Placed');
                navigate('/orderslist', { replace: true });
            }
        } catch (error) {
            alert(error);
        }
    };

    const handleCustomerChange = (e) => {
        const selectedCustomer = customerData.find(customer => customer._id === e.target.value);
        setCustomerName(selectedCustomer.name);
        setCustomerId(selectedCustomer._id);
        setCustomerEmail(selectedCustomer.email);
        setCustomerBillingAddress(selectedCustomer.billing_address);
        setCustomePhoneNumber(selectedCustomer.phone_number);
    };

    const handleItemsGroupChange = async (e) => {
        const selectedGroup = itemsGroupData.find(itemsGroup => itemsGroup._id === e.target.value);
        setItemGroup(selectedGroup.item_group_label);
        setItemGroupId(selectedGroup._id);
        getAllItems(selectedGroup._id);
        setItemName('');
        setItemId('')
    };

    const getAllItems = async (id) => {
        const response = await axios.get(`http://localhost:5000/items/${id}`);
        if (response && response.data.success) {
            setItemsData(response.data.success);
        }
    };

    const handleItemsChange = (e) => {
        const selectedItems = itemsData.find(items => items._id === e.target.value);
        setItemName(selectedItems.item_name);
        setItemId(selectedItems._id);
        setSellingPrice(selectedItems.selling_price);
        setStock(selectedItems.opening_stock);
    };

    const viewOrders = (e) => {
        e.preventDefault();
        navigate('/orderslist', { replace: true });
    };

    const addItemsToCart = async (e) => {
        e.preventDefault();
        if (!customer_id && !customer_name && !customer_email && !customer_phone_number && !customer_billing_address && !item_group && !item_group_id && !item_name && !item_id && !selling_price && !quantity && !opening_stock && !total_price) {
            return alert('All fields are mandatory');
        } else if (quantity > stock) {
            return alert('Invalid Quantity');
        }

        setViewItemsCart(true);
        const newSalesOrder = {
            date: new Date(),
            customer_id,
            customer_name,
            customer_email,
            customer_phone_number,
            customer_billing_address,
            item_group,
            item_group_id,
            item_name,
            item_id,
            selling_price,
            quantity,
            total_price,
            opening_stock,
            order_id
        };
        const index = salesOrdersList.findIndex((order) => order.customer_id === customer_id && order.item_id === item_id);
        if (index >= 0) {
            // if item already exists, remove it and add the new item
            const updatedList = [...salesOrdersList];
            updatedList.splice(index, 1, newSalesOrder);
            setSalesOrdersList(updatedList);
        } else {
            // add the new item to the list
            setSalesOrdersList([...salesOrdersList, newSalesOrder]);
        }
        setCustomerId('');
        setCustomePhoneNumber('');
        setCustomerBillingAddress('')
        setCustomerEmail('')
        setItemGroup('')
        setItemId('')
        setItemName('');
        setQuantity('');
        setSellingPrice('');
        setStock('')
        setCustomerName('')
        setItemGroupId('')
        // setSalesOrdersList([...salesOrdersList, newSalesOrder]);
    }

    useEffect(() => {
        const getCustomer = async () => {
            const response = await axios.get('http://localhost:5000/customer');
            if (response && response.data.success) {
                setcustomerData(response.data.success);
            }
        }
        getCustomer();

        const getItemsGroup = async () => {
            const response = await axios.get('http://localhost:5000/items-group');
            if (response && response.data.success) {
                setItemsGroupData(response.data.success);
            }
        }
        getItemsGroup();
    }, [])


    return (
        <>
            <Navbar />

            {/* LABEL-NEW SALES ORDER */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">New Sales Order</span>
                </div>
            </nav>

            {/* BUTTON TOP */}

            <div className='container bg-danger mt-1 ml-10 align-content-end'>
                <div class="d-flex justify-content-end">
                    <button className="button bg-light text-danger form-control-sm mt-2 mb-2 " onClick={(e) => { viewOrders(e) }}>
                        <b>View Sales Orders</b>
                    </button>
                </div>
            </div>

            <div className='container bg-danger ml-10'>

                <form className="form needs-validation">
                    <label className="label mt-1 "><b>Customer Selection</b></label>
                    <select className="form-select form-select-sm w-50 mt-1" value={customer_id} onChange={handleCustomerChange}>
                        <option value="" disabled={true}>--Select Customer--</option>
                        {customerData.map((item, index) => {
                            return (
                                <option key={index} value={item._id}>{item.name}</option>
                            )
                        })}
                    </select>

                    <label className="label mt-1 "><b>Customer Name</b></label>
                    <input className='form-control w-50' disabled={true} defaultValue={customer_name} />

                    <label className="label mt-1 "><b>Customer Email</b></label>
                    <input className='form-control w-50' disabled={true} defaultValue={customer_email} />

                    <label className="label mt-1 "><b>Customer Phone Number</b></label>
                    <input className='form-control w-50' disabled={true} defaultValue={customer_phone_number} />

                    <label className="label mt-1 "><b>Customer Billing Address</b></label>
                    <input className='form-control w-50' disabled={true} defaultValue={customer_billing_address} />

                    <label className="label mt-1 "><b>Items Group</b></label>
                    <select className="form-select form-select-sm w-50 mt-1" value={item_group_id} onChange={handleItemsGroupChange}>
                        <option value="" disabled={true}>--Select Group--</option>
                        {itemsGroupData.map((item, index) => {
                            return (
                                <option key={index} value={item._id}>{item.item_group_label}</option>
                            )
                        })}
                    </select>

                    <label className="label mt-1 "><b>Items</b></label>
                    <select className="form-select form-select-sm w-50 mt-1" value={item_id} onChange={handleItemsChange}>
                        <option value="" disabled={true}>--Select Item--</option>
                        {itemsData.map((item, index) => {
                            return (
                                <option key={index} value={item._id}>{item.item_name}</option>
                            )
                        })}
                    </select>

                    <label className="label mt-1 "><b>Item Group</b></label>
                    <input className='form-control  w-50' disabled={true} defaultValue={item_group} />

                    <label className="label mt-1 "><b>Item Name</b></label>
                    <input className='form-control w-50' disabled={true} defaultValue={item_name} />

                    <label className="label mt-1 "><b>Selling Price</b></label>
                    <input className='form-control w-50' disabled={true} defaultValue={selling_price} />

                    <label className="label mt-1 "><b>Stock</b></label>
                    <input className='form-control w-50' disabled={true} defaultValue={stock} />

                    <label className="label mt-1 "><b>Quantity</b></label><br />
                    <input type='number' className="ibox w-50 " onChange={(e) => { setQuantity(e.target.value) }} value={quantity} /><br />

                    <label className="label mt-1 "><b>Total Price</b></label><br />
                    <input className='form-control w-50' disabled={true} value={total_price} /><br />


                    <button className="button bg-primary form-control-sm " onClick={(e) => { addItemsToCart(e) }}><b>Add to Cart</b></button><br /> <br />

                </form>
            </div>

            <div className='container bg-danger ml-10'>

                {viewItemsCart && (
                    <>
                        <div className='table-responsive'>
                            <table className="table table-secondary table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Billing Address</th>
                                        <th scope="col">Item Group</th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Selling Price</th>
                                        <th scope='col'>Quantity</th>
                                        <th scope='col'>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salesOrdersList.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{moment(value.date).format("DD-MM-YYYY")}</td>
                                                <td>{value.customer_name}</td>
                                                <td>{value.customer_email}</td>
                                                <td>{value.customer_phone_number}</td>
                                                <td>{value.customer_billing_address}</td>
                                                <td>{value.item_group}</td>
                                                <td>{value.item_name}</td>
                                                <td>{value.selling_price.toLocaleString('en-IN')}</td>
                                                <td>{value.quantity.toLocaleString('en-IN')}</td>
                                                <td>{value.total_price.toLocaleString('en-IN')}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                <button className="button bg-success form-control-sm " onClick={(e) => { order(e) }}><b>Place Order</b></button><br /><br /><br />

            </div>


        </>
    )
}

export default SalesOrders