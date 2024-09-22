import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import { authStyle } from '../../styles/auth-style';
import { ImBlogger } from 'react-icons/im';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { USER_LOGIN,USER_REGISTER } from '../graphql/mutations';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import {useNavigate} from "react-router-dom"
// Define the form data interface
type FormData = {
  name?: string; // Optional for login
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [login] = useMutation(USER_LOGIN);
  const [signup] = useMutation(USER_REGISTER);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const [isSignup, setIsSignup] = useState(false);
  const onResReceived = (data: any) => {
    if (data.signup) {
      const { id, email, name } = data.signup
      localStorage.setItem("userData", JSON.stringify({ id, email, name }))
    } else {
      const { id, email, name } = data.login
      localStorage.setItem("userData", JSON.stringify({ id, email, name }))
    }
    dispatch(authActions.login())
    navigate("/blogs")
  }
  const onSubmit = async ({ name, email, password }: FormData) => {
    if (isSignup) {
      try {
       var signUpResponse = await signup({ variables: {name,email, password } })
          if(signUpResponse.data){
            onResReceived(signUpResponse.data)
          }
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      try {
       var loginResponse = await login({ variables: { email, password } })
      if(loginResponse.data){
        onResReceived(loginResponse.data)
      };
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <Box sx={authStyle.container}>
      <Box sx={authStyle.logoTitle}>
        <ImBlogger
          size={'30px'}
          style={{
            borderRadius: '50%',
            padding: '10px',
            background: '#6c5252',
          }}
        />
        <Typography sx={authStyle.logoText}>DemoDEV</Typography>
      </Box>
      <Box sx={{ ...authStyle.formContainer, width: isBelowMd ? '50%' : '200px' }}>
        <Typography sx={authStyle.logoText}>{isSignup ? 'Sign up' : 'Login'}</Typography>
{/* @ts-ignore */}
        <form style={authStyle.form} onSubmit={handleSubmit(onSubmit)}>
          {isSignup && (
            <TextField
              InputProps={{ style: { borderRadius: 20 } }}
              margin="normal"
              label="Name"
              {...register('name', { required: true })}
              error={Boolean(errors.name)}
              helperText={errors.name ? 'Name is required' : ''}
            />
          )}
          <TextField
            InputProps={{ style: { borderRadius: 20 } }}
            margin="normal"
            label="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Invalid email format',
              },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email ? errors.email.message : ''}
          />
          <TextField
            error={Boolean(errors.password)}
            InputProps={{ style: { borderRadius: 20 } }}
            margin="normal"
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum length is 6' } })}
            helperText={errors.password ? errors.password.message : ''}
          />
          <Button variant="contained" sx={authStyle.submitBtn} type="submit">
            Submit
          </Button>
          <Button
            type="button"
            onClick={() => setIsSignup((prev) => !prev)}
           //@ts-ignore 
            sx={{ ...authStyle.submitBtn, ...authStyle.switchBtn }}
          >
            Switch to {isSignup ? 'login' : 'signup'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Auth;
