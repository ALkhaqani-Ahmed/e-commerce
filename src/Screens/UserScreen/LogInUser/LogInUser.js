import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Header/Header";
import {useDispatch , useSelector} from 'react-redux';
import {getuserstate ,UserAthunticationOperation,LoginError,userAthunticated} from '../../../Features/UserReducer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


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
     
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"> 
                 <TextField  label="Email"className="input_text"placeholder="Email" type="email" onChange={event => setEmail(event.target.value)}/>
            <TextField label="password" className="input_text" placeholder="Password" type="password" onChange={event => setPassword(event.target.value)}/>
            <Button className="button_Log" onClick={LoginUserOperation} >LogIn</Button>
            
            <div>
            <Button style={{color:'gray',width:'fit-content',cursor:'pointer',backgroundColor:"#8AFF8A" , padding:5 , borderRadius:"30px",margin:"10px"}} className="signUp" onClick={() =>navigate('/SignupUser')}>SignUp if you are not</Button>

            </div>
              {ErrorMessage}
              </Box>

        </div>
        
    )

};
export default LoginUser;