import { createSlice ,current,createAsyncThunk} from "@reduxjs/toolkit";
// import AddProduct from "../Screens/AdminsScreens/AdminDashboard/AddProduct";
import Axios from 'axios'; 

const initialState = {
    adminuser:{username:'Ali', password: '0000' , email:"admin"} ,
    users: [],
    dilevery:[],
    athinticated:false,
    errorSignup:false,
    GetuserState:false,
    Userathinticated:false,
    LoginError:false,
    userinfo:false ,
    userCommentInfo:false,
};


export const userSignUp = createAsyncThunk('user/signUp' , async(data , thunkApI)=>{

    const info ={
        name:data.name,
        email:data.email,
        password:data.password,
        phoneNumber:data.phoneNumber,
    }
   const response = await Axios.post('https://eshop-api-621e2-default-rtdb.firebaseio.com/usersInfo.json',info).then(res=>res);
   return response ;
});


export const GetallUsers = createAsyncThunk('user/GetAllUsers' , async(data , thunkApI)=>{
    const response = await Axios.get('https://eshop-api-621e2-default-rtdb.firebaseio.com/usersInfo.json').then(res=>res);
    return response 
})


export const UserReducer = createSlice ({
    name: 'UserR',
    initialState ,
    reducers:{

        getUserInfoByID:(state ,action)=>{
            const id = action.payload;
            for(let elemnt of state.users){
                if(elemnt.id === id){
                     state.userCommentInfo = elemnt.name ;
                }
            }
        },
         UserAthunticationOperation:(state , action)=>{
              const Email = action.payload.email;
              const password = action.payload.password;
              if(state.users.length === 0) return ;
              for(let elemnt of state.users){
                  if(elemnt.email === Email && elemnt.password === password){
                      state.Userathinticated = true ;
                      state.athinticated = false ;
                      state.LoginError = false ;
                      state.userinfo = elemnt;
                      break;
                  }
              }
              state.LoginError = true ;

         },
         MakeSinupErrorFalse:(state,action)=>{
                        state.errorSignup = false ;
         },
         usersignOutOpertion:(state ,action)=>{
             state.Userathinticated = false ;
         },
        athunticationOperation:(state , action)=>{
            const data = action.payload ;
            const mystate = current(state.adminuser) ;
            if(data.password === mystate.password &&   data.email === mystate.email){
                state.athinticated = true ;
                state.Userathinticated = false ;
            }else{
                state.athinticated = false ;
            }
              
         },
         SignOutOpertion:(state,action)=>{
              state.athinticated = false ;
         },
         signUpOperationFoAdmins:(state , action)=>{
             const username = action.payload.username;
             const email = action.payload.email;
             const password = action.payload.password ;


          if(state.adminuser.length === 0){
                state.adminuser.push({username , email , password});
          }else{

            const MAtch = state.adminuser.find(elemnt => {
                if(elemnt.username === username || elemnt.email === email){
                   return true;
                } 
               });

               if(!MAtch){
                      state.adminuser.push({username , email , password});
                      state.errorSignup = false;

               }else{
                     state.errorSignup = true;
               }
          }
            // logic to save the user 
         },
         
         DeleteAcount:(state, action) =>{

            const username = action.payload;

            const users = [...state.adminuser];

            let index = -1 ;

            for(let i=0 ; i < users.length ; i++){
                if(users[i].username === username){
                    index = i ;
                    break;
                }
            }
           
            if(index > - 1){
                users.splice(index, 1);
                state.adminuser=[...users];
            }
           },
           AddProduct:(state,action)=>{
               const Add = state.payload;



        
        },
           
  
         sigunUpOperationsNormalUser:(state,action)=>{
            // home work don't copy and past 
            // delete user , edite user 
         }
        
    },
    extraReducers:build=>{
        
                build.addCase(userSignUp.fulfilled , (state,action)=>{
                    state.errorSignup = "Done";

                }).addCase(userSignUp.rejected , (state , action)=>{
                    state.errorSignup = "Error";
                }).addCase(userSignUp.pending , (state, action)=>{
                    state.errorSignup = "loading";
                });

                build.addCase(GetallUsers.pending , (state,action)=>{
                    state.GetuserState = 'loading';
                }).addCase(GetallUsers.fulfilled , (state, action)=>{
                     const Data = action.payload.data ;
                     const CopyData = [];
                     for(let key in Data){
                        const user = {
                            id:key,
                            name:Data[key].name,
                            email:Data[key].email,
                            password:Data[key].password,
                            phoneNumber:Data[key].phoneNumber,
                        };
                        CopyData.push(user);
                     };

                     state.users = [...CopyData];
                     state.GetuserState = 'Done';

                     
                }).addCase(GetallUsers.rejected , (state,action)=>{
                    state.GetuserState = 'Error';
                })







    }
    
  
    
})

 export const {getUserInfoByID,MakeSinupErrorFalse,UserAthunticationOperation,usersignOutOpertion,athunticationOperation,signUpOperationFoAdmins,DeleteAcount,SignOutOpertion} =  UserReducer.actions ;
 export const athintication = state => state.UserR.athinticated;
 export const Admines = state => state.UserR.adminuser;
 export const ERRORinSignup = state => state.UserR.errorSignup;
 export const LoginError = state => state.UserR.LoginError;
 export const userAthunticated = state => state.UserR.Userathinticated;
 export const getuserstate = state => state.UserR.GetuserState;
 export const Userinfo = state => state.UserR.userinfo;
 export const UserCommentInfo = state => state.UserR.userCommentInfo;

 
export default UserReducer.reducer ;