import { homepageStyles } from '../../styles/homepage-styles'
import { Box, Typography, Button } from '@mui/material'

const Footer = () => {
    return (<Box sx={homepageStyles.footerContainer}>
        <Button variant='contained' sx={homepageStyles.footerBtn}>
            view Article
        </Button>
        <Typography sx={homepageStyles.footerText}>Made With &#x1F498; BY Durai  </Typography>
        <Button variant='contained' sx={homepageStyles.footerBtn}>
            Publish One
        </Button>
    </Box>
    )
}

export default Footer