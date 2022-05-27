import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './AddProduct.css';
import {AddNewProduct,sendingStatus} from'../../../Features/ProductsReducer' ;
import {useDispatch , useSelector} from 'react-redux';




const AddProduct = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const [name , setName] = useState();
    const [description , setdescription] = useState();
    const [price , setprice] = useState();
    const [category , setcategory] = useState();
    const [imageurl , setimageurlurl] = useState();
    const [message , Setmassge] = useState();
    const sending = useSelector(sendingStatus);
    const[buttonShow ,Setbuttonshow] = useState(false);

   useEffect(()=>{
       if(sending === 'send'){
        setName('');
        setdescription('');
        setprice('');
        setcategory('');
        setimageurlurl('');
        Setmassge('your data has been send!!!');
       }else if(sending === 'Error'){
        Setmassge('your data has not  been send please try again!!!');
       }
   },[sending])

    const sendDataToServer=()=>{
        const Data ={
            category:category,
            description:description,
            image:imageurl,
            price:price,
            title:name,
            Discount:{state:false, value:0}
        };
   
        dispatch(AddNewProduct(Data));
      
    }


const listCatigories = [
    {name:'men\'s clothing' , id:1},
    {name:'women\'s clothing' , id:2},
    {name:'jewelery' , id:3},
    {name:'electronics' , id:4},

];

let butoonContnt ; 
const buttonListHandler = () => buttonShow ? Setbuttonshow(false) : Setbuttonshow(true);

const ChooseCategory = (name) =>{
    setcategory(name);
    buttonListHandler();
}

if(buttonShow){
    butoonContnt= (
        <div className="productCatigorylistContiner">
          { listCatigories.map(e => <div style={{cursor: 'pointer'}} className="productCatigoryitem" onClick={()=>ChooseCategory(e.name)} key={e.id}>{e.id}- {e.name}</div>)}
        </div>
        )
}else{
    butoonContnt = <button className="productCatigoryButton" onClick={buttonListHandler}>{category ? category : 'Select Category'}</button>
}





    return (

        <div className="ContinerAddproduct">
            <h1>pleace Enter Pruduct Details</h1>

            <input  value={name}  className="input" onChange={event => setName(event.target.value)} placeholder = "name"/>
            <input  value={description} className="input" onChange={event => setdescription(event.target.value)} placeholder = "description"/>
            <input  value={price} className="input  Numberprice" onChange={event => setprice(event.target.value)} placeholder = "price" type="number"/>
            {/* <input  value={category} className="input" onChange={event => setcategory(event.target.value)} placeholder = "category"/> */}
            {butoonContnt}
            {/* <input className="input"placeholder = "model"/> */}
            <input  value={imageurl} className="input" onChange={event => setimageurlurl(event.target.value)} placeholder ="image url"/>
            <h1 style={{color:sending === 'Error'? 'red':'green'}}>{message}</h1>
            <div>
            <button className="buttons" disabled={!(name && description && category && price && imageurl)} onClick={sendDataToServer} >Submit</button>
            <button  className="buttons" onClick = {()=>navigate("/AdminPort")}> Back to AdminPortal </button>
            </div>

        </div>

   )     
}
export default AddProduct;
