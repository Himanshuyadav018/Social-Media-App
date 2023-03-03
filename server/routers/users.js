import express from 'express';
import {signIn, signUp, getUser, updateUser, deleteUser, addOrRemoveFriend, getFriend} from '../controllers/users.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/signIn', signIn)
router.post('/signUp', signUp)
router.get('/:id', getUser)
router.patch('/:id',auth, updateUser)
router.delete('/:id',auth, deleteUser)
router.patch('/:id/friend/:friendId', auth, addOrRemoveFriend)
router.get('/friend/:id', getFriend)

export default router