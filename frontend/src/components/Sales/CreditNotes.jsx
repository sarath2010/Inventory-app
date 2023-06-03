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

            {/* LABEL-SALES CREDIT NOTES */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Sales Credit Notes</span>
                </div>
            </nav>

            {/* BUTTON TOP */}

            <div className='container bg-danger mt-1 ml-10 align-content-end'>
                <div class="d-flex justify-content-end">
                    <button className="button bg-light text-danger form-control-sm mt-2 mb-2 " onClick={addCredit}><b>Add Credit Notes</b></button>
                </div>
            </div>

            <div className='container bg-danger ml-10'>
                <table className="table table-danger table-striped table-bordered">
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
                <br/>
            </div>
        </>
    )
}

export default CreditNotes