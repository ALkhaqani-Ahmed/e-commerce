
import React,{Fragment, useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import './ProductCard.css';
import {useDispatch,useSelector} from 'react-redux';
import {AddToCart,IncrementQuantity, DisscountLoadingState,DecremntQuantity, DeleteProduct,DeleteProductFromServer,getAllProudtsFromServer,AddDiscountToProduct,MakeDisccountFalseORTure} from '../../Features/ProductsReducer';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';




const ProductCard = props =>{
    const dispach = useDispatch();
    const  DisscountStateloading = useSelector(DisscountLoadingState);
   const ID = props.id ;
    const path = window.location.pathname;
    const [ToggleDisscountState ,SetToggleDisscountState] = useState(false);
    const navigation = useNavigate();
    const [Value ,SetValue] = useState();
    const [newPRice , Setnewprice] = useState();
    const [haveDisscount ,setHaveDisscount  ] = useState();
    const [ValueDisscount , setValueDisscount] = useState();
    const [AddedTocartstate ,SetaddtocartState] = useState(false);


    const AddTocartHandler = () =>{
        dispach(AddToCart(props.id));
        SetaddtocartState(true);
    }
useEffect(()=>{
    dispach(getAllProudtsFromServer());
},[DisscountStateloading])
    

const ToggeleDiscountConntent = () =>ToggleDisscountState? SetToggleDisscountState(false): SetToggleDisscountState(true);

    const AddDisscount =()=>{
           dispach(MakeDisccountFalseORTure({productid:props.id , value:Value, state:true}));
           setHaveDisscount(true);
           setValueDisscount(Value);

    }


    const makeDisccountOnOrOff = () => {
        const disscountValue = Value ? Value : props.elemnt.Discount.value ;
       if(haveDisscount){
        dispach(MakeDisccountFalseORTure({productid:props.id ,value:disscountValue,state:false}));  
        setHaveDisscount(false);
       }else{
        dispach(MakeDisccountFalseORTure({productid:props.id ,state:true ,value:disscountValue}));  
        setHaveDisscount(true);
       }
           
        
    }

const DeleteFromCart = () => {
  dispach(DeleteProduct(ID));
  SetaddtocartState(false);
}

    let DisscountContant ; 

    if(props.Admin){
        DisscountContant=(
            <Fragment>
                   <input value={Value} type={'number'}  onChange={(e)=>SetValue(e.target.value)} placeholder='add discount amount by %'/>
                   {Value && <button onClick={AddDisscount}>add discount</button>}
            </Fragment>

        )
    }


useEffect(()=>{
        if(props.elemnt.Discount){
            setValueDisscount(Value ? Value: parseInt(props.elemnt.Discount.value)) ;
            const oldPrice = parseInt(props.price);
             const disscountAmount =  (ValueDisscount *oldPrice)/100;
              const calasnewPrice = oldPrice - disscountAmount ;
             Setnewprice(calasnewPrice);
             setHaveDisscount(props.elemnt.Discount.state);
        }
    
   
},[props.elemnt.Discount ,ValueDisscount]);

const buttonAddTocart = path === '/' ? <Button variant="contained" style={{color:"white",backgroundColor:"light-blue"}} onClick={AddTocartHandler}>Add to Cart</Button> : null;
    return(
        <div className="productCardContiner">
            <div  onClick={()=>navigation('/ProductPage',{state:props.elemnt})}  className="imgeContiner">
                   <img alt="product imge" src={props.imgeurl} className='ProductImg' />
            </div>
            {haveDisscount && <p style={{backgroundColor:"red" , color:"white" , fontWeight:'bold' , width:'fit-content' , padding:"3px" , borderRadius:"25px"}}>{`Sale ${ValueDisscount ? ValueDisscount :props.elemnt.Discount.value} %`}</p>}
            <div className='TextContiner'>
              <p className='ProductName'>{props.name}</p>
              <p className='Productmodel'>category: {props.model}</p>
              {/* <p className='Productdescription'>{props.description} </p> */}
            
            {  haveDisscount ?  <p className='Productprice' style={{color:'red',textDecoration:"line-through"}}>{props.price} RON</p> :<p className='Productprice'>{props.price} RON</p>}
            { haveDisscount && <p className='Productprice' > {newPRice} RON</p>}
              <div >
              {(props.Admin) && <Button onClick={makeDisccountOnOrOff} >{haveDisscount? 'on' : 'off'}</Button>}
              {!AddedTocartstate ? buttonAddTocart: <Button variant="contained"onClick={DeleteFromCart} >Delete from cart</Button>  }
              {path === '/Cart' && <p>Quantity {props.Quantity}</p> }
              {path === '/Cart' && <Button variant="contained"onClick={()=> dispach(IncrementQuantity(ID))} >+</Button> }
              {path === '/Cart'&& <Button  variant="contained"onClick={()=> dispach( DecremntQuantity(ID))} >-</Button> }
              {path === '/Cart' && <Button variant="contained"onClick={()=> dispach(DeleteProduct(ID))} >Delete</Button> }
              {props.Admin && <Button onClick={()=> dispach(DeleteProductFromServer(ID))} >Delete Product From Server </Button>}
              {DisscountContant}
              </div>
              
               
            </div>
            

        </div>
    )
}


export default ProductCard ;


// //data base 

// // datae base 
// // athuntication

// // add login page 
// //add sigun up page 
// // admin dashbord 