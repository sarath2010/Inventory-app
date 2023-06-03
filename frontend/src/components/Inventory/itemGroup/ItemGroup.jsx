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
                alert('Item Group Entered Successfully');
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

            {/* LABEL-ADD ITEMS-GROUP */}
            <nav class="navbar navbar-primary  bg-primary">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1 text-white">Add Item-Group</span>
                </div>
            </nav>

            {/* GROUP ADD */}

            <div className="container-fluid ">
                <form className='row col-sm-12 col-md-6 mx-auto'>
                    <div className='mb-3 mt-2 text-center'>
                        <label class="form-label mt-1"><b>Name for Item Group</b></label><br />
                        <input type="text" class="form-control mt-1 form-control-sm" onChange={(e) => { setItemGroupLabel(e.target.value) }} placeholder='Enter the name here' /><br />

                        <button className='button bg-secondary text-white w-50 form-control-sm' onClick={(e) => { addGroup(e) }} type='submit'><b>Add Group</b></button>
                    </div>
                </form>

                {/* GROUPS LIST */}

                <p className='text-center text-primary mt-4' style={{ fontSize: '21px' }}>Item-Groups List</p>

                <ul class="list-group list-group-item-primary form-control-sm col-sm-12 col-md-6 mt-4 mb-10 mx-auto ">
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