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

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Sales Returns</p>

            <button onClick={navigateViewReturns}>View Returns</button>
            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">return</th>
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
                                            <button onClick={(e) => { returnForm(e, value) }}>Return</button>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >

        </>
    )
}

export default SalesReturn