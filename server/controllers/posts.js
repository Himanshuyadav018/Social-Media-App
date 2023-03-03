import mongoose from 'mongoose'
import Post from '../models/posts.js' 

// getting all the posts saved in the database
export const getAllPosts = async (req, res) => {
    
    try{
        const posts = await Post.find()
        res.status(200).json(posts)
    }catch(err){
        console.log(err)
        res.status(404).json({message: err.message})
    }
}


// getting only a specific user posts
export const getUserPosts = async (req, res) => {
    const { id} = req.params
    try{
        const posts = await Post.find({creator: id})

        res.status(200).json(posts)
    }catch(err){
        console.log(err)
        res.status(404).json({message: err.message})
    }
}

// getting the post by search or tags
export const getPostsBySearch = async (req, res) => {
    const {search, tags} = req.body
    try{
        const title = new RegExp(search, 'i')
        const posts = await Post.find({$or: [{title}, { tags: {$in: tags.split(',')}}]})

        res.status(200).json(posts)
    }catch(err){
        console.log(err)
        res.status(404).json({message: err.message})
    }
}

// creating a post for a user
export const createPost = async (req, res) => {
    const postData = req.body 
    try{
        const post = new Post({...postData, creator: req.userId, createAt: new Date().toISOString()})

        await post.save()

        const posts = await Post.find()

        res.status(201).json(posts)
    }catch(err){
        console.log(err)
        res.status(404).json({message: err.message})
    }
}

// updating an existing post by the same user
export const updatePost = async (req, res) => {
    const newData = req.body
    const {id} = req.params
    try{
        const post = await Post.findById(id)

        if(!post) return res.status(404).json({message: 'No post found'})

        const updatedPost = await Post.findByIdAndUpdate(id, {...newData, _id: id}, { new : true})

        res.status(200).json(updatedPost)
    }catch(err){
        console.log(err)
        res.status(404).json({message: err.message})
    }
}

// deleting the post created by that user
export const deletePost = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: 'post not found'})

    try{
        const deletedPost = await Post.findByIdAndDelete(id)

        res.status(204).json({message: 'post deleted successfully'})

    }catch(err){
        console.log(err)
        res.status(404).json({message: err.message})
    }
}

// liking and disliking the post
export const likePost = async (req, res) => {
    const {userId, id} = req.params

    if(!req.userId) return res.status(404).json({message: 'Not Authenticated'})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: 'post not found'})

    try{
        const post = await Post.findById(id)

        const likeIndex = post.likes.findIndex((id) => id === String(userId))

        if(likeIndex === -1) {
            post.likes.push(userId)
        }else{
            post.likes = post.likes.filter(like => like !== String(userId))
        }

        const updatedPost = await Post.findByIdAndUpdate(id, {...post, likes: post.likes, _id: id}, { new: true })

        res.status(201).json(updatedPost)

    }catch(err){
        console.log(err)
        res.status(404).json({message: err.message})
    }
}

// commenting the post
export const commentPost = async (req, res) => {
    const {value} = req.body
    const {id} = req.params

    try{
        const post = await Post.findById(id)

        post.comments.push(value)

        const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true})

        res.status(200).json(updatedPost)
    }catch(err){
        console.log(err)
        res.status(404).json({message: err.message})
    }
}