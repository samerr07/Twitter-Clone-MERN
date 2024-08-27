import axios from "axios"
import { useEffect } from "react"
import { TWEET_API_END_POINT} from "../utils/config"
import { useDispatch,useSelector } from "react-redux"
import {  getLikedTweets } from "../redux/tweetSllice"


const useGetFollowingTweets = (id)=>{

    const dispatch = useDispatch()
    const {refresh,isActive} = useSelector((state)=>state.tweet)

    useEffect(()=>{

        const fetchLikedTweets = async()=>{
            try{
                
                const res = await axios.get(`${TWEET_API_END_POINT}/getLikedTweets/${id}`,{
                    withCredentials:true
                })
                // console.log(res?.data?.tweets)
                // console.log(res)
                dispatch(getLikedTweets(res?.data?.likedPosts))
            }catch(err){
                console.log(err)
            }
        }
        
        fetchLikedTweets()
    },[ refresh])
}

export default useGetFollowingTweets;