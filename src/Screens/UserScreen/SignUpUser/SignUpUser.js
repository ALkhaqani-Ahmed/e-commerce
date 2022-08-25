import React, {useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from'react-redux';
import {userSignUp,ERRORinSignup,GetallUsers} from '../../../Features/UserReducer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SignUpuser.css';
import Header from '../../../Components/Header/Header';

const SignUpUser =()=> {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const signUpStateError = useSelector(ERRORinSignup);
    const [message , Setmssage] = useState(); 

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const SendDataToServer = () =>{
        dispatch(userSignUp({name , email , password , phoneNumber}));
        setName();
        setEmail();
        setPassword();
        setPhoneNumber();
    };




    useEffect(()=>{
        if(signUpStateError ==="Done"){
            navigate('/Login');
            dispatch(GetallUsers());
        }else if(signUpStateError === "Error"){
            Setmssage(<p style={{color:'red' , fontWeight:'bold'}}>Erorr just happen ! please try again.  </p>)
        }
    },[signUpStateError])

    return (
        <div>
            <Header />
            <Box   component="form"
      sx={{
        '& > :not(style)': { m: 4, width: '25ch' },
      }}
      noValidate
      autoComplete="off" >
                <TextField variant="standard" label="Name"  value={name} placeholder="Name" type="text" onChange={event =>setName(event.target.value)}/>
                <TextField variant="standard" label="Email"  value={email} placeholder="Email" type="email" onChange={event =>setEmail(event.target.value)}/>
                <TextField  variant="standard" label="Password" value={password} placeholder="Password" type="password" onChange={event =>setPassword(event.target.value)}/>
                <TextField  className = "Phonenumbersignup" variant="standard" label="PhoneNumber" value={phoneNumber} placeholder="PhoneNumber" type="number" onChange={event =>setPhoneNumber(event.target.value)}/>
                <Button  disabled={!(name && email && password && phoneNumber)} onClick={SendDataToServer}>SignUp</Button>
                <Button  onClick={()=>navigate ("/Login")}>Log In If you have been Signed</Button>
            </Box>
                 {message}


        </div>
    )
};

export default SignUpUser;