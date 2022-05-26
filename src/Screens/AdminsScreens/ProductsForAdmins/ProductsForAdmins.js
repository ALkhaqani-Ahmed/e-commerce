import React,{useEffect,useState} from 'react';
import ProductCard from '../../../Components/ProductCard/ProductCard';
import {PData} from '../../../Features/ProductsReducer';
import {getAllProudtsFromServer} from '../../../Features/ProductsReducer';
import {useDispatch ,useSelector} from 'react-redux';
import {athintication} from '../../../Features/UserReducer';
import HaederforAdmins from '../../../Components/Admins/HeaderforAdmins/HaederforAdmins';
import {useNavigate} from 'react-router-dom';
const ProductsForAdmins = props =>{

  const Products = useSelector(PData);
  const dispatch = useDispatch();
 const areYouAdmin =useSelector(athintication);
const [show , setShow] = useState(false);
const Navigatition = useNavigate();

  useEffect(() => {
  dispatch(getAllProudtsFromServer());
 }, []);



  return(

     <div>
         <HaederforAdmins/>
         <button onClick={()=>Navigatition('/Search')}>Search</button>
               
       <div className="ContinerProdcutsPages">
       {/* <button onClick={()=> dispatch(getAllProudtsFromServer())}>FetchData </button> */}
     {Products.map(elemnt =>{
          return(
               
               <ProductCard id={elemnt.id} key={elemnt.id} imgeurl={elemnt.image} name={elemnt.title}
               Admin={areYouAdmin} model={elemnt.category}  price={elemnt.price} elemnt={elemnt} ClickOnMe={()=> console.log('buy me ') }/>
          )
     }  )}
     </div>
     </div>
    
  )


}


export default ProductsForAdmins;