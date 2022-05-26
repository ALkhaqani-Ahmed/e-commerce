import React from 'react';
import './ProductCardNewStyle.css';


const ProductCardNewStyle = props =>{

   

    return(
        <div className="product-cardContiner">
                   <div className="imageCntiner">
                            {/* image place*/}
                            <img style={{width: '100%', height: '100%' ,borderRadius: "20px"}}  src={props.pic}/>
                    </div>   
                   <div className="TextCntiner">
                         
                <p> old price: <p  style={{textDecoration:'line-through' , 
                color:'red',display:'inline-block'}} >{props.price}$</p></p>

            <p >name: {props.name}</p>
            <p > disscount: {props.discount}%</p>
            <p >new price: {props.riceAfterDiscount} $</p>
            <p >discount amount: {props.DiscounAmou} $</p>
            </div>
        </div>
    )
}

export default ProductCardNewStyle ; 