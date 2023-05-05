import { Route, Routes } from 'react-router-dom';
import './App.css';
import Item from './components/Inventory/item/Item';
import ItemGroup from './components/Inventory/itemGroup/ItemGroup';
import ViewItems from './components/Inventory/item/ViewItems';
import InventoryAdjustments from './components/Inventory/InventoryAdjustment/InventoryAdjustments';
import AdjustForm from './components/Inventory/InventoryAdjustment/AdjustForm';
import InventoryItems from './components/Inventory/InventoryAdjustment/InventoryItems';
import Reports from './components/Inventory/InventoryAdjustment/Reports';
import Home from './components/Home/Home';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/items' element={<Item />}></Route>
            <Route path='/item-groups' element={<ItemGroup />}></Route>
            <Route path='/viewitems' element={<ViewItems />} ></Route>
            <Route path='/inventoryadjustments' element={<InventoryAdjustments />}></Route>
            <Route path='/adjust-form' element={<AdjustForm />}></Route>
            <Route path='/inventory-items' element={<InventoryItems />}></Route>
            <Route path='/adjustment-reports' element={<Reports />}></Route>
        </Routes>
    );
}

export default App;
