import axios from "axios"
import { useEffect } from "react"
import { TWEET_API_END_POINT} from "../utils/config"
import { useDispatch,useSelector } from "react-redux"
import { getFollowingTweets } from "../redux/tweetSllice"


const useGetFollowingTweets = (id)=>{

    const dispatch = useDispatch()
    const {refresh,isActive} = useSelector((state)=>state.tweet)

    useEffect(()=>{

        const fetchFollowingTweets = async()=>{
            try{
                
                const res = await axios.get(`${TWEET_API_END_POINT}/getFollowingTweets/${id}`,{
                    withCredentials:true
                })
                // console.log(res?.data?.tweets)
                // console.log(res)
                dispatch(getFollowingTweets(res?.data?.tweets))
            }catch(err){
                console.log(err)
            }
        }
        
        fetchFollowingTweets()
    },[isActive, refresh])
}

export default useGetFollowingTweets;