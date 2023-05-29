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

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Inventory Adjustments</p>

            <button onClick={(e) => { getReports(e) }}>Reports</button>
            <div className="table table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Group Name</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsGroupData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <th>{value.item_group_label}</th>
                                    <th>
                                        <button onClick={(e) => { manage(e, value) }}>Manage</button>
                                    </th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default InventoryAdjustments