import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../utils/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  User,
} from "../features/users/usersSlice";
import * as api from '../utils/api';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const dispatch = useAppDispatch();
  const { token } = useSelector((s: RootState) => s.auth);
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    api.getUsers(token)
      .then(data => { setUsers(data); setError(null); })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleAdd = () => {
    navigate("/users/add");
  };

  const handleEdit = (id: number) => {
    navigate(`/users/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Eliminar usuario?")) return;
    if (!token) return;
    try {
      await api.deleteUser(id, token);
      setUsers(users.filter(u => u.id !== id));
      setSnackbarMsg("Usuario eliminado");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (err: any) {
      setSnackbarMsg(err.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Lista de Usuarios
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          sx={{ mt: { xs: 2, sm: 0 } }}
        >
          Agregar Usuario
        </Button>
      </Paper>

      {loading && <Typography>Cargando...</Typography>}
      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Usuario</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEdit(u.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(u.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
