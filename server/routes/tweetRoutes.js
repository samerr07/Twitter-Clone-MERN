const express = require("express");
const { isAuthentnicatd } = require("../middleware/auth");
const { createTweet,upload, deleteTweet, likesAndDislikes, getAllTweets, getFollowingTweets, commentTweet, getLikedTweets } = require("../controller/tweetController");
const router = express.Router();


router.post("/createTweet" , isAuthentnicatd, createTweet);
// router.post('/createTweet',isAuthentnicatd, upload.single('media'), createTweet);
router.delete("/deleteTweet/:id", isAuthentnicatd, deleteTweet)
router.put("/likeTweet/:id",isAuthentnicatd,likesAndDislikes)
router.get("/getAllTweets/:id", isAuthentnicatd, getAllTweets)
router.get("/getLikedTweets/:id", isAuthentnicatd, getLikedTweets)
router.get("/getFollowingTweets/:id", isAuthentnicatd, getFollowingTweets)
router.post("/comment/:id",isAuthentnicatd, commentTweet);


exports.router = router;