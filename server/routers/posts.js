import express from 'express'
import {getAllPosts, getUserPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost, commentPost} from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getAllPosts)
router.get('/myPost/:id',auth, getUserPosts)
router.get('/search', getPostsBySearch)

router.post('/',auth, createPost)
router.patch('/:id',auth, updatePost)
router.delete('/:id',auth, deletePost)
router.patch('/:userId/like/:id',auth, likePost)
router.post('/comment/:id',auth, commentPost)

export default router