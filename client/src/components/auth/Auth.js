import {
  Box, Button, InputLabel,
  TextField, Typography, useTheme,
  useMediaQuery
} from '@mui/material'
import React, { useState } from 'react'
import { authStyle } from '../../styles/auth-style'
import { ImBlogger } from 'react-icons/im'
import { useForm, SubmitHandler } from "react-hook-form"

const Auth = () => {
  const theme = useTheme()
  const isBeloweMd = useMediaQuery(theme.breakpoints.down("md"))
  const [isSignup, setisSignup] = useState()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
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
          {isSignup ? "Sign up" : "Login"}
        </Typography>
        <form style={authStyle.form}>
          {isSignup && (
            <>
              <InputLabel aria-label="name" ></InputLabel>
              <TextField InputProps={{style:{borderRadius:20}}} 
              margin="normal" aria-label="mame" label="Name" 
              {...register("name",{required:true})}
              />
            </>
          )}
          <InputLabel aria-label="email"></InputLabel>
          <TextField InputProps={{style:{borderRadius:20}}} 
          margin="normal" aria-label="email" label="Email" type='email' 
          {...register("email",{required:true,validate:(val:string)=>/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)})}
          />
          <InputLabel aria-label="password"></InputLabel>
          <TextField InputProps={{style:{borderRadius:20}}} margin="normal" aria-label="password" label="Password" type="password" />
       
          <Button variant="contained" sx={authStyle.submitBtn}>
            Submit
          </Button>
    
          <Button
          onClick={()=>setisSignup((prev)=> !prev)}
          sx={{...authStyle.submitBtn,...authStyle.switchBtn}}>
            Switch to   {isSignup?"login":"signup"}
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default Auth