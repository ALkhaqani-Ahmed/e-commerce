import React, { useEffect,useState , Fragment} from 'react';
import {Link} from 'react-router-dom';
import {CartItems} from '../../Features/ProductsReducer';
import {useSelector,useDispatch} from 'react-redux';
import {athintication , Admines ,Userinfo , userAthunticated,usersignOutOpertion} from '../../Features/UserReducer';
import {useNavigate} from 'react-router-dom';
import imageBacgroundheder from '../../assest/pexels-alexandra-maria-318236.jpg';
import IamgeCart from '../../assest/pexels-ksenia-chernaya-3965548.jpg';
import Login from '../../assest/login.jpg';
import SignupImage from "../../assest/signup.jpg";
import Admin from '../../assest/Admin.jpg';

const Header =()=> {

const CartData = useSelector(CartItems);
const athunticationState = useSelector(athintication);
const userAthunticationState = useSelector(userAthunticated);
const [name , setName] = useState();
const Admins = useSelector(Admines);
const userInfoOF = useSelector(Userinfo);
const path = window.location.pathname;
const dispatch = useDispatch();
const Navigation = useNavigate();


let bvackground ;

 if(path === "/Cart"){
bvackground =IamgeCart;
 }else if(path === "/Login"){
bvackground = Login ;
 }else if(path === "/SignupUser"){
    bvackground = SignupImage ;
 }if(path === '/AdminPort' || path === "/LoginAdmin"){
bvackground = Admin ;
 }else{
bvackground = imageBacgroundheder;
 }


   const headerStyle = {
    width:"100%" , height:"100vh",
    background:`linear-gradient(to bottom ,rgba(0, 0, 0, 0.7) , rgba(0, 0, 0, 0.7)),url(${bvackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    // borderRadius:"0 0 10% 10%" , 
    clipPath: 'polygon(0 0, 100% 0%, 100% 99%, 0 67%)',
    
   }
const buttonStyle = {
    outline: "none",
    background:'none',
    border:"none", 
    fontWeight:'bold',
    color:'black'
};


  const buttonsIntheHeaders = (
    <div style={{display:'flex' , justifyContent:'space-between',paddingTop:'10px',paddingRight:'10px',paddingLeft:'10px'}}>
    <div >
              <button  onClick={()=>Navigation('/')} style={{...buttonStyle , color:path === '/'? "yellow":'white'}} disabled={path === '/' ? true : false} >
              <span class="material-symbols-outlined">
home_app_logo
</span></button> 
            <button onClick={()=>Navigation('/Cart')}  style={{...buttonStyle , color:path === '/Cart'? "yellow":'white'}} disabled={path === '/Cart' ? true : false} >
            <span class="material-symbols-outlined">
shopping_cart
</span> {CartData.length}</button>

           </div> 
            
        <div style={{display:'flex'}} >
        < button  onClick={()=>Navigation('/Login')}  style={{...buttonStyle , color:path === '/Login'? "yellow":'white'}} disabled={path === '/Login' ? true : false} > {athunticationState || userAthunticationState ? `Welcome ${name}` : "Login"}  </button>

                   { userAthunticationState &&    <button style={buttonStyle} onClick={()=>dispatch(usersignOutOpertion())}> LogOut   </button>}

{ path === "/Search" ? null :<button   style={{...buttonStyle, backgroundColor:'white',border:'none', borderRadius:'30px',width:"200px",display:'flex' }} onClick={()=>Navigation('/Search')}><span className="material-symbols-outlined">search</span></button>}

        </div>
        </div>
  )


  const SimpleHeader = (
    <div style={{height:"50px" , backgroundColor:'gray',position:path === "/Search"?"relative":"fixed",width:'100%'}}>
    {buttonsIntheHeaders} 
</div>
  );


  const FullHeader = (
    <div style={headerStyle}>
    {buttonsIntheHeaders} 
{ (path === "/AdminPort" || path === "/LoginAdmin" ) ? <h1 style={{marginTop:"15%" ,textAlign:"center", fontWeight:'bold',fontSize:"5rem",color:'white'}}>Welcome Admin</h1>: <h1 style={{marginTop:"15%" ,textAlign:"center", fontWeight:'bold',fontSize:"5rem",color:'white'}}>{path === '/Login' || path === "/SignupUser"?null:"E Shope" }</h1>
}     </div>
  )

   useEffect(()=>{
       if(athunticationState){
        setName(Admins.username)
       }else if(userAthunticationState){
           setName(userInfoOF.name)
       }
   },[athunticationState ,userAthunticationState]);

   let headerContient ;

   if(path === '/Cart' || path === '/Login' || path === '/'){
      headerContient = FullHeader ;
   }else if(path === '/ProductPage' || path === '/Search'){
   headerContient = SimpleHeader ; 
   }else{
    headerContient = FullHeader ;   }

  return headerContient

}

export default Header;