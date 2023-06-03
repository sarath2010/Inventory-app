import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

const InventoryAdjustments = () => {

    const [itemsGroupData, setItemsGroupData] = useState([]);
    const navigate = useNavigate();

    const getItemsGroup = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items-group');
            if (response && response.data.success) {
                setItemsGroupData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const manage = (e, value) => {
        e.preventDefault();
        sessionStorage.setItem('ManageID', value._id);
        navigate('/inventory-items', { replace: true });
    };

    const getReports = (e) => {
        e.preventDefault();
        navigate('/adjustment-reports');
    }

    useEffect(() => {
        getItemsGroup();
    }, []);


    return (
        <>
            <Navbar />

            {/* LABEL-INV ADJS */}
            <nav class="navbar navbar-primary  bg-primary">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Inventory Adjustments</span>
                </div>
            </nav>

            {/* ADJ TABLE */}

            <div className='container bg-primary mt-1 ml-10 align-content-end'>
                <div class="d-flex justify-content-end">
                    <button className="button bg-white text-primary mt-3 mb-3" onClick={(e) => { getReports(e) }}><b>List of Adjustments</b></button>
                </div>
            </div>

            <div className='container bg-primary ml-10 align-content-end'>
                <div className="table table-responsive">
                    <table className="table table-primary table-striped table-bordered">
                        <thead >
                            <tr>
                                <th scope="col"><u>Group Name</u></th>
                                <th scope="col"><u>Select Group</u></th>
                            </tr>
                        </thead>
                        <tbody >
                            {itemsGroupData.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{value.item_group_label}</th>
                                        <th>
                                            <button className="button bg-secondary text-white form-control-sm" onClick={(e) => { manage(e, value) }}>Adjust</button>
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default InventoryAdjustments