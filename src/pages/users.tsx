import TableData from '../components/tableData';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import type { User } from '../models/user';
import AddUser from '../components/addUser';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().startsWith(search.toLowerCase())
  );

  const handleAddUser = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Failed to add user');
      
      let newUser: any;
      try {
        newUser = await response.json();
      } catch {
        newUser = null;
      }
      
      // Fallback: if no id is returned, generate a temporary one
      if (!newUser || !newUser.id) {
        newUser = { ...form, id: users.length ? Math.max(...users.map(u => u.id || 0)) + 1 : 1 };
      }
      
      setUsers(prev => [...prev, newUser]);
      setOpen(false);
      setForm({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: { lat: '', lng: '' },
        },
        company: { name: '', catchPhrase: '', bs: '' },
      });
      setSnackbar({ open: true, message: 'User added successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error adding user.', severity: 'error' });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-end mb-4">
        <div className="flex flex-col items-center w-full sm:w-auto">
          <h1 className="text-3xl px-4 py-5 sm:text-4xl font-extrabold text-gray-800 mb-2 text-center tracking-tight">
            Users
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end sm:items-center mb-6 w-full px-2 sm:px-6">
        <TextField
          variant="outlined"
          placeholder="Search users..."
          size="small"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{
            minWidth: { xs: '100%', sm: 220 },
            maxWidth: { xs: '100%', sm: 300 },
            bgcolor: 'background.paper',
            borderRadius: 999,
            boxShadow: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 999,
              backgroundColor: 'background.paper',
              fontSize: '1rem',
              fontWeight: 500,
              px: 1.5,
              py: 0.5,
              '& fieldset': {
                borderColor: 'grey.300',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
                borderWidth: 2,
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 3,
            boxShadow: 2,
            fontWeight: 'bold',
            fontSize: '1rem',
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 1 },
            textTransform: 'none',
            minWidth: { xs: '100%', sm: 'auto' },
          }}
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
      </div>
      <TableData users={filteredUsers} isLoading={isLoading} />
      <AddUser
        open={open}
        onClose={() => setOpen(false)}
        form={form}
        setForm={setForm}
        onAdd={handleAddUser}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
