import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import { blogStyles, randomBgColor } from '../../styles/blog-list-styles'
import { BlogType } from "../../types/types"
import { FcCalendar } from "react-icons/fc"
import { useNavigate } from 'react-router-dom'
type Props = {
    blog: BlogType
}
const BlogItem = (props: Props) => {
    const navigate = useNavigate()
    const handleClick =()=>{
        navigate("/blog/view/"+props.blog.id)
    }
    
    return (
        <Card 
        onClick={handleClick}
        sx={blogStyles.card}>
            <Box sx={{ ...blogStyles.cardHeader, bgcolor: randomBgColor() }}>
                <Box sx={blogStyles.dateContainer}>
                    <FcCalendar size={"30px"} />
                    <Typography fontSize={"20px"}
                        color={"white"}
                        variant='caption'>
                        {new Date(Number(props.blog.date)).toDateString()}
                    </Typography>
                </Box>
                <Typography variant='h4' sx={blogStyles.title}>
                    {props.blog.title}
                </Typography>
            </Box>
            <Box sx={blogStyles.cardContent}>
                <Typography sx={blogStyles.contentText}>
                    {props.blog.content}
                </Typography>
            </Box>
        </Card>
    )
}

export default BlogItem