import {
  Box, Button, InputLabel,
  TextField, Typography, useTheme,
  useMediaQuery
} from '@mui/material'
import React from 'react'
import { authStyle } from '../../styles/auth-style'
import { ImBlogger } from 'react-icons/im'

const Auth = () => {
  const theme = useTheme()
  const isBeloweMd = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <Box sx={authStyle.container}>
      <Box sx={authStyle.logoTitle}>
        <ImBlogger
          size={"30px"}
          style={{
            borderRadius: "50%",
            padding: "10px",
            background: "#6c5252"
          }} />
        <Typography sx={authStyle.logoText}>
          DemoDEV
        </Typography>
      </Box>
      <Box sx={{ ...authStyle.formContainer, width: isBeloweMd ? "50%" : "200px" }}>
        <Typography sx={authStyle.logoText}>
          Login
        </Typography>
        <form style={authStyle.form}>
          <InputLabel aria-label="name" ></InputLabel>
          <TextField aria-label="mame" label="Name" />
          <InputLabel aria-label="email"></InputLabel>
          <TextField aria-label="email" label="Email" type='email' />
          <InputLabel aria-label="password"></InputLabel>
          <TextField aria-label="password" label="Password" type="password" />
          <Button variant="contained" sx={authStyle.submitBtn}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default Auth