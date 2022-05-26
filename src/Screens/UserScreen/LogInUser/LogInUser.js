import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Header/Header";
import {useDispatch , useSelector} from 'react-redux';
import {getuserstate ,UserAthunticationOperation,LoginError,userAthunticated} from '../../../Features/UserReducer';


const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const LoginErrorState = useSelector(LoginError);
    const userAthunticatedsate = useSelector(userAthunticated)
    let ErrorMessage ;

   const LoginUserOperation =()=>dispatch(UserAthunticationOperation({email,password}));

useEffect(()=>{
    if(LoginErrorState){
        ErrorMessage = <p style={{color: 'red',fontWeight:"bold"}}>your Email or your password is wrong please try again !!!!</p>
       };
       
},[LoginErrorState]);


 useEffect(()=>{
if(userAthunticatedsate) navigate("/");
 },[userAthunticatedsate]);
  

    return (
        <div className="Login_container">
            <Header/>
            <div style={{padding:'40px'}}>
            <input className="input_text"placeholder="Email" type="email" onChange={event => setEmail(event.target.value)}/>
            <input className="input_text" placeholder="Password" type="password" onChange={event => setPassword(event.target.value)}/>
            <button className="button_Log" onClick={LoginUserOperation} >LogIn</button>
            
            <div>
            <p style={{color:'black',width:'fit-content',cursor:'pointer',backgroundColor:"white" , padding:5 , borderRadius:"30px",margin:"10px"}} className="signUp" onClick={() =>navigate('/SignupUser')}>SignUp if you are not</p>

            </div>
              {ErrorMessage}
              </div>

        </div>
        
    )

};
export default LoginUser;