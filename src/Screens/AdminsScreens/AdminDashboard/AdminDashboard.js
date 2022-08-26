import React from 'react';
import {useDispatch} from'react-redux';
import {SignOutOpertion} from '../../../Features/UserReducer';
import{useNavigate } from'react-router-dom';
import Header from '../../../Components/Header/Header';
import Button from '@mui/material/Button';

const AdminDashboard = () =>{
  const dispatch = useDispatch();
  const navigatte = useNavigate();
  

  return(
    <div style={{flex:1,justifyContent:"center",alignContent:"center" ,alignItems:"center" }}>
      <Header />
      <div>
          <Button variant="outlined" style={{marginRight:"12px"}}onClick={()=>dispatch(SignOutOpertion())}>Logout</Button>
          <Button variant="outlined" style={{marginRight:"12px"}}onClick={()=>navigatte("/")}>Home</Button>
          <Button variant="outlined" style={{marginRight:"12px"}}onClick={()=>navigatte("/AddProduct")}>AddNewProduct</Button>
          <Button variant="outlined" style={{marginRight:"12px"}}onClick={()=>navigatte("/ProductsForAdmins")}>products for admin</Button>
          <Button variant="outlined" style={{marginRight:"12px"}}onClick={()=>navigatte("/Search")}>search</Button>
      </div>
      </div>
  )
  

}
export default AdminDashboard ;

// add product 
// delet product 
// control all product go from to delevery