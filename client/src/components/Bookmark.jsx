
import React from 'react';
import Tweet from './Tweet';
import { useSelector } from 'react-redux';
import useCurrentUserDetails from '../hooks/useCurrentUserDetails';

const Bookmark = () => {
    const { tweets } = useSelector((state) => state.tweet);
    const { user } = useSelector((state) => state.user);

    useCurrentUserDetails(user?._id)

    // Filter tweets that are bookmarked
    const bookmarkedTweets = tweets.filter((tweet) => user.bookmarks.includes(tweet._id));

    return (
        <div 
        // className='w-[50%] border-l border-r border-gray-200'
          className='w-full md:w-[75%] lg:w-[50%] mx-auto border-l border-r border-gray-200'
        
        >
            <div className='flex items-center justify-evenly border-b border-gray-200'>
                <div className="border-b-4 border-transparent cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
                    <h1 className='font-bold text-xl text-gray-800'>My Bookmarked Tweets</h1>
                </div>
            </div>

            {bookmarkedTweets.length > 0 ? (
                bookmarkedTweets.map((tweet) => (
                    <Tweet className="hover:bg-slate-300 cursor-pointer" key={tweet._id} tweet={tweet} />
                ))
            ) : (
                <h1 className='text-black'>No Bookmark Tweet to display !!</h1>
            )}
        </div>
    );
};

export default Bookmark;
