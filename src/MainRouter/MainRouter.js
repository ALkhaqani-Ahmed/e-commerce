

import React from 'react';

import {BrowserRouter ,Route , Routes,Navigate,useLocation} from 'react-router-dom';


import PoductsPage from '../Screens/Main/ProductsPage';
//import Product from '../Screens/Product/Product';
import Checkout from '../Screens/Checkout/Checkout';
import Cart from '../Screens/Cart/Cart';
import Login from '../Components/Login/Login';
import SignUp from '../Components/SignUp/SignUp'
import AddProduct from '../Screens/AdminsScreens/AdminDashboard/AddProduct';

import {useSelector} from'react-redux';
import {athintication } from '../Features/UserReducer';
import AdminDashboard from '../Screens/AdminsScreens/AdminDashboard/AdminDashboard';
import Page404 from '../Screens/Page404/Page404';
import ProductPage from '../Components/ProductCardUser/ProductCardUser';
import ProductsForAdmins from '../Screens/AdminsScreens/ProductsForAdmins/ProductsForAdmins';
import LoginUser from '../Screens/UserScreen/LogInUser/LogInUser';
import SignUpUser from '../Screens/UserScreen/SignUpUser/SignUpUser';
import Search from '../Screens/Search/Search';

const MainRouter = () =>{
   
   const Adminathuntication = useSelector(athintication);
  
   const AdminAthun = ({children}) =>{
      const loaction = useLocation();

      if(!Adminathuntication){
          return <Navigate to="/LoginAdmin"   state={{from:loaction}} replace/>
      }

      return children ; // jsx
   }
  
return(
    <BrowserRouter>
    <Routes>
        <Route exact  path='/'   element={<PoductsPage />} />
        <Route exact  path='/SignUp'  element={<SignUp />} />         
        <Route exact  path='/LoginAdmin' element={<Login/>} />
        <Route exact  path='/Checkout'     element={<Checkout />}/>
        <Route exact  path='/Cart'     element={<Cart />} />
        <Route exact  path='/AddProduct'     element={<AdminAthun> <AddProduct /> </AdminAthun>} />

        <Route exact  path='/AdminPort'     element={<AdminAthun><AdminDashboard /></AdminAthun>} />
        <Route exact  path='/ProductsForAdmins'     element={<AdminAthun><ProductsForAdmins /></AdminAthun>} />
        <Route   path='*'   element={<Page404 />} />
        <Route   path='/Login'   element={<LoginUser />} />
        <Route   path='/SignupUser'   element={<SignUpUser />} />
        <Route   path='/ProductPage'   element={<ProductPage />} />
        <Route   path='/Search'   element={<Search />} />
        
    </Routes>
    </BrowserRouter> 
   
)


         
       
    
}


export default MainRouter; 