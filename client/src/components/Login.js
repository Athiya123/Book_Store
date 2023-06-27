import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '300px',
  },
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });
      const { user, token } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
      setEmail('');
      setPassword('');
      history.push('/listing');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <FormContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 8,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          {error && (
            <Typography variant="body1" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              margin="normal"
            />
            <SubmitButton type="submit" variant="contained" color="primary">
              Login
            </SubmitButton>
          </Form>
        </Box>
      </FormContainer>
    </Container>
  );
}

export default Login;