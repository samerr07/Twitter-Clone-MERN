import axios from "axios"
import { useEffect } from "react"
import { TWEET_API_END_POINT } from "../utils/config"
import { useDispatch , useSelector} from "react-redux"
import { getTweets } from "../redux/tweetSllice"


const useGetAllTweets = (id)=>{

    const dispatch = useDispatch()
    const {refresh,isActive} = useSelector((state)=>state.tweet)

    const fetchAllTweets = async()=>{
        try{
            
            const res = await axios.get(`${TWEET_API_END_POINT}/getAllTweets/${id}`,{
                withCredentials:true
            })
            // console.log(res)
            dispatch(getTweets(res?.data?.tweets))
        }catch(err){
            console.log(err)
        }
    }
    
        
    

    useEffect(()=>{

        if(isActive){
            
            fetchAllTweets()
        }
        
        
    },[refresh,isActive])
}

export default useGetAllTweets;