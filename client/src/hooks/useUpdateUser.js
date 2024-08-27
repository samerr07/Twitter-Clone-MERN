

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/config";
import { useEffect } from "react";


const useUpdateUser = () => {
  
  const { user } = useSelector((state) => state.user);
  const {refresh} = useSelector((state)=>state.tweet)

  
    const updateUser = async (formData) => {
      console.log(formData)
      try {
        const res = await axios.put(
          `${USER_API_END_POINT}/updateUser`,
          { ...formData, id: user?._id },
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
        }
      } catch (err) {
        console.log(err);
      }
      
    };
  

  return updateUser;
};

export default useUpdateUser;


