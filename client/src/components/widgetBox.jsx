import { styled } from '@mui/system'
import {Box} from '@mui/material'

const WidgetBox = styled(Box)(({theme}) => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    borderRadius: "0.75rem",
    backgroundColor: theme.palette.background.alt
}))

export default WidgetBox