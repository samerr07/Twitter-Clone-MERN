import axios from "axios"
import { useEffect } from "react"
import { USER_API_END_POINT } from "../utils/config"
import { useDispatch } from "react-redux"
import { getOtherUsers, getProfile } from "../redux/userSlice"

const useOtherUser = (id)=>{

    const dispatch = useDispatch()

    useEffect(()=>{

        const fetchOtherUser = async()=>{
            try{
                const res = await axios.get(`${USER_API_END_POINT}/profile/otherUsers/${id}`,{
                    withCredentials:true
                })
                // console.log(res)
                dispatch(getOtherUsers(res?.data?.otherUsers))
            }catch(err){
                console.log(err)
            }
        }
        
        fetchOtherUser()
    },[id])
}

export default useOtherUser;