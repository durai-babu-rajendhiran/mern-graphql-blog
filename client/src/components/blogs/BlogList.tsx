import { Box } from '@mui/material'
import React from 'react'
import { blogStyles } from '../../styles/blog-list-styles'
import BlogItem from './BlogItem'
import { BlogType } from "../../types/types"
type props = {
    blogs: BlogType[]
}

const BlogList = (props: props) => {
    return (
        <Box sx={blogStyles.container}>
            {props.blogs.map((blog: BlogType) => <BlogItem blog={blog} />)}
        </Box>
    )
}

export default BlogList