import axios from 'axios'

const config = {
    headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('persist:root')).token}`
    }
}

export const signin = (values) => axios.post('http://localhost:5000/user/signIn', values)

export const signup = (values) => axios.post('http://localhost:5000/user/signUp', values)

export const getuser = (id) => axios.get(`http://localhost:5000/user/${id}`,undefined, config)

export const createPost = (values) => axios.post('http://localhost:5000/posts', values, config)

export const addOrRemoveFriend = (id, friendId) => axios.patch(`http://localhost:5000/user/${id}/friend/${friendId}`,undefined, config)

export const addOrRemoveLike = (id, userId) => axios.patch(`http://localhost:5000/posts/${userId}/like/${id}`, undefined, config)

export const getPosts = () => axios.get(`http://localhost:5000/posts`, undefined, config)

export const getuserPostapi = (id) => axios.get(`http://localhost:5000/posts/myPost/${id}`, config)

export const getFriend = (id) => axios.get(`http://localhost:5000/user/friend/${id}`, undefined, config)