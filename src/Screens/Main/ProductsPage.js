import React,{useEffect,useState} from 'react';
import ProductCard from '../../Components/ProductCard/ProductCard';
import {PData} from '../../Features/ProductsReducer';
import Header from '../../Components/Header/Header';
import {getAllProudtsFromServer,GetAllComments} from '../../Features/ProductsReducer';
import {GetallUsers} from '../../Features/UserReducer';
import {useDispatch , useSelector} from 'react-redux';
import './ProductsPage.css';
const PoductsPage = props =>{

  const Products = useSelector(PData);
  const dispatch = useDispatch();
  
 

  useEffect(() => {
  dispatch(getAllProudtsFromServer());
  dispatch(GetAllComments());
  dispatch(GetallUsers());

 }, []);

console.log(Products);


  return(

     <div >
         

          <Header />
       <div className="ContinerProdcutsPages">
       {/* <button onClick={()=> dispatch(getAllProudtsFromServer())}>FetchData </button> */}
     {Products.map(elemnt =>{
          return(
               
               <ProductCard id={elemnt.id} key={elemnt.id} imgeurl={elemnt.image} name={elemnt.title}
               model={elemnt.category}  price={elemnt.price} elemnt={elemnt} ClickOnMe={()=> console.log('buy me ')} />
          )
     }  )}
     </div>
     </div>
    
  )


}


export default PoductsPage;