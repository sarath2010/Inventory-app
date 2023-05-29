import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar';

const ItemGroup = () => {

    const [item_group_label, setItemGroupLabel] = useState('');
    const [groupData, setGroupData] = useState([]);

    const addGroup = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/items-group', { item_group_label });
            if (response && response.data.success) {
                alert('Item Group Added Successfull !!!');
                await getGroup();
            };
        } catch (error) {
            console.error(error.message);
        }
    }

    const getGroup = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items-group');
            if (response && response.data.success) {
                setGroupData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getGroup();
    }, [])


    return (
        <>
            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Items Group</p>

            <div className="container-fluid">
                <form className='row col-sm-12 col-md-6 mx-auto'>
                    <div className='mb-3 mt-2'>
                        <label class="form-label">Item Group Name</label>
                        <input type="text" class="form-control" onChange={(e) => { setItemGroupLabel(e.target.value) }} placeholder='Enter Group Name' />
                    </div>
                    <button className='btn btn-primary w-100' onClick={(e) => { addGroup(e) }} type='submit'>Add item group</button>
                </form>

                <p className='text-center text-primary mt-4' style={{ fontSize: '21px' }}>Avaliable Items Group</p>

                <ul class="list-group col-sm-12 col-md-6 mt-4 mx-auto">
                    {
                        groupData.map((value, index) => {
                            return (
                                <li key={index} class="list-group-item">{value.item_group_label}</li>
                            )
                        })
                    }
                </ul>
            </div >
        </>
    )
}

export default ItemGroup