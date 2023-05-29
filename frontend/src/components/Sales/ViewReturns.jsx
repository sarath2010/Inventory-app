import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ViewReturns = () => {

    const [returnsData, setReturnsData] = useState([]);
    const randomNum = Math.floor(Math.random() * 10000000000); // generate a random number between 0 and 999999
    const credit_number = String(randomNum).padStart(10, '0'); // convert the number to a string and add leading zeros if necessary
    const navigate = useNavigate();

    const addToInventory = async (e, value) => {
        e.preventDefault();
        const response = axios.put('http://localhost:5000/addinventory', {
            order_id: await value.order_id,
            customer_name: await value.customer_name,
            item_name: await value.item_name,
            item_id: await value.item_id,
            ordered_quantity: await value.ordered_quantity,
            returned_quantity: await value.returned_quantity,
            reason: await value.reason,
            returned_date: await value.returned_date,
            status: 'Added to Inventory',
            selling_price: await value.selling_price
        });
        if (response && (await response).data.success) {
            alert('Added to inventory');
            await getReturns();
        }
    };

    const creditNotes = async (e, value) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/creditnotes', {
            date: new Date(),
            credit_number,
            order_id: await value.order_id,
            customer_name: await value.customer_name,
            item_name: await value.item_name,
            returned_quantity: await value.returned_quantity,
            amount_to_return: await value.selling_price * await value.returned_quantity,
            selling_price: await value.selling_price,
            status: 'Credited'
        });
        if (response && response.data.success) {
            alert('Credit Notes Issued');
            navigate('/creditnotes', { replace: true })
        }
    }

    const goToSalesReturnsList = () => {
        navigate('/salesreturn', { replace: true })
    }
    const getReturns = async () => {
        const response = await axios.get('http://localhost:5000/salesreturn');
        if (response && response.data.success) {
            setReturnsData(response.data.success);
        }
    };

    useEffect(() => {
        getReturns();
    }, [])


    return (
        <>
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>View Returns</p>

            <button onClick={goToSalesReturnsList}>Sales Returns List</button>

            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Ordered Quantity</th>
                            <th scope="col">Returned Quantity</th>
                            <th scope="col">Reason</th>
                            <th scope="col">Returned Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Inventory</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returnsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.order_id}</td>
                                    <td>{value.customer_name}</td>
                                    <td>{value.item_name}</td>
                                    <td>{value.ordered_quantity}</td>
                                    <td>{value.returned_quantity}</td>
                                    <td>{value.reason}</td>
                                    <td>{moment(value.returned_date).format('DD-MM-YYYY')}</td>
                                    <td>{value.status}</td>
                                    <td>
                                        {value.status === "Checking" && (
                                            <button onClick={(e) => { addToInventory(e, value) }}>Add</button>
                                        )}
                                        {value.status === "Added to Inventory" && (
                                            <button onClick={(e) => { creditNotes(e, value) }}>Credit Notes</button>
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

export default ViewReturns