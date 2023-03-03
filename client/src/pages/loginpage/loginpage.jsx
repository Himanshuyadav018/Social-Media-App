import React from 'react'
import {Box, Typography, useTheme, useMediaQuery} from '@mui/material'
import Form from 'components/form.jsx'

const Loginpage = () => {
  const theme = useTheme()
  const isNotMobileScreen = useMediaQuery('(min-width:1000px)') 

  return (
    <>
    <Box display="flex" justifyContent="center" alignItems="center" backgroundColor={theme.palette.background.alt} width="100%" p="1rem 6%">

    <Typography fontSize="clamp(1rem, 2rem, 2.5rem)" fontWeight="bold" color="primary" sx={{ "&:hover": {color: theme.palette.primary.light, cursor: "pointer"}}}>
      SOCIALS
    </Typography>
    </Box>

    <Box width={isNotMobileScreen ? "50%" : "93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background.alt}>

      <Typography variant="h5" fontWeight="bold" sx={{ mb: '1.5rem'}} >Welcome to socials! himanshu's own social media app</Typography>
      <Form />
    </Box>
    </>
  )
}

export default Loginpage
