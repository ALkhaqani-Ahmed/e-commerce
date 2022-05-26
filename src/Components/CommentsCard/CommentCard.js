import React from 'react';
import './CommentsCard.css';
import ReactStars from "react-rating-stars-component";

const CommentCard = props =>{
 



   return(
       <div className='CommentCard'>
           <p style={{fontWeight:'bold'}}>{props.username}</p>
           <p>{props.Comment}</p>
           <div style={{ display:"flex", flexDirection:'row-reverse' , justifyContent: 'space-between'}}>
           <p  className='TimeAgoComments' style={{color:'gray' }}>{props.time}</p>
           <ReactStars edit={false} value={props.Rating} />

           </div>
       </div>
   )

}

export default CommentCard ;