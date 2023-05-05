import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';

const Home = () => {

    const navigate = useNavigate();

    const Home = (e) => {
        e.preventDefault();
        navigate('/', { replace: true });
    }

    const itemsGroup = (e) => {
        e.preventDefault();
        navigate('/item-groups',{replace:true});
    }

    const items = (e) => {
        e.preventDefault();
        navigate('/viewitems', { replace: true });
    }

    const inventoryAdjustment = (e) => {
        e.preventDefault();
        navigate('/inventoryadjustments', { replace: true })
    };

    const addItems = (e) => {
        e.preventDefault();
        navigate('/items', { replace: true })
    };

    return (
        <>
            <div className='home-buttons'>
            <button className='button-home' onClick={(e) => { Home(e) }}>Home</button><br/>
            <button className='button-home' onClick={(e) => { items(e) }}>View All Items</button><br/>
            <button className='button-home' onClick={(e) => { addItems(e) }}>Add Items</button><br/>
            <button className='button-home' onClick={(e) => { itemsGroup(e) }}>Items-Group</button><br/>
            <button className='button-home' onClick={(e) => { inventoryAdjustment(e) }}>Inventory Adjustments</button><br/>
            </div>
        </>
    )
}

export default Home