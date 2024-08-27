const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        
    },
    profileImg: {
        type: String,
        default: "",
    },
    coverImg: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    bookmarks:{
        type:Array,
        default:[]
    },
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet",
            default: [],
        },
    ],
},{timestamps:true})

exports.User = mongoose.model("User",userSchema);

// const User = mongoose.model("User",userSchema);