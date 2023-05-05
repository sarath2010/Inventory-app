import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const InventoryItems = () => {

    const [itemsData, setItemsData] = useState([]);
    const manageID = sessionStorage.getItem('ManageID');
    const navigate = useNavigate();

    const adjust = async (e, value) => {
        e.preventDefault();
        sessionStorage.setItem('Adjustid', value._id);
        sessionStorage.setItem('Openingstock', value.opening_stock)
        sessionStorage.setItem('Sellingprice', value.selling_price);
        sessionStorage.setItem('Itemname', value.item_name);
        navigate('/adjust-form', { replace: true });
    }

    const home = (e) => {
        e.preventDefault();
        navigate('/', { replace: true })
    }

    const inventoryAdjustment = (e) => {
        e.preventDefault();
        navigate('/inventoryadjustments', { replace: true })
    }

    useEffect(() => {

        const getItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/items/${manageID}`);
                if (response && response.data.success) {
                    setItemsData(response.data.success);
                }
            } catch (error) {
                console.error(error.message);
            }
        }

        getItems();
    }, [manageID]);


    return (
        <>
            <button onClick={(e) => { home(e) }}>Home</button>
            <button onClick={(e) => { inventoryAdjustment(e) }}>Back</button>
            <div className="table table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Dimensions</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Manufacturer</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Selling Price</th>
                            <th scope="col">Cost price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Opening Stock</th>
                            <th scope="col">Reorder point</th>
                            <th scope="col">Preferred Vendor</th>
                            <th scope="col">Image</th>
                            <th scope="col">Adjust</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <th>{value.item_name}</th>
                                    <th>{value.unit}</th>
                                    <th>{`${value.dimensions.length} L ${value.dimensions.width} W ${value.dimensions.height} H`}</th>
                                    <th>{value.weight}</th>
                                    <th>{value.manufacturer}</th>
                                    <th>{value.brand}</th>
                                    <th>{value.selling_price}</th>
                                    <th>{value.cost_price}</th>
                                    <th>{value.description}</th>
                                    <th>{value.opening_stock}</th>
                                    <th>{value.reorder_point}</th>
                                    <th>{value.preferred_vendor}</th>
                                    <th>{value.image_of_item}</th>
                                    <th>
                                        <button onClick={(e) => { adjust(e, value) }}>Adjust</button>
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

export default InventoryItems