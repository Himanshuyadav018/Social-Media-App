import FlexBox from "./flexBox";
import UserImage from "./userImage";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux";
import { setFriends} from 'state/index'
import { addOrRemoveFriend} from 'api/index'
import { useNavigate} from 'react-router-dom'

const PostUserInfo = ({friendId, name, subtitle, userImage}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { palette } = useTheme()
    const user = useSelector((state) => state.user)

    const isFriend = user.friends.find((friend) => friend?._id === friendId)
    const isMyPost = user._id === friendId

    const patchOrRemoveFriend = async () => {
        const { data } = await addOrRemoveFriend(user._id, friendId)
        
        dispatch(setFriends({friends : data}))
        
    }

    return (
        <FlexBox>
            <FlexBox gap="1rem">
                <UserImage image={userImage}/>
                <Box onClick={() => {
                    navigate(`/profile/${friendId}`)
                    navigate(0)
                }} sx={{"&.hover": { cursor: "pointer" }}}>
                    <Typography color={palette.neutral.main} variant='h5' fontWeight='500' sx={{'&.hover': { cursor: 'pointer', color: palette.primary.light}}}>{name}</Typography>
                    <Typography color={palette.neutral.medium} fontSize="0.75rem">{subtitle}</Typography>
                </Box>
            </FlexBox>
            
            {!isMyPost && (
            <IconButton onClick={() => patchOrRemoveFriend()} sx={{backgroundColor: palette.primary.light, p:"0.6rem"}}>
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color: palette.primary.dark}}/>
                ) : (
                    <PersonAddOutlined sx={{ color: palette.primary.dark}}/>
                )}
            </IconButton>
            )}
        </FlexBox>
    )
}

export default PostUserInfo;