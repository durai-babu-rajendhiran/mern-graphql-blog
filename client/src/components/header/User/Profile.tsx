//@ts-nocheck
import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import {profileStyles} from "../../../styles/profile-styles"
import BlogItem from '../../blogs/BlogItem'
const Profile = () => {
  return (
    <Box sx={profileStyles.container}>
      <Box sx={profileStyles.blogsContainer}>
        <Typography sx={profileStyles.text} variant="h3">My Post</Typography>
     <Box sx={profileStyles.cardContainer}>
     {[1,2,3,4,5].map((item)=><BlogItem blog={{title:item.toString(),content:item.toString(),date:new Date(),id:item.toString()}} />)}
     </Box>
      </Box>
      <Box sx={profileStyles.profileContainer}>
      <Box sx={profileStyles.userContainer}>
<Avatar sx={profileStyles.avatar}></Avatar>
<Typography variant="h5" fontFamily={"Work Sans"}>
Durai Babu
</Typography>
<Typography variant="h5" fontFamily={"Work Sans"}>
Email:duraibabu200@gmail.com
</Typography>
<Typography variant="h5" fontFamily={"monospace"}>
you Write {10} Blogs 
</Typography> 
</Box>
      </Box>
    </Box>
  )
}

export default Profile