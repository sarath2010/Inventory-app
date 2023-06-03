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
import AddCustomers from './components/Sales/AddCustomers';
import UpdateCustomer from './components/Sales/UpdateCustomer';
import SalesOrders from './components/Sales/SalesOrders';
import OrdersList from './components/Sales/OrdersList';
import Packages from './components/Sales/Packages';
import DeliveryChallans from './components/Sales/DeliveryChallans';
import GenerateChallans from './components/Sales/GenerateChallans';
import Invoice from './components/Sales/Invoice';
import GenerateInvoice from './components/Sales/GenerateInvoice';
import Payments from './components/Sales/Payments';
import ViewPayments from './components/Sales/ViewPayments';
import SalesReturn from './components/Sales/SalesReturn';
import ReturnForm from './components/Sales/ReturnForm';
import ViewReturns from './components/Sales/ViewReturns';
import CreditNotes from './components/Sales/CreditNotes';
import Vendors from './components/Purchase/Vendors';
import UpdateVendors from './components/Purchase/UpdateVendors';
import PurchaseOrders from './components/Purchase/PurchaseOrders';
import ViewPurchaseOrders from './components/Purchase/ViewPurchaseOrders';
import BillPayments from './components/Purchase/BillPayments';
import BillAndPaymentsPage from './components/Purchase/BillAndPaymentsPage';
import VendorCredits from './components/Purchase/VendorCredits';


function App() {
    return (
        <Routes>
            {/* inventory */}
            <Route path='/' element={<Home />}></Route>
            <Route path='/items' element={<Item />}></Route>
            <Route path='/item-groups' element={<ItemGroup />}></Route>
            <Route path='/viewitems' element={<ViewItems />} ></Route>
            <Route path='/inventoryadjustments' element={<InventoryAdjustments />}></Route>
            <Route path='/adjust-form' element={<AdjustForm />}></Route>
            <Route path='/inventory-items' element={<InventoryItems />}></Route>
            <Route path='/adjustment-reports' element={<Reports />}></Route>
            {/* inventory */}
            {/* Sales */}
            <Route path='/addcustomer' element={<AddCustomers />}></Route>
            <Route path='/update/customer' element={<UpdateCustomer />}></Route>
            <Route path='/sales' element={<SalesOrders />}></Route>
            <Route path='/orderslist' element={<OrdersList />}></Route>
            <Route path='/packages' element={<Packages />}></Route>
            <Route path='/deliverychallans' element={<DeliveryChallans />}></Route>
            <Route path='/generatechallans' element={<GenerateChallans />}></Route>
            <Route path='/invoice' element={<Invoice />}></Route>
            <Route path='/generateinvoice' element={<GenerateInvoice />}></Route>
            <Route path='/payments' element={<Payments />}></Route>
            <Route path='/viewpayments' element={<ViewPayments />}></Route>
            <Route path='/salesreturn' element={<SalesReturn />}></Route>
            <Route path='/return' element={<ReturnForm />}></Route>
            <Route path='/viewreturn' element={<ViewReturns />}></Route>
            <Route path='/creditnotes' element={<CreditNotes />}></Route>
            <Route path='/vendors' element={<Vendors />}></Route>
            <Route path='/update/vendors' element={<UpdateVendors />}></Route>
            <Route path='/purchaseorders' element={<PurchaseOrders />}></Route>
            <Route path='/viewpurchase' element={<ViewPurchaseOrders />}></Route>
            <Route path='billpayments' element={<BillPayments />}></Route>
            <Route path='billandpayments' element={<BillAndPaymentsPage />}></Route>
            <Route path='/vendorscredit' element={<VendorCredits />}></Route>
            </Routes>
            
    );
}

export default App;
