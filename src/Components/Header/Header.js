import React, { useEffect,useState } from 'react';
import {Link} from 'react-router-dom';
import {CartItems} from '../../Features/ProductsReducer';
import {useSelector,useDispatch} from 'react-redux';
import {athintication , Admines ,Userinfo , userAthunticated,usersignOutOpertion} from '../../Features/UserReducer';
import {useNavigate} from 'react-router-dom';
import imageBacgroundheder from '../../assest/pexels-alexandra-maria-318236.jpg';
import IamgeCart from '../../assest/pexels-ksenia-chernaya-3965548.jpg';
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

   const headerStyle = {
    width:"100%" , height:"100vh",
    background:`linear-gradient(to bottom ,rgba(0, 0, 0, 0.6) , rgba(0, 0, 0, 0.6)),url(${path === "/Cart" ? IamgeCart:imageBacgroundheder})`,
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
};


   useEffect(()=>{
       if(athunticationState){
        setName(Admins.username)
       }else if(userAthunticationState){
           setName(userInfoOF.name)
       }
   },[athunticationState ,userAthunticationState]);
  return(
      <div style={headerStyle}>
          <div style={{display:'flex' , justifyContent:'space-between',paddingTop:'10px',paddingRight:'10px',paddingLeft:'10px'}}>
          <div >
                    <button  onClick={()=>Navigation('/')} style={{...buttonStyle , color:path === '/'? "yellow":'white'}} disabled={path === '/' ? true : false} >Home</button> 
                  <button onClick={()=>Navigation('/Cart')}  style={{...buttonStyle , color:path === '/Cart'? "yellow":'white'}} disabled={path === '/Cart' ? true : false} >Cart {CartData.length}</button>

                 </div> 
                  
              <div style={{display:'flex'}} >
              < button  onClick={()=>Navigation('/Login')}  style={{...buttonStyle , color:path === '/Login'? "yellow":'white'}} disabled={path === '/Login' ? true : false} > {athunticationState || userAthunticationState ? `Welcome ${name}` : "Login"}  </button>

                         { userAthunticationState &&    <button style={buttonStyle} onClick={()=>dispatch(usersignOutOpertion())}> LogOut   </button>}

              <button   style={{...buttonStyle, backgroundColor:'white',border:'none', borderRadius:'30px',width:"200px",display:'flex' }} onClick={()=>Navigation('/Search')}><span className="material-symbols-outlined">search</span></button>

              </div>

              

          </div>
            

      </div>
  )

}

export default Header;