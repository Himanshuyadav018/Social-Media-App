import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import UserWidget from 'pages/widgets/UserWidget'
import PostsWidgets from 'pages/widgets/PostsWidget'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { getuser } from 'api/index'
import Navbar from 'pages/navbar/navbar'

const Profilepage = () => {
  const [user, setUser] = useState(null)
  const { id} = useParams()
  const isNotMobileScreen = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()

  const getUser = async() => {
    const { data } = await getuser(id)

    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, []) //eslint-disable-line

  if(!user) return null


  return (
    <Box>
      <Navbar />
      <Box width="100%" padding="2rem 6%" display={isNotMobileScreen ? 'flex': "block"} gap="2rem" justifyContent="center" backgroundColor={theme.palette.background.default}>
        {/* user imformation */}
        <Box flexBasis={isNotMobileScreen ? "26%": undefined}>
          <UserWidget userId={id}/>
        </Box> 

        {/* add post and view posts widgets */}
        <Box flexBasis={isNotMobileScreen ? "43%": undefined} mt="0px">
          <PostsWidgets id={id} isProfile/>
        </Box> 
        
      </Box>
    </Box>
  )
}

export default Profilepage
