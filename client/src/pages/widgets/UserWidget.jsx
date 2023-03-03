import {useState, useEffect} from 'react'
import { 
    ManageAccountsOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    EditOutlined
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme} from '@mui/material'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FlexBox from 'components/flexBox'
import UserImage from 'components/userImage'
import WidgetBox from 'components/widgetBox'
import { getuser } from 'api/index.js'

const UserWidget = ({userId}) => {
    const {palette} = useTheme()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const getUser = async () => {
        const {data} = await getuser(userId)

        setUser(data)
    }

    useEffect(() => {
        getUser()
    }, []) // eslint-disable-line

    if(!user) return null

    const {name, location, occupation, viewedProfile, impressions, friends, selectedFile} = user

    return (
        <WidgetBox>
            {/* first row */}
            <FlexBox gap="0.5rem" pb="1.1rem" onClick={() => navigate(`/profile/${userId}`)} >
                <FlexBox gap="1rem">
                    {/* user image */}
                    <UserImage image={selectedFile} />
                    {/* user name and friends numbers */}
                    <Box>
                        <Typography variant="h5" fontWeight="500" color={palette.neutral.dark}>{name}</Typography>
                        <Typography>Friends {friends.length}</Typography>
                    </Box>
                </FlexBox>
                <ManageAccountsOutlined />
            </FlexBox>
            {/* line break */}
            <Divider />

            {/* second row */}
            <Box p="1rem 0">
                {/* location */}
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{color: palette.neutral.main}} />
                    <Typography  sx={{color: palette.neutral.medium}}>{location}</Typography>
                </Box>
                {/* occupation */}
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <WorkOutlineOutlined fontSize="large" sx={{color: palette.neutral.main}}/>
                    <Typography  sx={{color: palette.neutral.medium}}>{occupation}</Typography>
                </Box>
            </Box>
            {/* line break*/}
            <Divider />

            {/* third row */}
            <Box p="1rem">
                {/* viewed profile */}
                <FlexBox mb="0.5rem">
                    <Typography sx={{color: palette.neutral.medium}}>Who's viewed your profile</Typography>
                    <Typography fontWeight="500" sx={{color: palette.neutral.main}}>{viewedProfile}</Typography>
                </FlexBox>
                {/* impressions */}
                <FlexBox>
                    <Typography sx={{color: palette.neutral.medium}}>Impressions</Typography>
                    <Typography fontWeight="500" sx={{color: palette.neutral.main}}>{impressions}</Typography>
                </FlexBox>
            </Box>
            {/* line break */}
            <Divider />

            {/* fourth row */}
            <Box p="1rem 0">
                {/* title */}
                <Typography fontSize='1rem' color={palette.neutral.main} fontWeight='500' mb="1rem">SOCIAL PROFILE'S</Typography>
                {/* twitter box */}
                <FlexBox gap="1rem" mb="0.5rem">
                <FlexBox>
                    <img width="40px" height="40px" src="../assets/twitter.png" alt="Twitter"/>
                    <Box>
                        <Typography color={palette.neutral.main} fontWeight="500">Twitter</Typography>
                        <Typography color={palette.neutral.medium}>Social Network</Typography>
                    </Box>
                </FlexBox>
                    <EditOutlined sx={{color: palette.neutral.main}}/>
                </FlexBox>

                {/* linkedin box*/}
                <FlexBox gap="1rem">
                <FlexBox>
                    <img width="30px" height="30px" src="../assets/linkedin.png" alt="LinkedIn" style={{ margin: '0.5rem'}}/>
                    <Box>
                        <Typography color={palette.neutral.main} fontWeight="500">LinkedIn</Typography>
                        <Typography color={palette.neutral.medium}>Work Network</Typography>
                    </Box>
                </FlexBox>
                    <EditOutlined sx={{color: palette.neutral.main}}/>
                </FlexBox>
            </Box>
            {/* line break */}
            <Divider />
        </WidgetBox>
    )
}

export default UserWidget