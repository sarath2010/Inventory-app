import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const PurchaseOrders = () => {

    const [itemsGroupData, setItemsGroupData] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [vendorsData, setVendorsData] = useState([]);

    const randomNum = Math.floor(Math.random() * 10000000000); // generate a random number between 0 and 999999
    const purchase_order_id = String(randomNum).padStart(10, '0'); // convert the number to a string and add leading zeros if necessary
    const [item_group, setItemGroup] = useState('');
    const [item_group_id, setItemGroupId] = useState('');
    const [item_name, setItemName] = useState('');
    const [item_id, setItemId] = useState('');
    const [cost_price, setCostPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [vendors, setVendors] = useState('');
    const total_price = cost_price * quantity;
    const [vendors_name, setVendorsName] = useState('');
    const [vendors_email, setVendorsEmail] = useState('');
    const [vendors_phone_number, setvendorsPhoneNumber] = useState('');
    const [payment_terms, setPaymentTerms] = useState('');
    const navigate = useNavigate();

    const purchase = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/purchaseorders', {
            item_group,
            item: item_name,
            order_quantity: quantity,
            date: new Date(),
            amount: cost_price,
            status: "Order Issued",
            purchase_order_id,
            vendors_name,
            vendors_email,
            vendors_phone_number,
            payment_terms,
            item_id
        });
        if (response && response.data.success) {
            alert('Purchase Successfully !!!');
            setItemGroup('');
            setItemGroupId('')
            setItemName();
            setItemId('');
            setCostPrice('');
            setQuantity('');
            setVendors('');
            setVendorsName('')
            setVendorsEmail('')
            setvendorsPhoneNumber('')
            setPaymentTerms('');
            navigate('/viewpurchase', { replace: true })
        }
    }

    const handleItemsChange = async (e) => {
        const selectedItems = itemsData.find(items => items._id === e.target.value);
        setItemName(selectedItems.item_name);
        setItemId(selectedItems._id);
        setCostPrice(selectedItems.cost_price);
    };

    const goToPurchaseList = () => {
        navigate('/viewpurchase', { replace: true })
    }

    const handleItemsGroupChange = async (e) => {
        const selectedGroup = itemsGroupData.find(itemsGroup => itemsGroup._id === e.target.value);
        setItemGroup(selectedGroup.item_group_label);
        setItemGroupId(selectedGroup._id);
        getAllItems(selectedGroup._id);
        setItemName('');
        setItemId('')
    };

    const getAllItems = async (id) => {
        const response = await axios.get(`http://localhost:5000/items/${id}`);
        if (response && response.data.success) {
            setItemsData(response.data.success);
        }
    };

    const getItemsGroup = async () => {
        const response = await axios.get('http://localhost:5000/items-group');
        if (response && response.data.success) {
            setItemsGroupData(response.data.success);
        }
    };

    const getVendors = async () => {
        const response = await axios.get('http://localhost:5000/vendors');
        if (response && response.data.success) {
            setVendorsData(response.data.success);
        }
    }

    const handleVendorsSelection = async (e) => {
        e.preventDefault();
        const selectedVendors = vendorsData.find(items => items._id === e.target.value);
        setVendorsName(selectedVendors.name);
        setVendorsEmail(selectedVendors.email);
        setvendorsPhoneNumber(selectedVendors.phone_number);
        setPaymentTerms(selectedVendors.payment_terms)
    }

    useEffect(() => {
        getItemsGroup();
        getVendors();
    }, [])

    return (
        <>

            <Navbar />

            <p className='text-center text-primary' style={{ fontSize: '21px' }}>Purchase Orders</p>

            <button onClick={goToPurchaseList}>Purchase List</button>

            <label>Items Group</label>
            <select className="form-select" value={item_group_id} onChange={handleItemsGroupChange}>
                <option value="" disabled={true}>Select Group</option>
                {itemsGroupData.map((item, index) => {
                    return (
                        <option key={index} value={item._id}>{item.item_group_label}</option>
                    )
                })}
            </select>

            <label>Items</label>
            <select className="form-select" value={item_id} onChange={handleItemsChange}>
                <option value="" disabled={true}>Select Item</option>
                {itemsData.map((item, index) => {
                    return (
                        <option key={index} value={item._id}>{item.item_name}</option>
                    )
                })}
            </select>

            <label>Item Group</label>
            <input className='form-control' disabled={true} defaultValue={item_group} />

            <label>Item Name</label>
            <input className='form-control' disabled={true} defaultValue={item_name} />

            <label>Cost Price</label>
            <input className='form-control' disabled={true} defaultValue={cost_price} />

            <label>Vendor Selection</label>
            <select className="form-select" value={vendors} onChange={handleVendorsSelection}>
                <option value="" disabled={true}>--Select--</option>
                {vendorsData.map((item, index) => {
                    return (
                        <option key={index} value={item._id}>{item.name}</option>
                    )
                })}
            </select>

            <label>Vendor Name</label>
            <input className='form-control' disabled={true} defaultValue={vendors_name} />

            <label>Vendor Email</label>
            <input className='form-control' disabled={true} defaultValue={vendors_email} />

            <label>Vendor Address</label>
            <input className='form-control' disabled={true} defaultValue={vendors_phone_number} />

            <label>Payment Terms</label>
            <input type='number' className='form-control' disabled={true} defaultValue={payment_terms} />

            <label>Quantity to Purchase</label>
            <input type='number' className='form-control' value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />

            <label>Total Price</label>
            <input className='form-control' disabled={true} value={total_price} />

            <button onClick={(e) => { purchase(e) }}>Purchase</button>
        </>
    )
}

export default PurchaseOrders