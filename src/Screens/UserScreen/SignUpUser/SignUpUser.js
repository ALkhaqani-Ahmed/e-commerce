import React, {useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from'react-redux';
import {userSignUp,ERRORinSignup,GetallUsers} from '../../../Features/UserReducer';

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
        <div >
            <div className="SignUpUserContainer">
                <input  value={name} className="input_Signup"placeholder="Name" type="text" onChange={event =>setName(event.target.value)}/>
                <input  value={email} className="input_Signup"placeholder="Email" type="email" onChange={event =>setEmail(event.target.value)}/>
                <input  value={password} className="input_Signup"placeholder="Password" type="password" onChange={event =>setPassword(event.target.value)}/>
                <input  value={phoneNumber} className="input_Signup"placeholder="PhoneNumber" type="number" onChange={event =>setPhoneNumber(event.target.value)}/>
                <button className="SignUpButton" disabled={!(name && email && password && phoneNumber)} onClick={SendDataToServer}>SignUp</button>
                <p className="LoginBPageButton" onClick={()=>navigate ("/Login")}>Log In If you have been Signed</p>
            </div>
                 {message}


        </div>
    )
};

export default SignUpUser;