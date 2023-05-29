import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const CreditNotes = () => {

    const [creditsNotesData, setCreditsNotesData] = useState([]);
    const navigate = useNavigate();

    const addCredit = () => {
        navigate('/viewreturn', { replace: true })
    }

    useEffect(() => {
        const getCredits = async () => {
            const response = await axios.get('http://localhost:5000/creditnotes');
            if (response && response.data.success) {
                setCreditsNotesData(response.data.success);
            }
        }
        getCredits();
    }, [])


    return (
        <>
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Credit Notes</p>

            <button onClick={addCredit}>Add Credit Notes</button>

            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Credited Date</th>
                            <th scope="col">Credit Number</th>
                            <th scope="col">Order Id</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Returned Quantity</th>
                            <th scope="col">Selling Price</th>
                            <th scope="col">Return Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {creditsNotesData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{moment(value.date).format('DD-MM-YYYY')}</td>
                                    <td>{value.credit_number}</td>
                                    <td>{value.order_id}</td>
                                    <td>{value.customer_name}</td>
                                    <td>{value.item_name}</td>
                                    <td>{value.returned_quantity}</td>
                                    <td>{value.selling_price}</td>
                                    <td>{value.amount_to_return}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CreditNotes