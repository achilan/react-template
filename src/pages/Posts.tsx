import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchPosts, addPost, updatePost, deletePost, Post } from '../features/posts/postsSlice';
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
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Posts() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useSelector((s: RootState) => s.posts);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editing, setEditing] = useState<Post | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success'|'error'>('success');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAdd = async () => {
    if (!title.trim() || !body.trim()) {
      setSnackbarMsg('Title & Body required');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    await dispatch(addPost({ title, body, userId: 1 }));
    setTitle(''); setBody('');
    setSnackbarMsg('Post added');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const startEdit = (p: Post) => {
    setEditing(p); setTitle(p.title); setBody(p.body); setOpenDialog(true);
  };

  const saveEdit = async () => {
    if (!editing) return;
    await dispatch(updatePost({ ...editing, title, body }));
    setEditing(null); setTitle(''); setBody(''); setOpenDialog(false);
    setSnackbarMsg('Post updated');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete post?')) return;
    await dispatch(deletePost(id));
    setSnackbarMsg('Post deleted');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">Posts CRUD (JSONPlaceholder)</Typography>
      <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
        <Typography variant="h6" gutterBottom>Add New Post</Typography>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
        />
        <TextField
          label="Body"
          value={body}
          onChange={e => setBody(e.target.value)}
          sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
        />
        <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mt: { xs: 2, sm: 0 } }}>
          Add
        </Button>
      </Paper>

      {loading && <Typography>Loading...</Typography>}
      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Body</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.body}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => startEdit(p)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(p.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Body"
            value={body}
            onChange={e => setBody(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenDialog(false); setEditing(null); setTitle(''); setBody(''); }} color="inherit">Cancel</Button>
          <Button onClick={saveEdit} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
