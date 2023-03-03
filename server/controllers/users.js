import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
import User from '../models/users.js'

// Signing in the user
export const signIn = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.findOne({ email: email})

        if(!user) return res.status(401).json({message: "User not found"})

        const isCorrectPassword = await bcrypt.compare(password, user.password)

        if(!isCorrectPassword) return res.status(401).json({message: "wrong password"})

        const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

        delete user.password

        res.status(200).json({user, token})

    }catch(err) {
        console.log(err)
        res.status(404).json({message: err.message})
    }
}

// First time creating an account
export const signUp = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName, occupation, location, impressions, viewedProfile,selectedFile} = req.body
    console.log('hello')

    try{
        const exsistingUser = await User.findOne({email: email})

        if(exsistingUser) return res.status(401).json({message: 'User already exists'})

        if(password !== confirmPassword) return res.status(401).json({message: "confirm password doesn't match"})

        const hashedPassword = await bcrypt.hash(password, 12)

        const createUser = await User.create({email: email, password: hashedPassword, name: `${firstName} ${lastName}`, occupation, location, impressions, viewedProfile,selectedFile})

        await createUser.save()

        delete createUser.password

        const token = jwt.sign({email: createUser.email, id: createUser._id}, process.env.JWT_SECRET, { expiresIn: '1d'})

        res.status(201).json({user: createUser, token})

    }catch(err) {
        console.log(err)
        res.status(404).json({message: err.message})
    }
}

// getting the profile for the user
export const getUser = async (req, res) => {
    const { id } = req.params
    try{
        const user = await User.findById(id)

        if(!user) return res.status(401).json({message: "no user with this id exists!"})

        res.status(200).json(user)

    }catch(err) {
        console.log(err)
        res.status(404).json({message: err.message})
    }
}

// Updating the profile of the user
export const updateUser = async (req, res) => {
    const { id } = req.params
    const user = req.body

    if(!mongoose.Types.ObjectId.isValid) return res.status(401).json({message: "user id doesn't exists"})

    try{
        const updatedUser = await User.findByIdAndUpdate(id, {...user, _id: id}, {new: true})

        res.status(201).json(updatedUser)

    }catch(err) {
        console.log(err)
        res.status(404).json({message: err.message})
    }
}

// deleting the user account from the database
export const deleteUser = async (req, res) => {
    const {id} = req.params

    try{
        await User.findByIdAndDelete(id)

        res.status(200).json({message: 'User deleted successfully'})

    }catch(err) {
        console.log(err)
        res.status(404).json({message: err.message})
    }
}

// adding friends to the user account
export const addOrRemoveFriend = async (req, res) => {
    const { id, friendId} = req.params

    try{
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== String(friendId))
            friend.friends = friend.friends.filter((friendid) => friendid !== String(id))
        }else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await User.findByIdAndUpdate(id, user, {new: true})
        await User.findByIdAndUpdate(friendId, friend, {new: true})

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )

        const formattedFriends = friends.map(({ _id, name, selectedFile, occupation, location}) => {
            return {_id, name, selectedFile, occupation, location}
        })

        res.status(200).json(formattedFriends)    

    } catch(err) {
        console.log(err)
        res.status(404).json({message: err.message})
    }
}

// getting the friends of the user
export const getFriend = async (req, res) => {
    const {id} = req.params

    try{
        const user = await User.findById(id)
        if(!user) return res.status(404).json({message: "User not found"})

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )

        const formattedFriends = friends.map(({ _id, name, selectedFile, occupation, location}) => {
            return {_id, name, selectedFile, occupation, location}
        })

        res.status(200).json(formattedFriends)

    } catch(err) {
        console.log(err)
        res.status(404).json({message: err.message})
    }
}