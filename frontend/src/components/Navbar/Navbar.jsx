import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {



    return (
        <>

            {/* NEW Navbar */}


            <div class="mr-auto p-0 bd-highlight sticky-top">

            <nav class="navbar navbar-expand-lg navbar-light bg-warning">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Inventory Operations</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                            </li>




                            <li className="nav-item me-4">
                                <Link to={'/'} replace={true} className="btn btn-dark">Dashboard</Link>
                            </li>


                            <li className="nav-item me-4">
                                <div className="dropdown">
                                    <button className="btn btn-primary dropdown-toggle d-flex flex-row-reverse  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Inventory
                                    </button>
                                    <ul className="dropdown-menu mt-3 bg-primary dropdown-menu-right">
                                        <p class="dropdown-header text-white text-uppercase text-center text-monospace ">Items</p>
                                        {/* <div class="dropdown-divider"></div> */}
                                        <li> <Link to={'/items'} replace={true} className="dropdown-item text-white rounded bg-primary active">Add</Link> </li>
                                        <li> <Link to={'/viewitems'} replace={true} className="dropdown-item text-white rounded bg-primary">View</Link> </li>
                                        <div class="dropdown-divider"></div>
                                        <li> <Link to={'/item-groups'} replace={true} className="dropdown-item text-white rounded bg-primary">Item Groups</Link> </li>
                                        <div class="dropdown-divider"></div>
                                        <li> <Link to={'/inventoryadjustments'} replace={true} className="dropdown-item text-white rounded bg-primary">Inventory Adjustments</Link> </li>
                                    </ul>
                                </div>
                            </li>


                            <li className="nav-item me-4">
                                <div className="dropdown">
                                    <button className="btn btn-danger dropdown-toggle d-flex flex-row-reverse " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Sales
                                    </button>
                                    <ul className="dropdown-menu mt-3 bg-danger dropdown-menu-right">
                                        <div className='d-md-flex'>
                                            <div>
                                                <li> <Link to={'/addcustomer'} replace={true} className="dropdown-item text-white rounded bg-danger">Customers</Link> </li>
                                                <div class="dropdown-divider"></div>
                                                <li> <Link to={'/sales'} replace={true} className="dropdown-item text-white rounded bg-danger">Sales Orders</Link> </li>
                                                <li> <Link to={'/packages'} replace={true} className="dropdown-item text-white rounded bg-danger">Packages</Link> </li>
                                                <li> <Link to={'/deliverychallans'} replace={true} className="dropdown-item text-white rounded bg-danger">Delivery Challans</Link> </li>
                                            </div>
                                            <div>
                                                <li> <Link to={'/invoice'} replace={true} className="dropdown-item text-white rounded bg-danger">Invoices</Link> </li>
                                                <li> <Link to={'/payments'} replace={true} className="dropdown-item text-white rounded bg-danger">Payments Received</Link> </li>
                                                <div class="dropdown-divider"></div>
                                                <li> <Link to={'/salesreturn'} replace={true} className="dropdown-item text-white rounded bg-danger">Sales Returns</Link> </li>
                                                <li> <Link to={'/creditnotes'} replace={true} className="dropdown-item text-white rounded bg-danger">Credit Notes</Link> </li>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </li>


                            <li className="nav-item">
                                <div className="dropdown">
                                    <button className="btn btn-success dropdown-toggle d-flex flex-row-reverse" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Purchase
                                    </button>
                                    <ul className="dropdown-menu mt-3 bg-success dropdown-menu-right">
                                        <li> <Link to={'/vendors'} replace={true} className="dropdown-item text-white rounded bg-success">Vendors</Link> </li>
                                        <div class="dropdown-divider"></div>
                                        <li> <Link to={'/purchaseorders'} replace={true} className="dropdown-item text-white rounded bg-success">Purchase Orders</Link> </li>
                                        <li> <Link to={'/billandpayments'} replace={true} className="dropdown-item text-white rounded bg-success">Bills and Payments</Link> </li>
                                        <li> <Link to={'/vendorscredit'} replace={true} className="dropdown-item text-white rounded bg-success">Vendor Credit</Link> </li>
                                    </ul>
                                </div>
                            </li>

          
                        </ul>

                    </div>
                </div>
            </nav>

            </div>

        </>
    )
}

export default Navbar