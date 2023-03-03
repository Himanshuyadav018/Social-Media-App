import {useState} from 'react'
import { Box,Typography, Button, TextField, useTheme, useMediaQuery  } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { setLogin, setSignUp } from 'state/index'
import FlexBox from './flexBox'
import FileBase from 'react-file-base64'

import {signin, signup} from 'api/index.js'

const Form = () => {
    const [values, setValues] = useState({firstName: '', lastName: '', email: '', password: '',confirmPassword: '', location: '', occupation: '', selectedFile: ''})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [pageType, setPageType] = useState('login')
    const isLogin = pageType === 'login'
    const isRegister = pageType === 'register'

    const {palette} = useTheme()
    const isNotMobileScreen = useMediaQuery('(min-width: 600px)')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(isLogin) {
            const {data} = await signin({email: values.email, password: values.password})
            
            if(data) {
            dispatch(setLogin({user: data.user, token: data.token}))
            }
        }
        if(isRegister) {
            const {data} = await signup({firstName:values.firstName, lastName: values.lastName, email: values.email, password: values.password, confirmPassword: values.confirmPassword, location: values.location, occupation: values.occupation, selectedFile: values.selectedFile})
            
            if(data) {
            dispatch(setSignUp({user: data.user, token: data.token}))
            }
        }
        navigate('/')
    }


  return (
        <form onSubmit={handleSubmit}>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{ "& > div": { gridColumn : isNotMobileScreen ? undefined : 'span 4'}}}>

            {/* element for the register page only */}
            {isRegister && (
                <>
                <TextField variant="outlined" label="first name" name="firstName" value={values.firstName} sx={{ gridColumn: 'span 2'}} onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}/>

                <TextField variant="outlined" label="last name" name="lastName" value={values.lastName} sx={{ gridColumn: 'span 2'}} onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}/>
                
                <TextField variant="outlined" label="occupation" name="occupation" value={values.occupation} sx={{ gridColumn: 'span 4'}} onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}/>

                <TextField variant="outlined" label="location" name="location" value={values.location} sx={{ gridColumn: 'span 4'}} onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}/>
                
                {/* for photo */}
                <Box gridColumn="span 4" p="0.1rem" border={`1px, solid ${palette.neutral.medium}`} borderRadius="5px">
                    <Box display="flex" justifyContent="space-between" p="0.1rem" border={`3px, dashed ${palette.primary.main}`}>

                    <Typography sx={{
                    fontSize: '20px', textDecoration: "underline", color: palette.primary.main , "&.hover": {cursor: 'pointer', color: palette.primary.light}}}>
                        Add a picture
                    </Typography>

                    <FileBase type="file" multiple={false}  onDone={({base64}) => setValues({...values, selectedFile: base64})}/>
                    </Box>
                </Box>

                </>
            )}

            <TextField variant="outlined" type="email" label="Email" name="email" value={values.email} sx={{ gridColumn: 'span 4'}} onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}/>

            <TextField variant="outlined" type="password" label="Password" name="password" value={values.password} sx={{ gridColumn: 'span 4'}} onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}/>
            
            {isRegister && (
            <TextField variant="outlined" type="password" label="Confirm Password" name="confirmPassword" value={values.confirmPassword} sx={{ gridColumn: 'span 4'}} onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}/>
            )}

            </Box>

            {/* Buttons */}
            <Box>
                <Button variant="contained" type="submit" fullWidth sx={{ p:'1rem', m:'2rem 0', backgroundColor: palette.primary.main , color: palette.background.alt, "&.hover": {cursor: 'pointer', color: palette.primary.main}}}>
                { isLogin ? 'LOGIN' : 'REGISTER'}
                </Button>

                <Box display="flex" alignItems="center" justifyContent="center">
                <Typography onClick={() => setPageType(isLogin ? 'register': 'login')} sx={{
                    textDecoration: "underline", color: palette.primary.main , "&.hover": {cursor: 'pointer', color: palette.primary.light}
                }}>
                    {isLogin ? `Don't have an Account register here!` : `Already have an account Login here!`}
                </Typography>
                </Box>
                
            </Box>
        </form>
  )
}

export default Form
