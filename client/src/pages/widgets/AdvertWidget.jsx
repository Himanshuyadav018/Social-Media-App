import { Typography, useTheme} from '@mui/material'
import FlexBox from 'components/flexBox'
import WidgetBox from 'components/widgetBox'

const AdvertWidget = () => {
    const { palette } = useTheme()

    return (
        <WidgetBox>
            <FlexBox>
                <Typography variant="h5" color={palette.neutral.dark} fontWeight="500">Sponsored</Typography>
                <Typography color={palette.neutral.medium}>create Ad</Typography>
            </FlexBox>
            {/* ad image */}
            <img src="../assets/advert.jpg" alt="ad" width="100%" height="auto" style={{ borderRadius: "0.75rem", margin: "0.75rem 0"}}/>
            <FlexBox>
                <Typography color={palette.neutral.main}>Samsung</Typography>
                <Typography color={palette.neutral.medium}>Samsung.com</Typography>
            </FlexBox>
            <Typography color={palette.neutral.medium} m="0.5rem 0">Get our new series of phones. With futuristic camera like none other.</Typography>
        </WidgetBox>
    )
}

export default AdvertWidget