import React from 'react'
import {Box, useMediaQuery, useTheme} from '@mui/material' 

import Navbar from 'pages/navbar/navbar'
import UserWidget from 'pages/widgets/UserWidget'
import { useSelector } from 'react-redux'
import AddPostWidget from 'pages/widgets/AddPostWidget'
import PostsWidgets from 'pages/widgets/PostsWidget'
import AdvertWidget from 'pages/widgets/AdvertWidget'
import FriendListWidget from 'pages/widgets/FriendListWidget'

const Homepage = () => {
  const isNotMobileScreen = useMediaQuery('(min-width: 1000px')
  const {_id} = useSelector((state) => state.user)
  const theme = useTheme()
  return (
    <Box>
      <Navbar />
      <Box width="100%" padding="2rem 6%" display={isNotMobileScreen ? 'flex': "block"} gap="0.5rem" justifyContent="space-between" backgroundColor={theme.palette.background.default}>
        {/* user imformation */}
        <Box flexBasis={isNotMobileScreen ? "26%": undefined}>
          <UserWidget userId={_id}/>
        </Box> 

        {/* add post and view posts widgets */}
        <Box flexBasis={isNotMobileScreen ? "43%": undefined} mt={isNotMobileScreen ?  undefined :'2rem'}>
          <AddPostWidget />
          <PostsWidgets id={_id}/>
        </Box> 

        {isNotMobileScreen && <Box flexBasis="26%">
          <AdvertWidget />
          <Box m="2rem 0"/>
          <FriendListWidget />
          </Box>}
        
      </Box>
    </Box>
  )
}

export default Homepage
