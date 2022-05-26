import React,{useState,useEffect,Fragment} from "react";
import Header from "../Header/Header";
import  './ProductCardUser.css';
import { useDispatch , useSelector } from "react-redux";
import { AddToCart ,AddCommentAndReting,CommentFromServer,GetAllComments,sendingcomenntstate,DeleteProductFromServer} from "../../Features/ProductsReducer";
import {useLocation} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReactTimeAgo from 'react-time-ago';
import {Userinfo ,GetallUsers,athintication} from '../../Features/UserReducer';
import Rating from '@prontopro/react-rating';
import CommentCard  from '../../Components/CommentsCard/CommentCard';




const ProductPage = props => {

   const dispatch = useDispatch();
   const location =useLocation();
   const [commentNow , Setcomment] = useState();
   const [Ratinging , Setrating] = useState(0);
   const AllCommenstFromServer = useSelector(CommentFromServer);
   const commentsndingstate = useSelector(sendingcomenntstate);
   const [ShowComments , SetShowComments]= useState([]);
   const [RatingNumbers , SetRatingNumbers] = useState(1);
   const userInformation = useSelector(Userinfo);
   const areYouAdmin =useSelector(athintication);

 useEffect(()=>{
     dispatch(GetallUsers());
 },[]);

useEffect(()=>{
      dispatch(GetAllComments());
},[commentsndingstate]);

useEffect(()=>{
    const filterdata = [] ;
    for (let e of AllCommenstFromServer){
        if(e.productid === location.state.id ){
            filterdata.push(e);    
        }
    }
   SetShowComments([...filterdata]);
},[AllCommenstFromServer]);



let shoCommentsData ;


if(ShowComments.length !==0){
    shoCommentsData =(
        
            ShowComments.map((e,index )=>{

return(
//    <div key={index}>
//        <p>{e.Comment.value}</p>
//        <ReactTimeAgo date={Date.parse(e.Comment.date)} locale="en-US"/>
//        <p>{e.Rating}</p>
//    </div>

<CommentCard key={index} Comment={e.Comment.value} time={<ReactTimeAgo date={Date.parse(e.Comment.date)} locale="en-US"/>}  Rating={e.Rating}   userid={e.userid} username={e.username ? e.username : 'no name'}/>
)
})
    )
}else{
    shoCommentsData = <h3>no comments for this product yet....</h3>
};


useEffect(()=>{
    let TotalRatingNumber = 0;
    for(let elemnt of ShowComments){
        TotalRatingNumber = elemnt.Rating + TotalRatingNumber;
    }
    SetRatingNumbers(TotalRatingNumber);     
},[ShowComments])


// useEffect(()=>{
//     const getThValueOut = () => {
//         props.getTheValueOFRating(((RatingNumbers)/(ShowComments.length*5))*5);
//     }
//     getThValueOut();

// },[RatingNumbers,ShowComments]);

let RatinAndCommentTextinput , CommentButton ; 



if(commentNow && Ratinging){

CommentButton =(
<button onClick={()=>{
            dispatch(AddCommentAndReting({ productid:location.state.id , 
              userid:userInformation.id,userName:userInformation.name,comment:{value:commentNow , date:new Date()},rating:Ratinging }));
              Setcomment('');
                }    
                    }>Add a Comment</button>
)
                }

   if(userInformation){

         RatinAndCommentTextinput=(
            <Fragment>
           <ReactStars
           value={RatingNumbers}
                 count={5}
                onChange={e => Setrating(e)}
                size={24}
              activeColor="#ffd700"/>
              <textarea value={commentNow} onChange={e => Setcomment(e.target.value)} style={{resize:"none" , width:"400px"}} placeholder="Write your comments here ......."  />
              </Fragment>
    
         )

       }else{
    RatinAndCommentTextinput=<p style={{color:'gray' , fontWeight:'bold'}}>please login to add comment.....</p>
   }
   


    return (
        
        <div className="productCardUsercontainer" >
            <Header/>
            <div className="ContinerProductPage"> 

            <div className="imgCardUsercontainer">
                <img style={{width: "100%", height: "100%"}} src={location.state.image}/>
            </div>
                <Rating
                   animateOnHover
                   disableAnimation
                   initialRate={((RatingNumbers)/(ShowComments.length*5))*5 }
                   stop={5}
                   readonly
                   
                 />
  
            <div className="TextCardUsercontainer">
                <p className="productName">{location.state.title}</p>
                <p className="productCategory">{location.state.category}</p>
                <p >{location.state.description}</p>
                <p className="productPrice">{location.state.price} RON</p>
            </div>
            
            <button onClick={()=>dispatch(AddToCart(location.state.id))}> Add to Cart</button>
          {areYouAdmin && <button onClick={()=> dispatch(DeleteProductFromServer(location.state.id))} >Delete Product From Server </button>}
        
       
  
  
           
           </div>
           {shoCommentsData }
           
           <div className="CommentsFroProductByuser">

     

              {RatinAndCommentTextinput}
              {CommentButton}
    

            </div>

{areYouAdmin && <h1>you are admin</h1>}
        </div>
    )
}

export default ProductPage ;