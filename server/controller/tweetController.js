const { Tweet } = require("../model/tweetSchema");
const { User } = require("../model/userSchema");
const cloudinary = require('cloudinary').v2


exports.createTweet = async (req,res)=>{
    try{
        //ye jo id hai user id jo client side se send kiya hai
        const {description, id} = req.body;
        let {img} = req.body;

        if(!description || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await User.findById(id);

        if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

        await Tweet.create({
            description,
            userId: id,
            img,
            userDetails:user
        })

        return res.status(200).json({
            success:true,
            message:"Tweet created successfully !!"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in creating tweet"
        })
    }
}

exports.deleteTweet = async(req,res)=>{
    try{
        const id = req.params.id;

        await Tweet.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:"Tweet deleted successfully !!"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in deleting tweet"
        })
    }
}

exports.commentTweet = async(req,res)=>{
    try{
        const id = req.params.id;
        const userId = req.body.id;
        const comment = req.body.comment;
        const tweet = await Tweet.findById(id);

        const userDetail = await User.findById(userId);

        tweet.comments.push({
            user: userId,
            comment:comment,
            userDetail: userDetail
        });

        await tweet.save();

        return res.status(200).json({
            success:true,
            message:"Comment added successfully !!",
            tweet
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in adding comment"
        })
    }
}


exports.likesAndDislikes = async(req,res)=>{
    try{
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;

        const tweet = await Tweet.findById(tweetId);

        if(tweet.like.includes(loggedInUserId)){
            //remove the like
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}})
            //ye line liked post ko specific user ke sath store krega ye logic
            //profile page m use hoga like tweets ke liye
            await User.updateOne({ _id: loggedInUserId }, { $pull: { likedPosts: tweetId } });
            return res.status(200).json({
                success:true,
                message:"Tweet disliked successfully !!"
            })
        }else{
            await Tweet.findByIdAndUpdate(tweetId,{$push:{like:loggedInUserId}})
            await User.updateOne({ _id: loggedInUserId }, { $push: { likedPosts: tweetId } });

            return res.status(200).json({
                success:true,
                message:"Tweet liked successfully !!"
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in liking and disliking tweet"
        })
    }
}


//get all tweets

exports.getAllTweets = async(req,res)=>{
    try{
        const id = req.params.id;
        const loggedInUser = await User.findById(id);

        const loggedUserTweets = await Tweet.find({userId:id})

        const followingUserTweets = await Promise.all(
            loggedInUser.following.map((e)=>(
                Tweet.find({userId:e})
            ))
        )

        return res.status(200).json({
            success:true,
            tweets: loggedUserTweets.concat(...followingUserTweets)
        })


    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in getting all tweets"
        })
    }
}


//get following tweets

exports.getFollowingTweets = async(req,res)=>{
    try{
        const id = req.params.id;
        const loggedInUser = await User.findById(id);

       
        const followingUserTweets = await Promise.all(
            loggedInUser.following.map((e)=>(
                Tweet.find({userId:e})
            ))
        )

        return res.status(200).json({
            success:true,
            tweets: [].concat(...followingUserTweets)
        })


    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in getting all tweets"
        })
    } 
    
}

//get liked tweets

exports.getLikedTweets = async(req,res)=>{
    try{
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ error: "User not found" });

        const likedPosts = await Tweet.find({ _id: { $in: user.likedPosts } })
            .populate({
                path: "userId",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        

        return res.status(200).json({
            success: true,
            likedPosts,
            user
        });
    }catch{
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in getting liked tweets"
        })
    }
}