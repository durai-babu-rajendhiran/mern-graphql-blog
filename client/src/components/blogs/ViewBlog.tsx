import React from 'react'
import { blogPageStyles } from '../../styles/view-styles'
import { Box, Typography } from '@mui/material'

const ViewBlog = () => {
  return (
    <Box sx={blogPageStyles.container}>
<Box sx={blogPageStyles.profileHeader}>
  <Typography>
durai babu R
  </Typography>
  <Typography sx={blogPageStyles.profileHeaderitems}>
    durai@gmail.com
  </Typography>

</Box>
  <Typography sx={blogPageStyles.blogTitle}>
    Blog Header
  </Typography>
  <Typography sx={blogPageStyles.blogContent}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod at repellendus odio, officiis architecto, itaque vero doloribus reiciendis enim ipsam facere eos repudiandae sint aperiam iure, modi in libero corrupti.
  </Typography>
    </Box>
  )
}

export default ViewBlog