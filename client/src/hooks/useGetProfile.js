import axios from "axios"
import { useEffect } from "react"
import { USER_API_END_POINT } from "../utils/config"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../redux/userSlice"

const useGetProfile = (id)=>{

    const dispatch = useDispatch()
    const {refresh} = useSelector((state)=>state.tweet)

    useEffect(()=>{

        const fetchMyProfile = async()=>{
            try{
                const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
                    withCredentials:true
                })
                // console.log(res)
                dispatch(getProfile(res?.data?.user))
            }catch(err){
                console.log(err)
            }
        }
        
        fetchMyProfile()
    },[id,refresh])
}

export default useGetProfile;