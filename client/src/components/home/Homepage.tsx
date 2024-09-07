import { homepageStyles } from '../../styles/homepage-styles'
import { Box, Typography } from '@mui/material'
import Footer from './Footer'

const Homepage = () => {
  return <Box sx={homepageStyles.container}>
    <Box sx={homepageStyles.wrapper}>
      <Typography sx={homepageStyles.text}>
        Write and Share Your Blog With Millions Of People
      </Typography>
      <img width="50%" height="50%"
        //@ts-ignore
        style={homepageStyles.image}
        alt="article"
        src="/assets/images/blog.jpg" />
    </Box>
    <Box sx={homepageStyles.wrapper}>
      <img width="50%" height="50%"
        //@ts-ignore
        style={homepageStyles.image}
        alt="article"
        src="/assets/images/blog-two.jpg" />
      <Typography sx={homepageStyles.text}>
        Write and Share Your Blog With Millions Of People
      </Typography>
    </Box>
    <Box sx={homepageStyles.wrapper}>
      <Typography sx={homepageStyles.text}>
        Write and Share Your Blog With Millions Of People
      </Typography>
      <img width="50%" height="50%"
        //@ts-ignore
        style={homepageStyles.image}
        alt="article"
        src="/assets/images/blog-three.jpg" />
    </Box>
    <Footer />
  </Box>
}

export default Homepage