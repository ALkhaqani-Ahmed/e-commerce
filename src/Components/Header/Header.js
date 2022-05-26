import React, { useEffect,useState } from 'react';
import {Link} from 'react-router-dom';
import {CartItems} from '../../Features/ProductsReducer';
import {useSelector,useDispatch} from 'react-redux';
import {athintication , Admines ,Userinfo , userAthunticated,usersignOutOpertion} from '../../Features/UserReducer';
import {useNavigate} from 'react-router-dom';
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
    width:"100%" , height:"30px",
    backgroundColor:"red",
    position:"fixed"
   }


   useEffect(()=>{
       if(athunticationState){
        setName(Admins.username)
       }else if(userAthunticationState){
           setName(userInfoOF.name)
       }
   },[athunticationState ,userAthunticationState]);
  return(
      <div style={headerStyle}>
              <Link  to="/"> <button disabled={path === '/' ? true : false} >Home</button> </Link>
          <Link to='/Cart'>
              < button disabled={path === '/Cart' ? true : false} >Cart {CartData.length}</button>
              </Link>
              <Link to='/Login'>
              < button disabled={path === '/Login' ? true : false} > {athunticationState || userAthunticationState ? `Welcome ${name}` : "Login"}  </button>
                         { userAthunticationState &&    <button onClick={()=>dispatch(usersignOutOpertion())}> LogOut   </button>}
              

              </Link>
              <button onClick={()=>Navigation('/Search')}><span className="material-symbols-outlined">search</span></button>


      </div>
  )

}

export default Header;