

import React, { useRef, useState } from 'react'
import Avatar from 'react-avatar';
import { CiImageOn } from 'react-icons/ci';
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import axios from 'axios';
import { FaSpinner } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { TWEET_API_END_POINT } from '../utils/config';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getIsActive, getRefresh } from "../redux/tweetSllice"

const CreatePost = () => {
    const [emojiIcon, setEmojiIcon] = useState("");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.user);
    const { isActive } = useSelector((state) => state.tweet);
    const imgRef = useRef(null);

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreatePost = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${TWEET_API_END_POINT}/createTweet`, { description, img, id: user?._id }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            dispatch(getRefresh());
            if (res?.data?.success) {
                toast.success(res.data.message);
                setDescription("");
                setImg(null);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const forYouHandler = () => {
        dispatch(getIsActive(true));
    };

    const followingHandler = () => {
        dispatch(getIsActive(false));
    };

    const handleEmojiClick = (e) => {
        setDescription(prev => prev + e.emoji);
        setOpenEmojiPicker(false);
    };

    return (
        <div className='w-[100%]'>
            <div className='flex items-center justify-evenly border-b border-gray-200'>
                <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                    <h1 className='font-semibold text-gray-600'>For You</h1>
                </div>
                <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                    <h1 className='font-semibold text-gray-600'>Following</h1>
                </div>
            </div>

            <div>
                <div className='flex items-center p-4'>
                    <div>
                        <Avatar src={user?.profileImg || 'https://pbs.twimg.com/profile_images/433940520427999232/xFIvGxvQ_400x400.jpeg'} size='40' round={true} />
                    </div>
                    <div className='w-full ml-2'>
                        <input
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className='w-full text-xl outline-none border-none'
                            type='text'
                            placeholder='What is happening?!'
                        />
                        {img && (
                            <div className='relative w-72 mx-auto'>
                                <IoCloseSharp
                                    className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
                                    onClick={() => {
                                        setImg(null);
                                        imgRef.current.value = null;
                                    }}
                                />
                                <img src={img} className='w-full mx-auto h-72 object-contain rounded' />
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                    <div className='flex items-center relative'>
                        <CiImageOn
                            className='fill-primary w-6 h-6 cursor-pointer'
                            onClick={() => imgRef.current.click()}
                        />
                        <input type='file' accept='image/*' hidden ref={imgRef} onChange={handleImgChange} />
                        <button
                            className="text-lg ml-1"
                            onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                        >
                            <BsEmojiSmile />
                        </button>
                        <div className="absolute z-20 top-20">
                            <EmojiPicker
                                open={openEmojiPicker}
                                onEmojiClick={handleEmojiClick}
                            />
                        </div>
                    </div>

                    <button onClick={handleCreatePost} className='bg-[#1D9BF0] px-4 py-1 text-lg text-white text-right border-none rounded-full'>
                        {loading ? <FaSpinner className="animate-spin" /> : "Post"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;






