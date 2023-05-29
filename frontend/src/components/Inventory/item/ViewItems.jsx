import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar';

const ViewItems = () => {

    const [itemsData, setItemsData] = useState([]);

    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items');
            if (response && response.data.success) {
                setItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getItems()
    }, [])


    return (
        <>

            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>View Items</p>

            <div className="table-responsive mt-3">
                <table className="table table-striped table-hover table-bordered border-primary">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Dimensions</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Manufacturer</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Selling Price</th>
                            <th scope="col">cost price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Opening Stock</th>
                            <th scope="col">Reorder point</th>
                            <th scope="col">Preferred Vendor</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.item_name}</td>
                                    <td>{value.unit}</td>
                                    <td>{`${value.dimensions.length} L ${value.dimensions.width} W ${value.dimensions.height} H`}</td>
                                    <td>{value.weight}</td>
                                    <td>{value.manufacturer}</td>
                                    <td>{value.brand}</td>
                                    <td>{value.selling_price}</td>
                                    <td>{value.cost_price}</td>
                                    <td>{value.description}</td>
                                    <td>{value.opening_stock}</td>
                                    <td>{value.reorder_point}</td>
                                    <td>{value.preferred_vendor}</td>
                                    <td>
                                        {<img src={value.image_of_item}></img>}
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

export default ViewItems;