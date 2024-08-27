import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/config";
import { getRefresh } from "../redux/tweetSllice";
import { useState } from "react";



const useUpdateImage = () => {
  
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

 
    const updateImage = async ({coverImg,profileImg}) => {
      
        try {
          setLoading(true)
          const res = await axios.put(
            `${USER_API_END_POINT}/updateUserImage`,
            { coverImg,profileImg, id: user?._id },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          
    
          if (res.data.success) {
            // dispatch(getUser(res.data.user));
            console.log(res)
            setLoading(false)
            dispatch(getRefresh())
          }
        } catch (err) {
          console.log(err);
          setLoading(false)
        }
      };
      

  return updateImage;
};

export default useUpdateImage;
