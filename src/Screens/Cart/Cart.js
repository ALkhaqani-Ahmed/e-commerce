import React from 'react';
import Header from '../../Components/Header/Header';
import {CartItems} from '../../Features/ProductsReducer';
import {useSelector } from "react-redux";
import ProductCard from '../../Components/ProductCard/ProductCard';

const Cart = () => {
const Data = useSelector(CartItems);

console.log(Data);



    return(
        <div>
             <Header />
             {Data.map(elemnt =>{
          return(
            <ProductCard id={elemnt.id} key={elemnt.id} imgeurl={elemnt.image} name={elemnt.title}
            model={elemnt.category} Quantity={elemnt.Quantity}  price={elemnt.price} elemnt={elemnt} ClickOnMe={()=> console.log('buy me ')} />
          )
     }  )}

       {/* {Data.map(e => {
        <p key={e.sku}>{e.name}</p>
       } )}
         */}
        </div>
    )
}

export default Cart ;