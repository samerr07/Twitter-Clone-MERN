import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {
    
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
import userSlice from "./userSlice";
import tweetSllice from "./tweetSllice";


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const rootReducer = combineReducers({
    user : userSlice,
    tweet: tweetSllice
})
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

// const store  = configureStore({
//     reducer: {
//         user : userSlice,
//         tweet: tweetSllice
//     }
// });

export default store;