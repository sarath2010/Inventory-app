import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './Home.css';

const Home = () => {

    const [totalStock, setTotalStock] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [totalQuantitySales, setTotalQuantitySales] = useState('');
    const [totalPriceSales, setTotalPriceSales] = useState('');
    const [salesOrderData, setSalesOrderData] = useState([]);
    const [filter, setFilter] = useState('');//xx
    const [customerOrItemsData, setCustomerOrItemsData] = useState([]);
    const [filterId, setFilterId] = useState('');

    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items');
            if (response && response.data.success) {
                const totalStock = response.data.success.reduce((total, item) => total + item.opening_stock, 0);
                setTotalStock(totalStock);
                const totalPrice = response.data.success.reduce((total, price) => total + price.selling_price * price.opening_stock, 0);
                setTotalPrice(totalPrice)
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const getSalesOrders = async () => {
        const response = await axios.get('http://localhost:5000/salesorder');
        if (response && response.data.success) {
            setSalesOrderData(response.data.success)
            const totalItemSales = response.data.success.reduce((total, item) => total + item.quantity, 0);
            setTotalQuantitySales(totalItemSales);
            const totalPriceSales = response.data.success.reduce((total, price) => total + price.total_price, 0);
            setTotalPriceSales(totalPriceSales);
        }
    }

    const filterSales = async (e) => {
        e.preventDefault();
        if (filter === "Customer") {
            await getSpecSalesByCustomers(filterId);
        }
        else if (filter === "Items") {
            await getSpecSalesByItems(filterId);
        }
    }

    const getSpecSalesByCustomers = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/salesorderbycustomers/${id}`);
            if (response && response.data.success) {
                setSalesOrderData(response.data.success);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getSpecSalesByItems = async (filterId) => {
        try {
            const response = await axios.get(`http://localhost:5000/salesorderbyitems/${filterId}`);
            if (response && response.data.success) {
                setSalesOrderData(response.data.success);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getCustomer = async () => {
        const response = await axios.get('http://localhost:5000/customer');
        if (response && response.data.success) {
            setCustomerOrItemsData(response.data.success);
        }
    };

    const getItemsList = async () => {
        const response = await axios.get('http://localhost:5000/items');
        if (response && response.data.success) {
            setCustomerOrItemsData(response.data.success)
        }
    }

    const handleFilter = async (e) => {
        setFilter(e.target.value)
        if (e.target.value === "Customer") {
            await getCustomer();
        } else if (e.target.value === "Items") {
            await getItemsList();
        }
    }

    const resetSales = async (e) => {
        e.preventDefault();
        await getSalesOrders();
        setFilter('');
        setFilterId('');
        setCustomerOrItemsData([]);
    }

    useEffect(() => {
        getItems();
        getSalesOrders();
        getCustomer();
    }, [])




    const [itemsData, setItemsData] = useState([]);

    const getAllItems = async () => {
        const response = await axios.get('http://localhost:5000/items');
        if (response && response.data.success) {
            setItemsData(response.data.success);
        }
    };

    useEffect(() => {
        getAllItems();
    }, [])



    return (
        <>

            <Navbar />

            {/* Page Heading */}
            <nav class="navbar navbar-light  bg-dark">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-warning ">Dashboard</span>
                </div>
            </nav>

            {/* <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <div className="card text-bg-primary mb-3" style={{ maxWidth: '100%' }}>
                            <div className="card-header">Reports</div>
                            <div className="card-body">
                                <h5 className="card-title">Inventory Summary</h5>
                                <p className="card-text">Total Stock : {totalStock}</p>
                                <p className="card-text">Total Price : {totalPrice}</p>
                            </div>
                        </div>
                    </div>*/}

            {/* <div className="col-sm-12 col-md-6 col-lg-4">
                <div className="card text-bg-secondary mb-3" style={{ maxWidth: '100%' }}>
                    <div className="card-header">Reports</div>
                    <div className="card-body">
                        <h5 className="card-title">Inventory Aging Summary </h5>
                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            {/* <Link to={'/inventoryaging'} replace={true} className="card-link text-white h6">View Report</Link> */}
            {/* </div>
                 </div>
            </div> */}

            {/* <div className="col-sm-12 col-md-6 col-lg-4">
                        <div className="card text-bg-success mb-3" style={{ maxWidth: '100%' }}>
                            <div className="card-header">Reports</div>
                            <div className="card-body">
                                <h5 className="card-title">Product Sales</h5>
                                <p className="card-text">Total Units Sold : {totalQuantitySales}</p>
                                <p className="card-text">Total Sales : {totalPriceSales}</p>
                            </div>
                        </div>
                    </div>
                </div> */}

            {/* <div className="row">
                    <div className="col-12">
                        <div className="card text-bg-danger mb-3" style={{ maxWidth: '100%' }}>
                            <div className="card-header">
                                Reports
                                {/* xx */}
            {/* <div className="row">
                                    <div className="d-flex justify-content-end">
                                        <div className="form-group d-flex">
                                            <label htmlFor="range" className="me-4 mt-auto">Filter</label>
                                            <select id="range" className="form-control me-2 mt-4" value={filter} onChange={handleFilter}>
                                                <option value="">--Select--</option>
                                                <option value="Customer">Customer</option>
                                                <option value="Items">Items</option>
                                            </select>

                                            <label htmlFor="range" className="mr-2 mt-auto me-4 text-nowrap">Customer / Items Name</label>
                                            <select id="range" className="form-control mt-4" value={filterId} onChange={(e) => { setFilterId(e.target.value) }}>
                                                <option value="">--Select--</option>
                                                {customerOrItemsData.map((value, index) => {
                                                    return filter === "Customer" ? (
                                                        <option key={index} value={value.customer_name}>{value.name}</option>
                                                    ) : filter === "Items" && (
                                                        <option key={index} value={value._id}>{value.item_name}</option>
                                                    );
                                                })} */}

            {/* </select>
                                        </div>
                                        <button className="btn btn-primary mt-4 ms-3" onClick={(e) => { filterSales(e) }}>Submit</button>
                                        <button className="btn btn-primary mt-4 ms-3" onClick={(e) => { resetSales(e) }}>Reset</button>
                                    </div>
                                </div> */}
            {/* xx */}
            {/* </div>
                            <div className="card-body">
                                <h5 className="card-title">Sales by Items / Customer</h5> */}
            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <Link className="card-link text-white h6">View Report</Link> */}

            {/* <div className="table table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ color: 'white' }}>Sales Date</th>
                                                <th scope="col" style={{ color: 'white' }}>Sales Id</th>
                                                <th scope="col" style={{ color: 'white' }}>Customer Name</th>
                                                <th scope="col" style={{ color: 'white' }}>Item</th>
                                                <th scope="col" style={{ color: 'white' }}>Item Group</th>
                                                <th scope="col" style={{ color: 'white' }}>Quantity</th>
                                                <th scope="col" style={{ color: 'white' }}>Unit Price</th>
                                                <th scope="col" style={{ color: 'white' }}>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {salesOrderData.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ color: 'white' }}>{moment(value.date).format('DD-MM-YYYY')}</td>
                                                        <td style={{ color: 'white' }}>{value.order_id}</td>
                                                        <td style={{ color: 'white' }}>{value.customer_name}</td>
                                                        <td style={{ color: 'white' }}>{value.item_name}</td>
                                                        <td style={{ color: 'white' }}>{value.item_group}</td>
                                                        <td style={{ color: 'white' }}>{value.quantity}</td>
                                                        <td style={{ color: 'white' }}>{value.selling_price}</td>
                                                        <td style={{ color: 'white' }}>{value.total_price}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div> */}


            {/* </div>
                        </div>
                    </div>
                </div>

            </div> */}


            {/* NEW */}
            
            <nav>
                <div class="nav nav-tabs justify-content-end" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                    <button class="nav-link bg-primary text-white" id="nav-stock-tab" data-bs-toggle="tab" data-bs-target="#nav-stock" type="button" role="tab" aria-controls="nav-stock" aria-selected="false">Stock Summary</button>
                    <button class="nav-link bg-danger text-white" id="nav-sale-tab" data-bs-toggle="tab" data-bs-target="#nav-sale" type="button" role="tab" aria-controls="nav-sale" aria-selected="false">Sales Summary</button>
                    <button class="nav-link bg-success text-white" id="nav-sales-tab" data-bs-toggle="tab" data-bs-target="#nav-sales" type="button" role="tab" aria-controls="nav-sales" aria-selected="false">Sales Report</button>
                    <button class="nav-link bg-secondary text-white" id="nav-ageing-tab" data-bs-toggle="tab" data-bs-target="#nav-ageing" type="button" role="tab" aria-controls="nav-ageing" aria-selected="false">Ageing Report</button>
                </div>
            </nav>

            <div class="tab-content" id="nav-tabContent">

                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...

                </div>


                <div class="tab-pane fade" id="nav-stock" role="tabpanel" aria-labelledby="nav-stock-tab">

                    <div className="container-fluid mt-2">
                        <div className="row">
                            {/* <div className="col-sm-12 col-md-6 col-lg-4"> */}
                            <div className="card text-bg-primary mb-3" style={{ maxWidth: '100%' }}>
                                <div className="card-header">Summary</div>
                                <div className="card-body">
                                    <h5 className="card-title">Stock in Hand</h5>
                                    <p className="card-text">Total Value : {totalPrice.toLocaleString('en-IN')}</p>
                                    <p className="card-text">Total Units : {totalStock.toLocaleString('en-IN')}</p>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div class="tab-pane fade" id="nav-sale" role="tabpanel" aria-labelledby="nav-sale-tab">

                    <div className="container-fluid mt-2">
                        <div className="row">
                            {/* <div className="col-sm-12 col-md-6 col-lg-4"> */}
                            <div className="card text-bg-danger mb-3 " style={{ maxWidth: '100%' }}>
                                <div className="card-header">Summary</div>
                                <div className="card-body">
                                    <h5 className="card-title">Product Sales</h5>
                                    <p className="card-text">Total Units Sold : {totalQuantitySales.toLocaleString('en-IN')}</p>
                                    <p className="card-text">Total Sales : {totalPriceSales.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="tab-pane fade" id="nav-sales" role="tabpanel" aria-labelledby="nav-sales-tab">

                <div className="row">

                    <div className="col-12">
                        <div className="card text-bg-success mb-3" style={{ maxWidth: '100%' }}>
                            <div className="card-header">Report</div>
                            <div className="row">
                                <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-center">Sales Details</h5>

                                    <div className="d-flex justify-content-center">
                                        <div className="form-group d-flex">
                                            <label htmlFor="range" className="me-4 mt-4">Filter</label>
                                            <select id="range" className="form-control form-control-sm me-2 mt-4 text-bg-success" placeholder=".form-control-sm" value={filter} onChange={handleFilter}>
                                                <option value="">--Select--</option>
                                                <option value="Customer">Customer</option>
                                                <option value="Items">Items</option>
                                            </select>

                                            <label htmlFor="range" className="mr-2 mt-4 me-4 text-nowrap">Customer / Items Name</label>
                                            <select id="range" className="form-control form-control-sm mt-4 text-bg-success" placeholder=".form-control-sm" value={filterId} onChange={(e) => { setFilterId(e.target.value) }}>
                                                <option value="">--Select--</option>
                                                {customerOrItemsData.map((value, index) => {
                                                    return filter === "Customer" ? (
                                                        <option key={index} value={value.customer_name}>{value.name}</option>
                                                    ) : filter === "Items" && (
                                                        <option key={index} value={value._id}>{value.item_name}</option>
                                                    );
                                                })}

                                            </select>
                                        </div>
                                        <button className="btn btn-outline-warning mt-4 ms-3" onClick={(e) => { filterSales(e) }}>Submit</button>
                                        <button className="btn btn-outline-dark text-light mt-4 ms-3" onClick={(e) => { resetSales(e) }}>Reset</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">

                                <div className="table table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ color: 'white' }}>Sales Date</th>
                                                <th scope="col" style={{ color: 'white' }}>Sales Id</th>
                                                <th scope="col" style={{ color: 'white' }}>Customer Name</th>
                                                <th scope="col" style={{ color: 'white' }}>Item</th>
                                                <th scope="col" style={{ color: 'white' }}>Item Group</th>
                                                <th scope="col" style={{ color: 'white' }}>Quantity</th>
                                                <th scope="col" style={{ color: 'white' }}>Unit Price</th>
                                                <th scope="col" style={{ color: 'white' }}>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {salesOrderData.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ color: 'white' }}>{moment(value.date).format('DD-MM-YYYY')}</td>
                                                        <td style={{ color: 'white' }}>{value.order_id}</td>
                                                        <td style={{ color: 'white' }}>{value.customer_name}</td>
                                                        <td style={{ color: 'white' }}>{value.item_name}</td>
                                                        <td style={{ color: 'white' }}>{value.item_group}</td>
                                                        <td style={{ color: 'white' }}>{value.quantity.toLocaleString('en-IN')}</td>
                                                        <td style={{ color: 'white' }}>{value.selling_price.toLocaleString('en-IN')}</td>
                                                        <td style={{ color: 'white' }}>{value.total_price.toLocaleString('en-IN')}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <div class="tab-pane fade" id="nav-ageing" role="tabpanel" aria-labelledby="nav-ageing-tab">

                {/* <div className="row">

                    <div className="col-12">
                        <div className="card text-bg-secondary mt-1" style={{ maxWidth: '100%' }}>
                            <div className="card-header">Report</div>
                            <div className="row">
                                <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-center">Inventory Ageing</h5>

                                    <div className='table table-responsive text-light'>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Item</th>
                                                    <th scope="col">Less than a Month</th>
                                                    <th scope="col">1-2 Months</th>
                                                    <th scope="col">2-3 Months</th>
                                                    <th scope="col">Above 3 Months</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {itemsData.map((value, index) => {
                                                    const currentDate = moment(); // Current date and time
                                                    const createdAtDate = moment(value.created_At); // Specific date
                                                    const differenceInDays = currentDate.diff(createdAtDate, 'days');

                                                    return (
                                                        <tr key={index}>
                                                            <td>{value.item_name}</td>
                                                            <td>{differenceInDays >= 0 && differenceInDays < 31 ? (value.opening_stock) : ('-')}</td>
                                                            <td>{differenceInDays > 30 && differenceInDays < 61 ? (value.opening_stock) : ('-')}</td>
                                                            <td>{differenceInDays > 60 && differenceInDays < 91 ? (value.opening_stock) : ('-')}</td>
                                                            <td>{differenceInDays > 90 ? (value.opening_stock) : ('-')}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}


<div className="row">

<div className="col-12">
    <div className="card text-bg-success mb-3" style={{ maxWidth: '100%' }}>
        <div className="card-header">Report</div>
        <div className="row">
            <div className="card-body">
                <h5 className="card-title d-flex justify-content-center">Sales Details</h5>

                <div className="d-flex justify-content-center">
                    <div className="form-group d-flex">
                        <label htmlFor="range" className="me-4 mt-4">Filter</label>
                        <select id="range" className="form-control form-control-sm me-2 mt-4 text-bg-success" placeholder=".form-control-sm" value={filter} onChange={handleFilter}>
                            <option value="">--Select--</option>
                            <option value="Customer">Customer</option>
                            <option value="Items">Items</option>
                        </select>

                        <label htmlFor="range" className="mr-2 mt-4 me-4 text-nowrap">Customer / Items Name</label>
                        <select id="range" className="form-control form-control-sm mt-4 text-bg-success" placeholder=".form-control-sm" value={filterId} onChange={(e) => { setFilterId(e.target.value) }}>
                            <option value="">--Select--</option>
                            {customerOrItemsData.map((value, index) => {
                                return filter === "Customer" ? (
                                    <option key={index} value={value.customer_name}>{value.name}</option>
                                ) : filter === "Items" && (
                                    <option key={index} value={value._id}>{value.item_name}</option>
                                );
                            })}

                        </select>
                    </div>
                    <button className="btn btn-outline-warning mt-4 ms-3" onClick={(e) => { filterSales(e) }}>Submit</button>
                    <button className="btn btn-outline-dark text-light mt-4 ms-3" onClick={(e) => { resetSales(e) }}>Reset</button>
                </div>
            </div>
        </div>

        <div className="card-body">

            <div className="table table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ color: 'white' }}>Sales Date</th>
                            <th scope="col" style={{ color: 'white' }}>Sales Id</th>
                            <th scope="col" style={{ color: 'white' }}>Customer Name</th>
                            <th scope="col" style={{ color: 'white' }}>Item</th>
                            <th scope="col" style={{ color: 'white' }}>Item Group</th>
                            <th scope="col" style={{ color: 'white' }}>Quantity</th>
                            <th scope="col" style={{ color: 'white' }}>Unit Price</th>
                            <th scope="col" style={{ color: 'white' }}>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesOrderData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ color: 'white' }}>{moment(value.date).format('DD-MM-YYYY')}</td>
                                    <td style={{ color: 'white' }}>{value.order_id}</td>
                                    <td style={{ color: 'white' }}>{value.customer_name}</td>
                                    <td style={{ color: 'white' }}>{value.item_name}</td>
                                    <td style={{ color: 'white' }}>{value.item_group}</td>
                                    <td style={{ color: 'white' }}>{value.quantity.toLocaleString('en-IN')}</td>
                                    <td style={{ color: 'white' }}>{value.selling_price.toLocaleString('en-IN')}</td>
                                    <td style={{ color: 'white' }}>{value.total_price.toLocaleString('en-IN')}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</div>


            </div>


        </>
    )
}

export default Home