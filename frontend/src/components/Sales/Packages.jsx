import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Packages = () => {

    const [packageData, setPackageData] = useState([]);
    const navigate = useNavigate();

    const goPack = () => {
        navigate('/orderslist', { replace: true })
    }

    const getPackages = async () => {
        const response = await axios.get('http://localhost:5000/packages');
        if (response && response.data.success) {
            setPackageData(response.data.success);
        }
    }

    useEffect(() => {
        getPackages();
    }, [])


    return (
        <>
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Packages List</p>

            <button onClick={goPack}>Go for Pack</button>

            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Package Id</th>
                            <th scope="col">Item</th>
                            <th scope="col">Package Date</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packageData.map((value, index) => {
                            return (
                                <tr key={index}>

                                    <td>{value.package_id}</td>
                                    <td>{value.item_name}</td>
                                    <td>{moment(value.package_date).format("DD-MM-YYYY")}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.package_status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Packages