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

            {/* LABEL-PACKAGES LIST */}
            <nav class="navbar navbar-light  bg-danger">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Packages List</span>
                </div>
            </nav>

            {/* BUTTON TOP */}

            <div className='container bg-danger mt-1 ml-10 align-content-end'>
                <div class="d-flex justify-content-end">
                    <button className="button bg-light text-danger form-control-sm mt-2 mb-2 " onClick={goPack}><b>Packaging</b></button>
                </div>
            </div>


            <div className='container bg-danger ml-10'>
                <table className="table table-danger table-striped table-bordered ">
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
                <br />
                <br />
            </div>
        </>
    )
}

export default Packages