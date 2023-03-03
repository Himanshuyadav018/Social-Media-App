import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined
} from '@mui/icons-material'

import { Box, Button, Typography, InputBase, IconButton, useTheme, useMediaQuery, Divider } from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'
import UserImage from 'components/userImage'
import WidgetBox from 'components/widgetBox'
import FlexBox from 'components/flexBox'
import { useState } from 'react'
import FileBase from 'react-file-base64'
import { setPosts } from 'state'
import { createPost } from 'api/index'
import { useNavigate } from 'react-router-dom'

const AddPostWidget = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {palette} = useTheme()
    const isNotMobileScreen = useMediaQuery('(min-width: 1000px)')
    const [postData, setPostData] = useState({image: '', discription: ''})
    const [isImage, setIsImage] = useState(false)
    const {_id, name, selectedFile} = useSelector((state) => state.user)

    const handleSubmit = async (e) => {
        try{
            const {data} = await createPost({creator:_id, name: name, userImage: selectedFile, image: postData.image, discription: postData.discription})

            dispatch(setPosts({posts: data}))
            setPostData({image: '', discription: ''})
            navigate(0)
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <>
        <WidgetBox>
            {/* first row */}
            <FlexBox gap="1.5rem">
                <UserImage image={selectedFile}/>
                <InputBase placeholder={`What's on your mind ...`} sx={{ width:'100%', padding: '1rem 2rem' , backgroundColor:palette.neutral.light , borderRadius: '2rem'}} value={postData.discription} onChange={(e) => setPostData({...postData, discription: e.target.value})}/>
            </FlexBox>
            <Divider sx={{margin: '1.25rem 0'}}/>

            {/* second hidden row */}
            {/* adding an image to the post */}
            {isImage && (
                <FlexBox border={`2px solid ${palette.primary.light}`} m="0.75rem 0" p="0.5rem">
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, image: base64})}/>
                    <EditOutlined sx={{color: palette.primary.main}} onClick={() => setPostData({...postData, image: ''})} />
                </FlexBox>
            )}

            {/* third Row for buttons */}
            <FlexBox>
                {/* image Icon */}
                <FlexBox gap="0.25rem">
                    <IconButton onClick={() => setIsImage(!isImage)}>
                        <ImageOutlined sx={{color:palette.primary.main}}/>
                    </IconButton>
                    <Typography color="primary" sx={{"&.hover": {cursor: 'pointer'}}}>Image</Typography>
                </FlexBox>

                {isNotMobileScreen ? (
                <>
                {/* Attach File Icon */}
                <FlexBox gap="0.25rem">
                    <IconButton>
                        <AttachFileOutlined sx={{color:palette.primary.main}}/>
                    </IconButton>
                    <Typography  color="primary" sx={{"&.hover": {cursor: 'pointer'}}}>Attach</Typography>
                </FlexBox>
                {/* Gif Icon */}
                <FlexBox gap="0.25rem">
                    <IconButton>
                        <GifBoxOutlined sx={{color:palette.primary.main}}/>
                    </IconButton>
                    <Typography  color="primary" sx={{"&.hover": {cursor: 'pointer'}}}>Gif</Typography>
                </FlexBox>
                {/* Mic Icon */}
                <FlexBox gap="0.25rem">
                    <IconButton>
                        <MicOutlined sx={{color:palette.primary.main}}/>
                    </IconButton>
                    <Typography color="primary" sx={{"&.hover": {cursor: 'pointer'}}}>Mic</Typography>
                </FlexBox>
                </>
                ) : (
                <>
                <FlexBox gap="0.25rem">
                    <MoreHorizOutlined sx={{color: palette.primary.main}}/>
                </FlexBox>
                </>
                )}

                {/* post button */}
                <Button type="submit" disabled={!postData.image.length} variant="outlined" onClick={handleSubmit} sx={{borderRadius: '3rem', backgroundColor: palette.primary.main, color: palette.background.dark}}>Post</Button>
            </FlexBox>
        </WidgetBox>
        </>
    )
}

export default AddPostWidget