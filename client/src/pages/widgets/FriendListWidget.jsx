import { Box, Typography, useTheme } from '@mui/material'
import WidgetBox from 'components/widgetBox'
import Friend from 'components/postUserInfo'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriend} from 'api/index'
import { setFriends} from 'state/index'

const FriendListWidget = () => {
    const dispatch = useDispatch()
    const { palette } = useTheme()
    const { _id } = useSelector((state) => state.user)
    const friends = useSelector((state) => state.user.friends)
    console.log(_id)

    const getFriends = async() => {
        const { data } = await getFriend(_id)

        dispatch(setFriends({friends: data}))
    }

    useEffect(() => {
        getFriends()
    }, []) // eslint-disable-line

    return (
        <WidgetBox>
            <Typography color={palette.neutral.dark} variant='h5' fontWeight="500" sx={{ mb: '1.5rem'}}>Friends List</Typography>
            <Box display="flex" flexDirection="column" gap='1.5rem'>
                {
                    friends.map((friend) => (
                        <Friend key={friend?._id} friendId={friend?._id} name={friend?.name} subtitle={friend?.occupation} userImage={friend?.selectedFile}/>
                    ))
                }
            </Box>
        </WidgetBox>
    )
}

export default FriendListWidget