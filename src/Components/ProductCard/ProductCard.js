
// import React,{Fragment, useEffect, useState} from 'react';
// // import {Link} from 'react-router-dom';
// import './ProductCard.css';
// import {useDispatch,useSelector} from 'react-redux';
// import {AddToCart,IncrementQuantity, DecremntQuantity, DeleteProduct,DeleteProductFromServer,AddDiscountToProduct,PData,MakeDisccountFalseORTure,UpdateMyProductDataOffline} from '../../Features/ProductsReducer';
// import {Button} from 'react-bootstrap';
// import {useNavigate} from 'react-router-dom';



// const ProductCard = props =>{
//     const dispach = useDispatch();
//    const ID = props.id ;
//     const path = window.location.pathname;
//     const [ToggleDisscountState ,SetToggleDisscountState] = useState(false);
//     const navigation = useNavigate();
//     const [Value ,SetValue] = useState();
//     const [newPRice , Setnewprice] = useState();
//     const [haveDisscount ,setHaveDisscount  ] = useState();
//     const AllProducts = useSelector(PData);
//     const [MyProductInfo , setMyProductInfo] = useState();


//     useEffect(()=>{
//        const call = async()=> {

//            const Local = await  AllProducts.find(e => e.id === props.id);
//            setMyProductInfo(Local); 
//         }

//         call();
//         // dispach(UpdateMyProductDataOffline({id:props.id}));
//         console.log(MyProductInfo);

//     },[]);


//     const AddTocartHandler = () =>{
//         dispach(AddToCart(props.id));
//     }

    

// const ToggeleDiscountConntent = () =>ToggleDisscountState? SetToggleDisscountState(false): SetToggleDisscountState(true);

//     const AddDisscount =()=>{
//            dispach(AddDiscountToProduct({productid:props.id , value:Value}));
//            SetValue();
//     }


//     const makeDisccountOnOrOff = () => {
//        if(haveDisscount){
//         dispach(MakeDisccountFalseORTure({productid:props.id ,state:false}));  
//         setHaveDisscount(false)
//        }else{
//         dispach(MakeDisccountFalseORTure({productid:props.id ,state:true ,value:MyProductInfo.Discount.value}));  
//         setHaveDisscount(true)
//        }
           
        
//     }



//     let DisscountContant ; 

//     if(props.Admin){
//         DisscountContant=(
//             <Fragment>
//                    <input value={Value} type={'number'}  onChange={(e)=>SetValue(e.target.value)} placeholder='add discount amount by %'/>
//                    {Value && <button onClick={AddDisscount}>add discount</button>}
//             </Fragment>

//         )
//     }

// useEffect(()=>{

//         if(MyProductInfo.Discount){
//             const ValueDisscount = parseInt(MyProductInfo.Discount.value) ;
//             const oldPrice = parseInt(MyProductInfo.price);
//              const disscountAmount =  (ValueDisscount *oldPrice)/100;
//               const calasnewPrice = oldPrice - disscountAmount ;
//              Setnewprice(calasnewPrice);
//              setHaveDisscount(MyProductInfo.Discount.state);
//         }
    
   
// },[MyProductInfo]);
//     return(
//         <div className="productCardContiner">
//             <div  onClick={()=>navigation('/ProductPage',{state:MyProductInfo})}  className="imgeContiner">
//                    <img alt="product imge" src={MyProductInfo.image ? MyProductInfo.image : props.imgeurl } className='ProductImg' />
//             </div>
//             {haveDisscount && <p style={{backgroundColor:"red" , color:"white" , fontWeight:'bold' , width:'fit-content' , padding:"3px" , borderRadius:"25px"}}>{`Sale ${MyProductInfo.Discount.value} %`}</p>}
//             <div className='TextContiner'>
//               <p className='ProductName'>{MyProductInfo.title}</p>
//               <p className='Productmodel'>category: {MyProductInfo.category}</p>
//               {/* <p className='Productdescription'>{props.description} </p> */}
            
//             {  haveDisscount ?  <p className='Productprice' style={{textDecoration:"line-through"}}>{MyProductInfo.price} RON</p> :<p className='Productprice'>{MyProductInfo.price} RON</p>}
//             { haveDisscount && <p className='Productprice'> {newPRice} RON</p>}
//               <div >
//               {(props.Admin) && <button onClick={makeDisccountOnOrOff} >{haveDisscount? 'on' : 'off'}</button>}
//               {path === '/' ? <button onClick={AddTocartHandler} className='button'>Add to Cart</button> : null}
//               {path === '/Cart' && <p>Quantity {props.Quantity}</p> }
//               {path === '/Cart' && <button onClick={()=> dispach(IncrementQuantity(ID))} className='button'>+</button> }
//               {path === '/Cart'&& <button  onClick={()=> dispach( DecremntQuantity(ID))} className='button'>-</button> }
//               {path === '/Cart' && <Button onClick={()=> dispach(DeleteProduct(ID))} variant="danger">Delete</Button> }
//               {props.Admin && <Button onClick={()=> dispach(DeleteProductFromServer(ID))} >Delete Product From Server </Button>}
//               {DisscountContant}
//               </div>
              
               
//             </div>
            

//         </div>
//     )
// }


// export default ProductCard ;


//data base 

// datae base 
// athuntication

// add login page 
//add sigun up page 
// admin dashbord 



























































































import React,{Fragment, useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import './ProductCard.css';
import {useDispatch,useSelector} from 'react-redux';
import {AddToCart,IncrementQuantity, DisscountLoadingState,DecremntQuantity, DeleteProduct,DeleteProductFromServer,getAllProudtsFromServer,AddDiscountToProduct,MakeDisccountFalseORTure} from '../../Features/ProductsReducer';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';



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


    const AddTocartHandler = () =>{
        dispach(AddToCart(props.id));
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
            
            {  haveDisscount ?  <p className='Productprice' style={{textDecoration:"line-through"}}>{props.price} RON</p> :<p className='Productprice'>{props.price} RON</p>}
            { haveDisscount && <p className='Productprice'> {newPRice} RON</p>}
              <div >
              {(props.Admin) && <button onClick={makeDisccountOnOrOff} >{haveDisscount? 'on' : 'off'}</button>}
              {path === '/' ? <button onClick={AddTocartHandler} className='button'>Add to Cart</button> : null}
              {path === '/Cart' && <p>Quantity {props.Quantity}</p> }
              {path === '/Cart' && <button onClick={()=> dispach(IncrementQuantity(ID))} className='button'>+</button> }
              {path === '/Cart'&& <button  onClick={()=> dispach( DecremntQuantity(ID))} className='button'>-</button> }
              {path === '/Cart' && <Button onClick={()=> dispach(DeleteProduct(ID))} variant="danger">Delete</Button> }
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