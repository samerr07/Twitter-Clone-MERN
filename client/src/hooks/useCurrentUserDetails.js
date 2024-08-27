import axios from "axios"
import { useEffect } from "react"
import {  USER_API_END_POINT} from "../utils/config"
import { useDispatch,useSelector } from "react-redux"
import { getUser } from "../redux/userSlice"

const useCurrentUserDetails = (id)=>{

    const dispatch = useDispatch()
    const {refresh} = useSelector((state)=>state.tweet)

    useEffect(()=>{

        const fetchCurrentDetails = async()=>{
            try{
                
                const res = await axios.get(`${USER_API_END_POINT}/getUser/${id}`,{
                    
                    withCredentials:true
                })
                // console.log(res?.data?.tweets)
                console.log(res)
                dispatch(getUser(res?.data?.user))
            }catch(err){
                console.log(err)
            }
        }
        
        fetchCurrentDetails()
    },[ refresh])
}

export default useCurrentUserDetails;