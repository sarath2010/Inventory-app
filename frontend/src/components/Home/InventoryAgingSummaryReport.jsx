import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import moment from 'moment';

const InventoryAgingSummaryReport = () => {

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

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Inventory Aging Summary Report</p>

            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">0 to 30 Days</th>
                            <th scope="col">31 to 60 Days</th>
                            <th scope="col">61 - 90 Days</th>
                            <th scope="col">Above 90 Days</th>
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
        </>
    )
}

export default InventoryAgingSummaryReport