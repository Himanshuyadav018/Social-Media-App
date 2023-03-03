import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
    creator: String,
    title: String,
    userImage: String,
    image: String,
    name: String,
    discription: String,
    location: String,
    tags: [String],
    comments: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Post = mongoose.model('Posts', PostSchema)

export default Post