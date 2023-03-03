import { 
    ChatBubbleOutlineOutlined,
    FavoriteOutlined,
    FavoriteBorderOutlined,
    ShareOutlined
} from '@mui/icons-material'
import { Box, Typography, IconButton, Divider, useTheme } from '@mui/material'
import FlexBox from 'components/flexBox'
import PostUserInfo from 'components/postUserInfo'
import WidgetBox from 'components/widgetBox'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from 'state/index'
import { addOrRemoveLike} from 'api/index'

const PostWidget = ({postId, name, creator, image, userImage, discription, location, comments, likes}) => {

    const {palette} = useTheme()
    const dispatch = useDispatch()
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const loggedInUserId = useSelector((state) => state.user._id)
    const isLiked = likes.findIndex((like) => like === loggedInUserId) === -1 ? false : true
    const likeCount = likes.length

    const patchLike = async() => {
        const { data } = await addOrRemoveLike(postId, loggedInUserId)

        dispatch(setPost({post: data}))
    }

  return (
    <WidgetBox m="1.75rem 0">
        <PostUserInfo friendId={creator} name={name} subtitle={location} userImage={userImage} />
        <Typography color={palette.neutral.main} sx={{ mt: '1rem'}}>{discription}</Typography>

        {image && (
            <img src={image} alt="Post" width="100%" height='auto' style={{ borderRadius:"0.75rem" , marginTop: '0.75rem'}}/>
        )}
        <FlexBox mt="0.25rem">
        <FlexBox gap="1rem">
            {/* like icon */}
            <FlexBox gap="0.3rem">
                <IconButton onClick={() => patchLike()}>
                    {isLiked ? (
                        <FavoriteOutlined sx={{ color: palette.primary.main}}/>
                    ) : (
                        <FavoriteBorderOutlined />
                    )}
                </IconButton>
                <Typography>{likeCount}</Typography>
            </FlexBox>

            {/* comment icon */}
            <FlexBox gap="0.3rem">
                <IconButton onClick={() => setIsCommentOpen(!isCommentOpen)}>
                    <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{comments.length}</Typography>
            </FlexBox>

        </FlexBox>

        {/* share icon */}
        <IconButton><ShareOutlined /></IconButton>
        </FlexBox>

        {/* comment section */}
        {isCommentOpen && (
            <Box mt="0.25rem">
                {comments.map((comment, i) => (
                    <Box key={`${name}-${i}`}>
                        <Divider />
                        <Typography sx={{ color: palette.neutral.main, m: '0.5rem 0', pl: '1rem'}}>{comment}</Typography>
                    </Box>
                ))}
                <Divider />
            </Box>
        )}
    </WidgetBox>
  )
}

export default PostWidget
