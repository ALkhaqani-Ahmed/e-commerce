import React, { useState,useEffect } from "react";
import Header from '../Header/Header';
import { useDispatch ,useSelector } from "react-redux";
import {athunticationOperation , athintication,MakeSinupErrorFalse} from '../../Features/UserReducer';
import { useNavigate ,Link } from "react-router-dom";
import {getAllProudtsFromServer ,Massage} from '../../Features/ProductsReducer';
import './Login.css';
// import { Button } from 'react-bootstrap';


const  Login =()=>{
  const [password, setPassword] = useState("");
  const [email, setEmial] = useState("");
  const dispatch = useDispatch();
  const AthunticationState = useSelector(athintication);
  const navigation = useNavigate();
const mass = useSelector(Massage);
const path = window.location.pathname;
  


  useEffect(()=>{
      dispatch(getAllProudtsFromServer());
      console.log(mass);
  },[mass]);

useEffect(()=>{
  dispatch(MakeSinupErrorFalse());
},[])
  useEffect(()=>{
    if(AthunticationState) navigation("/AdminPort");
  },[AthunticationState,navigation])




 return(
   <div>
     <Header />
   
   <div style={{padding:"70px" , borderRadius:20 }}>
     <input className="buttonlog"placeholder="Email" type="email" onChange={event =>setEmial(event.target.value)}/> 
     <input className="buttonlog"placeholder="Password" type="password" onChange={event =>setPassword(event.target.value) }/> 
  <button  style={{ borderRadius:20 ,backgroundColor:'blue'}} onClick={()=>dispatch(athunticationOperation({email,password}))}>Login</button>
  {/* <button disabled={path === '/SignUp' ? true : false}variant="primary">SignUp if you have not signed Up</button> */}
 
 <Link to="/SignUp">
 <div style={{cursor: 'pointer' , borderRadius:20 ,  backgroundColor:'blue' , width:'fit-content'}} > 
 <p style={{padding:5, color:"white"}}>SignUp if you are not</p></div>

 </Link>


   </div>
   </div>
 )
}

export default Login;
