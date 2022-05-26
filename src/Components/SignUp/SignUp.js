
import React, { useState } from 'react';
import {  signUpOperationFoAdmins,ERRORinSignup, DeleteAcount,Admines } from '../../Features/UserReducer'; 
import { useSelector, useDispatch } from 'react-redux';
 
import './Signup.css';

const SignUp =()=> {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const errorinsignup = useSelector(ERRORinSignup);
    // const AdmiensData = useSelector(Admines);
    const dispatch = useDispatch();
   
//    console.log(AdmiensData);
    return (
    <div>
        <div className='ContinerSignup' >
         <input className="inputSignup" placeholder="Name" type="name" onChange={event =>setName(event.target.value)}/>
         <input className="inputSignup" placeholder="Email" type="email" onChange={event =>setEmail(event.target.value)}/>
         <input className="inputSignup" placeholder="Password" type="password" onChange={event =>setPassword(event.target.value)}/>
         <button className='SignupButton' onClick={()=> dispatch(signUpOperationFoAdmins({username:name , email , password}))}><p>Signup!</p></button>
         { errorinsignup &&  <p style={{color:"red",fontWeight:'bold'  }}>this userName or Email is Already exicite</p>}
         <button  className='SignupButton' onClick={()=> dispatch(DeleteAcount(name))} > undo sign up! </button>

         </div>

       
    </div>

    )
}

export default SignUp;