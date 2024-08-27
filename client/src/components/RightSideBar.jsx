import React from 'react'
import Avatar from 'react-avatar';
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';


const RightSideBar = ({otherUsers}) => {
  return (
    <div className='lg:w-[25%] hidden md:hidden lg:block'>
      <div className='flex mt-2 items-center bg-gray-100 w-full outline-none rounded-full p-3'>
        <CiSearch className='cursor-pointer' size={24}/>
        <input type="text" placeholder='Search' className='bg-gray-100 outline-none px-2' />
      </div>

      <div className='border rounded-2xl mt-4 p-4' >
        <h1 className='font-bold text-lg'>Subscribe to Premium</h1>
        <div className='mt-2'>
          <p className='text-sm text-gray-500'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
        </div>
        <button className='bg-black text-white px-4 py-2 mt-2 rounded-full font-bold'>Subscribe</button>
      </div>

      {/* Who to Follow  */}

      <div className='border bg-gray-100 rounded-2xl mt-4 w-full p-4' >
        <h1 className='font-bold text-xl'>Who to follow</h1>

        {
          otherUsers?.map((e)=>(
            <div key={e._id} className='flex items-center justify-between my-3'>
          <div className='flex'>
            <div>
              <Avatar src={e.profileImg || "https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"} size="40" round={true}/>
            </div>
            <div className='ml-2'>
                <h1 className='font-bold'>{e.name}</h1>
                <p className=' text-sm'>@{e.userName}</p>
            </div>
          </div>
          <Link to={`/profile/${e._id}`} className='ml-1'>
          <button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button>
          </Link>
        </div>
          ))
        }
        
        
      </div>
    </div>
  )
}

export default RightSideBar




