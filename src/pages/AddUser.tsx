import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import * as api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';

export default function AddUser() {
  const { token } = useSelector((s: RootState) => s.auth);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success'|'error'>('success');

  const handleAdd = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      setSnackbarMsg('Usuario, email y contraseña requeridos');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (!token) {
      setSnackbarMsg('No autenticado');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    try {
      await api.addUser({ username, email, password }, token);
      setSnackbarMsg('Usuario agregado');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => navigate('/users'), 1000);
    } catch (err: any) {
      setSnackbarMsg(err.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Agregar Usuario</Typography>
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
        <TextField
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAdd} fullWidth>
          Agregar
        </Button>
        <Button variant="text" color="inherit" onClick={() => navigate('/users')} fullWidth sx={{ mt: 1 }}>
          Cancelar
        </Button>
      </Paper>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
