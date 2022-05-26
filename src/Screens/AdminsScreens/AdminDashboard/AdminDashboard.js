import React from 'react';

import {useDispatch} from'react-redux';
import {SignOutOpertion} from '../../../Features/UserReducer';
import{useNavigate } from'react-router-dom';


const AdminDashboard = () =>{
  const dispatch = useDispatch();
  const navigatte = useNavigate();
  

  return(
    
      <div style={{width:"100%"}}>
          admin AdminDashboard
          

          <button onClick={()=>dispatch(SignOutOpertion())}>Logout</button>
          <button onClick={()=>navigatte("/")}>Home</button>
          <button onClick={()=>navigatte("/AddProduct")}>AddNewProduct</button>
          <button onClick={()=>navigatte("/ProductsForAdmins")}>products for admin</button>
          <button onClick={()=>navigatte("/Search")}>search</button>


      </div>
  )
  

}
export default AdminDashboard ;

// add product 
// delet product 
// control all product go from to delevery