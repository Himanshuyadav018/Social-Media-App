import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { getPosts, getuserPostapi } from "api/index"
import  PostWidget from './PostWidget'

const PostsWidgets = ({ id, isProfile = false}) => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)

    const getAllPosts = async () => {
        const { data} = await getPosts()
        
        dispatch(setPosts({posts: data}))
    }

    const getUserPosts = async () => {
        const {data} = await getuserPostapi(id)

        dispatch(setPosts({posts: data}))
    }

    useEffect(() => {
        if(isProfile) {
            getUserPosts()
        }else {
            getAllPosts()
        }
    }, []) //eslint-disable-line


    return (
        // rendering all the post 
        <>
        {
            posts.map(({ _id, creator, name, userImage, image, discription, location, comments, likes }) => (
                <PostWidget key={_id} postId={_id} creator={creator} name={name} image={image} discription={discription} userImage={userImage} location={location} comments={comments} likes={likes} />
            ))
        }
        </>
    )
}

export default PostsWidgets