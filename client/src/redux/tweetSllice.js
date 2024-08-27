import { createSlice} from "@reduxjs/toolkit"

const tweetSlice = createSlice({
    name: "tweet",
    initialState:{
        tweets:null,
        follwingTweets:null,
        refresh: false,
        isActive:true,
        likedTweets:null
    },
    reducers:{
        //get tweets
        getTweets:(state,action)=>{
            state.tweets = action.payload
        },
        getFollowingTweets:(state,action)=>{
            state.follwingTweets = action.payload;
        },
        getRefresh:(state)=>{
            state.refresh = !state.refresh
        },
        getIsActive:(state,action)=>{
            state.isActive = action.payload
        },
        getLikedTweets:(state,action)=>{
            state.likedTweets = action.payload
        }
    }
})

export const {getTweets,getRefresh,getIsActive,getFollowingTweets,getLikedTweets} = tweetSlice.actions;
export default tweetSlice.reducer;