const express = require("express")
const { isAuthentnicatd } = require("../middleware/auth");
const { createUser, loginUser, logoutUser, bookmarkTweet, getProfile, getOtherUsers, followUser, unFollowUser, updateUser, updateImage, currentUserDetails } = require("../controller/userController")
const router = express.Router()


router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser);
router.put("/bookmarks/:id",isAuthentnicatd ,bookmarkTweet)
router.get("/profile/:id",isAuthentnicatd, getProfile)
router.get("/profile/otherUsers/:id",isAuthentnicatd, getOtherUsers)
router.post("/follow/:id", isAuthentnicatd, followUser)
router.post("/unfollow/:id", isAuthentnicatd, unFollowUser)
router.put("/updateUser",isAuthentnicatd, updateUser)
router.put("/updateUserImage",isAuthentnicatd, updateImage)
router.get("/getUser/:id",isAuthentnicatd, currentUserDetails)


exports.router = router;