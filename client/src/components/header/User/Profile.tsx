//@ts-nocheck
import { Avatar, Box, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import { profileStyles } from "../../../styles/profile-styles"
import BlogItem from '../../blogs/BlogItem'
import { GET_USER_BLOGS } from '../../graphql/queries'
import { useQuery } from '@apollo/client'

const Profile = () => {
  const { loading, data, error } = useQuery(GET_USER_BLOGS, {
    variables: {
      id: JSON.parse(localStorage.getItem("userData") as String).id
    }
  })
  console.log(data)

  if (error) {
    return <p>Error</p>
  }
  return loading ? (
    <LinearProgress />
  ) : data && (
    <Box sx={profileStyles.container}>
      <Box sx={profileStyles.blogsContainer}>
        <Typography sx={profileStyles.text} variant="h3">My Post</Typography>
        <Box sx={profileStyles.cardContainer}>
          {data.user.blogs.map((item) => <BlogItem blog={{ title: item.tilte, content: item.content, date: item.date, id: item.id }} />)}
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