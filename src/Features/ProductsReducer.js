import { createSlice , createAsyncThunk,current } from '@reduxjs/toolkit';
import Axios from 'axios';
import Product from '../Model/ProductModel';

const initialState= {
    productsData:[
      
    ],
    CartItems:[],
    FavoriteItems:[],
    msaageBackEnd:false ,
    sendingStatus:false,
    SendingCommentState:false,
    commentss:[],
    currentRating:0,
    SearchResult:[],
    DisscountsendingState:false,

}

   export const getAllProudtsFromServer = createAsyncThunk('porducts/getall' , async(data ,thunkApI )=>{

       const response = await Axios.get('https://eshop-api-621e2-default-rtdb.firebaseio.com/products.json');
       return response ;
     
   });


   export const AddNewProduct = createAsyncThunk('products/post',async(data , thunkApI)=>{
   const response = await Axios.post('https://eshop-api-621e2-default-rtdb.firebaseio.com/products.json',data);
   return response ;
   });

   export const DeleteProductFromServer = createAsyncThunk('product/delete' ,async(productid , thunkApI)=>{
     const response = await Axios.delete(`https://eshop-api-621e2-default-rtdb.firebaseio.com/products/${productid}.json`);
     return response ;
   })


  export const AddCommentAndReting = createAsyncThunk('product/user/comment' , async(data , thunkApI)=>{

               const response = await Axios.post(`https://eshop-api-621e2-default-rtdb.firebaseio.com/Comments.json`,{Comment: data.comment , Rating:data.rating,productid:data.productid ,userid:data.userid,username:data.userName});
               return response ;
  });

  export const GetAllComments = createAsyncThunk('product/user/GetComment',async(data , thunkApI)=>{
      const response = await Axios.get('https://eshop-api-621e2-default-rtdb.firebaseio.com/Comments.json').then(res => res);
      return response ;
  });


  export const AddDiscountToProduct = createAsyncThunk('product/addDiscount' ,async(data ,thunkApI)=>{
    const response = await Axios.patch(`https://eshop-api-621e2-default-rtdb.firebaseio.com/products/${data.productid}.json`,
    {Discount:{state:data.state , value:data.value}}).then(res => res);
    return response ;
  });

  export const MakeDisccountFalseORTure = createAsyncThunk('product/editeDiscount' ,async(data , thunkApI)=>{
    const response = await Axios.patch(`https://eshop-api-621e2-default-rtdb.firebaseio.com/products/${data.productid}.json`,
    {Discount:{state:data.state,value:data.value}}).then(res => res);
    return response ;
  })


   // pending , fulifud , reject

export const productRedcerSlice = createSlice({
    name:'productsStoreSlice',

    initialState,
    reducers:{
     UpdateMyProductDataOffline:(state ,action)=>{
            const id = action.payload.id;
            const Match = state.productsData.find(e => e.id === id);
            if(!Match) return ;
            if(Match){
              const elemntCopy = {...Match};
              const Index = state.productsData.indexOf(Match);
              const NewProduct= new Product(elemntCopy.id ,
               action.payload.category ? action.payload.category:elemntCopy.category,
               action.payload.description ? action.payload.description : elemntCopy.description,
               action.payload.image ?  action.payload.image : elemntCopy.image,
               action.payload.price ? action.payload.price:elemntCopy.price,
               action.payload.title ?  action.payload.title : elemntCopy.title,
               action.payload.Discount ? action.payload.Discount : elemntCopy.Discount
              );        
              state.productsData.splice(Index ,1);
              state.productsData.push(NewProduct);
            }
     },

   IncrementQuantity:(state, action)=>{
     const Id = action.payload;
    //  const Quantity = action.payload.Quan ;
     const Match = state.CartItems.find(elemnt => elemnt.id === Id);
     const CopyProducts = [...state.CartItems];

      if(Match){
        for(let elemnt of CopyProducts){
          if( elemnt.id  === Id ){
            elemnt.Quantity =  (elemnt.Quantity || 1) +1 ;
          }
        }
        state.CartItems = [...CopyProducts];
      }     
   },
   DecremntQuantity:(state, action)=>{
     const Id = action.payload;
     const Match = state.CartItems.find(e => e.id === Id);
     const CopyProducts = [...state.CartItems];

     if(Match) {
       for(let elemnt of CopyProducts){
         if(elemnt.id === Id){
            elemnt.Quantity = elemnt.Quantity > 1 ? elemnt.Quantity-1 : elemnt.Quantity ;
         }
       }
       state.CartItems = [...CopyProducts];
     }

   },
   ProductsSearch:(state , action)=>{
       const SearchWord = action.payload;
       let MatchCase = true ; 

       for(let elemnt of state.productsData){

            for(let i = 0 ; i < SearchWord.length ;i++){
             if( SearchWord[i]   !== elemnt.title[i]){
              MatchCase = false ;
              break;
             }
            };
            if(MatchCase){
              state.SearchResult.push(elemnt);
          }
       }
                  
      },
     AddToCart:(state , action)=>{

       const id = action.payload ;
           
           // search please in item cart if the product is there don't add it
             const Match = state.CartItems.find(elemnt => elemnt.id === id );
           // if is not there add it 
           if(Match){
             return ;
           }else{
             for(let elemnt of state.productsData){
               if(elemnt.id === id){
                 const AddQuantitiy = {...elemnt, Quantity:1}
                 state.CartItems.push(AddQuantitiy);
               }
           }
           }
           },
           DeleteProduct:(state, action) =>{
            const Id = action.payload;
            const CopyProducts = [...state.CartItems];
             let index = -1 ; 
          
            for(let i=0 ; i < CopyProducts.length ; i++){
                 if(CopyProducts[i].id === Id){
                   index = i ;
                   break;
                 }
            };

            if(index > -1 ){
              CopyProducts.splice(index ,1);
              state.CartItems=[...CopyProducts];
            }
  
     },
     GetRatingofProduct:(state ,action)=>{
  
  if(state.currentRating > 4)state.currentRating = state.currentRating+1;
     }


    },
    extraReducers: build=>{
      build.addCase(getAllProudtsFromServer.pending , (state, action)=>{
        // console.log('loading');
      }).addCase(getAllProudtsFromServer.fulfilled , (state, action)=>{
         const products = action.payload.data ;
        const data =[];
        for(let key in products){
            
         const pproduct = new Product(key,products[key].category,products[key].description,
          products[key].image,products[key].price, products[key].title, products[key].Discount);
          data.push(pproduct);
        }

        state.productsData = [...data];

      });

      build.addCase(AddNewProduct.fulfilled,(state,action)=>{
        state.sendingStatus = 'send' ;
     

      }).addCase(AddNewProduct.pending,(state,action)=>{
          state.sendingStatus = 'loading...'
      }).addCase(AddNewProduct.rejected,(state,action)=>{
        state.sendingStatus = 'Error';
      });

      build.addCase(AddCommentAndReting.fulfilled ,(state,action)=>{
            state.SendingCommentState = "Done";
      

      }).addCase(AddCommentAndReting.pending , (state ,action)=>{
        state.SendingCommentState = 'Loading';
      }).addCase(AddCommentAndReting.rejected , (state ,action)=>{
        state.SendingCommentState = "Error";
      });

      build.addCase(GetAllComments.fulfilled , (state,action)=>{
        const Allcomments = action.payload.data;
        const CopyComment = [] ;
        for(let key in Allcomments) {
               let commentOb = {
                 id:key,
                 Comment:Allcomments[key].Comment,
                 Rating:Allcomments[key].Rating,
                 userid:Allcomments[key].userid,
                 productid:Allcomments[key].productid,
                 username:Allcomments[key].username,
                
               }
               CopyComment.push(commentOb);

        }
        state.commentss = [...CopyComment];
      });

      build.addCase(MakeDisccountFalseORTure.fulfilled, (state,action)=>{
          state.DisscountsendingState = true ;
      })

    }

  });    

export const {ProductsSearch,AddToCart,IncrementQuantity, DecremntQuantity, DeleteProduct,GetRatingofProduct,UpdateMyProductDataOffline} = productRedcerSlice.actions;

export const PData = state => state.productsStoreSlice.productsData ;
export const CartItems = state => state.productsStoreSlice.CartItems;
export const Massage = state => state.productsStoreSlice.msaageBackEnd;
export const sendingStatus = state => state.productsStoreSlice.sendingStatus;
export const CommentFromServer = state => state.productsStoreSlice.commentss;
export const sendingcomenntstate = state => state.productsStoreSlice.SendingCommentState ;
export const currentRating = state => state.productsStoreSlice.currentRating ;
export const SearchResult = state => state.productsStoreSlice.SearchResult ;
export const DisscountLoadingState = state => state.productsStoreSlice.DisscountsendingState;

export default productRedcerSlice.reducer;

/*

const number = ()=> 23 ;
const stringnumber = number().toString();

console.log(number());
console.log(stringnumber);
console.log(stringnumber == number());

//<button onClick={()=>console.log('ali')} ></button>

//function(){}

//const mathtry = Math.ceil(99);
//const mathtry = Math.pow(4,2);
//console.log(mathtry);
Math.pow
const mathAhmed={
  // method
  max:(x,y)=>{
     if(x > y){
       return x ;
     }else if(x < y){
       return y ;
     }else{
       return x;
     }
  },
  pow:(base , exponintion)=>{
     // 
  }
}



console.log(mathAhmed.max(8,5));
*/


// const user ={
//   username,
//   password,
//   email,
//   phone,
//   address,
//   type ,
//   offers,
//   location,
//   sales,
//   id,
//   CartItems:'',

// }