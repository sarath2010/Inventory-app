import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ItemGroup = () => {

    const [item_group_label, setItemGroupLabel] = useState('');
    const [groupData, setGroupData] = useState([]);
    const navigate = useNavigate();

    const addGroup = async (e) => {
        try {
            e.preventDefault();
        const response = await axios.post('http://localhost:5000/items-group', { item_group_label });
        if (response && response.data.success) {
            alert('Item Group Added Successfully.');
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

    const home = (e) => {
        e.preventDefault();
        navigate('/',{replace:true})
    }

    useEffect(() => {
        getGroup();
    }, [])


    return (
        <>
            <button onClick={(e)=>{home(e)}}>Home</button>
            <form>
                <label><b>Item group</b></label><br/>
                <input type="text" onChange={(e) => { setItemGroupLabel(e.target.value) }} /><br/><br/>
                <button onClick={(e) => { addGroup(e) }} type='submit'>Add item group</button><br/><br/>
            </form>

            {groupData.map((value, index) => {
                return (
                    <ul><li><p key={index}>{value.item_group_label}</p></li></ul>
                )
            })}
        </>
    )
}

export default ItemGroup