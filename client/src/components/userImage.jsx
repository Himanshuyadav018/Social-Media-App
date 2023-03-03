import { Box } from '@mui/material'

const UserImage = ({image, size="60px"}) => {
    return (
        <Box width={size} height={size}>
            <img src={image} alt="user" width={size} height={size} style={{borderRadius:"50%", objectFit: "cover"}}/>
        </Box>
    )
}

export default UserImage