import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    streamingApp: String,
    rating2 : Number ,
    review: String,
    creator : String ,
    Cid : String ,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
