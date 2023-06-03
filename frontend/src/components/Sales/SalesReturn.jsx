import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SalesReturn = () => {

    const [salesOrderData, setSalesOrderData] = useState([]);
    const navigate = useNavigate();

    const returnForm = (e, value) => {
        e.preventDefault();
        sessionStorage.setItem('ItemId', value.item_id);
        sessionStorage.setItem('OrderId', value.order_id);
        sessionStorage.setItem('CustomerName', value.customer_name);
        sessionStorage.setItem('ItemName', value.item_name);
        sessionStorage.setItem('Quantity', value.quantity);
        sessionStorage.setItem('SellingPrice', value.selling_price);
        navigate('/return', { replace: true });
    }

    const navigateViewReturns = async () => {
        navigate('/viewreturn', { replace: true });
    };

    useEffect(() => {
        const getSalesOrder = async () => {
            const response = await axios.get('http://localhost:5000/salesorder');
            if (response && response.data.success) {
                setSalesOrderData(response.data.success);
            }
        }
        getSalesOrder();
    }, [])


    return (
        <>
            <Navbar />

            {/* LABEL-SALES RETURNS */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Sales Returns</span>
                </div>
            </nav>

            {/* BUTTON TOP */}

            <div className='container bg-danger mt-1 ml-10 align-content-end'>
                <div class="d-flex justify-content-end">
                    <button className="button bg-light text-danger form-control-sm mt-2 mb-2 " onClick={navigateViewReturns}><b>View Returns</b></button>
                </div>
            </div>

            <div className='container bg-danger ml-10'>
                <table className="table table-danger table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Add Returns</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesOrderData.filter(items => items.status === "Invoiced").map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.order_id}</td>
                                    <td>{value.customer_name}</td>
                                    <td>{value.item_name}</td>
                                    <td>{value.quantity}</td>
                                    <td>
                                        {value.status === "Invoiced" && (
                                            <button class="btn btn-danger btn-sm" onClick={(e) => { returnForm(e, value) }}>Add</button>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br />
            </div >

        </>
    )
}

export default SalesReturn