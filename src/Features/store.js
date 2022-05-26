import {configureStore} from '@reduxjs/toolkit';
import productRedcerSlice from './ProductsReducer';
import UserReducer from '../Features/UserReducer';


export default configureStore({
    reducer:{
        productsStoreSlice:productRedcerSlice,
        UserR:UserReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     // Ignore these action types
    //     ignoredActions: ['your/action/type'],
    //     // Ignore these field paths in all actions
    //     ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
    //     // Ignore these paths in the state
    //     ignoredPaths: ['items.dates'],

    //   }
    // })

});
