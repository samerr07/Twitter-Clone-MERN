import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

const Feed = () => {

  const {tweets,isActive,follwingTweets} = useSelector((state)=>state.tweet)
  // console.log(follwingTweets)
  
  return (
    <div
    //  className='w-[50%] border border-gray-200'
    className='w-full md:w-[75%] lg:w-[50%] mx-auto border border-gray-200'
    >
      <CreatePost/>

      {
        isActive ? (
          
            tweets?.map((tweet)=>(
              <Tweet key={tweet._id} tweet={tweet}/>
            ))
          
        ):(
            follwingTweets?.map((followTweet)=>(
              <Tweet key={followTweet._id} tweet={followTweet} />
            ))
        )
      }

      {/* {
        tweets?.map((tweet)=>(
          <Tweet key={tweet._id} tweet={tweet} />
        ))
      } */}
      
      
      
    </div>
  )
}

export default Feed




