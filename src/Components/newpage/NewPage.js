import React from 'react';
import  './NewPage.css';



const NewPage = props => {
    const style ={
        width: '180px',
        height: '220px'
     
    }
       
   
    return (

        <div className="card-content">
        
            
           <img  style={style} src={props.pic}/>
                <h3> old price: <p  style={{textDecoration:'line-through' , 
                color:'red',display:'inline-block'}} >{props.price}$</p></h3>

            <h4 >name: {props.name}</h4>
            <h3 > disscount: {props.discount}%</h3>
            <h3 >new price: {props.riceAfterDiscount} $</h3>
            <h3 >discount amount: {props.DiscounAmou} $</h3>
          
        
        </div>

    )
}


export default NewPage;



/**
 * flex box 
 * display
 * grid 
 * 
 * 
 * 
 */