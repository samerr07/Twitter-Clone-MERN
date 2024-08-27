const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    like:{
        type:Array,
        default:[]
    },
    comments: [
        {
            comment: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            userDetail:{
                type: Object
            }
        },
    ],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    userDetails:{
        type:Array,
        default:[]
    },
    
},{timestamps:true})


// const tweetSchema = new mongoose.Schema({
//     description: {
//         type: String,
//         required: true
//     },
//     like: {
//         type: Array,
//         default: []
//     },
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     userDetails: {
//         type: Object,
//         required: true
//     },
//     media: {
//         type: String,
//         default: null
//     },
// }, { timestamps: true });

exports.Tweet = mongoose.model("Tweet",tweetSchema);
