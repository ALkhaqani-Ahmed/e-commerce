import React, { useState,useEffect } from "react";
import Header from '../Header/Header';
import { useDispatch ,useSelector } from "react-redux";
import {athunticationOperation , athintication,MakeSinupErrorFalse} from '../../Features/UserReducer';
import { useNavigate ,Link } from "react-router-dom";
import {getAllProudtsFromServer ,Massage} from '../../Features/ProductsReducer';
import './Login.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
   
   <Box component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off" style={{padding:"70px" , borderRadius:20 }}>
     <TextField label="email" placeholder="Email" type="email" onChange={event =>setEmial(event.target.value)}/> 
     <TextField label="password" placeholder="Password" type="password" onChange={event =>setPassword(event.target.value) }/> 
  <Button  onClick={()=>dispatch(athunticationOperation({email,password}))}>Login</Button>
  {/* <button disabled={path === '/SignUp' ? true : false}variant="primary">SignUp if you have not signed Up</button> */}
 
 
 <Button onClick={()=>navigation("/SignUp")} > 
SignUp if you are not</Button>
   </Box>
   </div>
 )
}

export default Login;
