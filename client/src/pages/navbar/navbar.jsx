import {useState} from 'react'

import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'

import {
  Search,
  DarkMode,
  Help,
  Notifications,
  LightMode,
  Message,
  Menu,
  Close
} from '@mui/icons-material'

import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import {setMode, setLogout} from 'state/index.js'
import FlexBox from 'components/flexBox'

const Navbar = () => {
  const [isMenuToggled, setMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNotMobileScreen = useMediaQuery("(min-width:1000px)")

  const mode = useSelector((state) => state.mode)
  const user = useSelector((state) => state.user)
  
  const {palette} = useTheme()

  return (
    <>
    <FlexBox padding="1rem 6%" backgroundColor={palette.background.alt}>
      <FlexBox gap="1.75rem">

        {/* App Name */}
        <Typography onClick={() => navigate('/')} fontSize="clamp(1rem, 2rem, 2.5rem)" fontWeight="bold" color="primary" sx={{ "&:hover": {color: palette.primary.light, cursor: "pointer"}}}>
          SOCIALS
        </Typography>

      </FlexBox>

        {/* search box */}
        { isNotMobileScreen && (
          <FlexBox backgroundColor = {palette.neutral.light} gap="3rem" borderRadius="9px" p="0.1rem 0.5rem" margin="0.1rem solid">
            <InputBase placeholder='Search ....' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBox>
        )}

        {/* NavBar for desktop */}
        { isNotMobileScreen ? (
          <FlexBox gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              { mode === 'light' ? 
              <DarkMode sx={{ fontSize: "25px"}} /> : 
              <LightMode sx={{fonstSize: "25px"}}/> }
            </IconButton>

            <IconButton><Help sx={{fontSize: "25px"}}/></IconButton>
            <IconButton><Message sx={{fontSize: "25px"}}/></IconButton>
            <IconButton><Notifications sx={{fontSize: "25px"}}/></IconButton>
            
            <Typography color={palette.primary.main} variant="h5">{user?.name}</Typography>

            <FlexBox p='0.75rem' borderRadius="9px" backgroundColor={palette.neutral.light}>
            <Typography color="error" variant="h5" onClick={() => dispatch(setLogout())} sx={{ "&:hover" : { color: palette.primary.dark, cursor: "pointer"}}}
            >LOGOUT</Typography>
            </FlexBox>
          </FlexBox>

        ): (
          <IconButton onClick={() => setMenuToggled(!isMenuToggled)}>
            <Menu />
          </IconButton>
        )}

        {/* NavBar for mobile */}
        {!isNotMobileScreen && isMenuToggled && (
          <Box position="fixed" right="0" bottom="0" height="100%" maxWidth="500px" minWidth="300px" zIndex="10" backgroundColor={palette.background.default}>

            <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setMenuToggled(!isMenuToggled)}>
              <Close />
            </IconButton>
            </Box>

            {/* menuItems */}
            <FlexBox flexDirection='column' justifyContent="center" alignItems="center" gap="3rem">
            <IconButton onClick={() => dispatch(setMode())}>
              { mode === 'light' ? 
              <DarkMode sx={{ fontSize: "25px"}} /> : 
              <LightMode sx={{fonstSize: "25px"}}/> }
            </IconButton>

            <IconButton><Help sx={{fontSize: "25px"}}/></IconButton>
            <IconButton><Message sx={{fontSize: "25px"}}/></IconButton>
            <IconButton><Notifications sx={{fontSize: "25px"}}/></IconButton>
            
            <Typography color={palette.primary.main} variant="h5">{user?.name}</Typography>
            <Typography color="error" variant="h5" onClick={() => dispatch(setLogout())}>LOGOUT</Typography>
          </FlexBox>

          </Box>
        )}
      
    </FlexBox>
    </>
  )
}

export default Navbar
