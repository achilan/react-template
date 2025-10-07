import React, { useState } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { login } from '../features/users/authSlice';
import { Container, Typography, TextField, Button, Alert, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useAppDispatch();
  const { loading, error, token } = useSelector((s: RootState) => s.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    await dispatch(login({ username, password }));
  };

  React.useEffect(() => {
    if (token) navigate('/users');
  }, [token, navigate]);

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom align="center">Login</Typography>
        <TextField
          label="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth disabled={loading}>
          Ingresar
        </Button>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Container>
  );
}
