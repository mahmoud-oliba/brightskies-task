import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

interface AddUserProps {
  open: boolean;
  onClose: () => void;
  form: UserForm;
  setForm: React.Dispatch<React.SetStateAction<UserForm>>;
  onAdd: () => void;
}

interface UserForm {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default function AddUser({ open, onClose, form, setForm, onAdd }: AddUserProps) {
  const [touched, setTouched] = useState(false);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isFormValid =
    form.name.trim() &&
    form.username.trim() &&
    form.email.trim() &&
    emailValid &&
    form.phone.trim() &&
    form.website.trim() &&
    form.address.street.trim() &&
    form.address.suite.trim() &&
    form.address.city.trim() &&
    form.address.zipcode.trim() &&
    form.address.geo.lat.trim() &&
    form.address.geo.lng.trim() &&
    form.company.name.trim() &&
    form.company.catchPhrase.trim() &&
    form.company.bs.trim();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
        {/* Personal Info Section */}
        <Typography variant="subtitle1" fontWeight={700} mb={1}>
          Personal Info
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          label="Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          fullWidth
          autoFocus
          required
        />
        <TextField
          label="Username"
          value={form.username}
          onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
          fullWidth
          required
        />
        <TextField
          label="Email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          onBlur={() => setTouched(true)}
          fullWidth
          type="email"
          error={Boolean(form.email) && !emailValid && touched}
          helperText={Boolean(form.email) && !emailValid && touched ? 'Enter a valid email address' : ''}
          required
        />
        <TextField
          label="Phone"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          fullWidth
          required
        />
        <TextField
          label="Website"
          value={form.website}
          onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
          fullWidth
          required
        />

        {/* Address Section */}
        <Typography variant="subtitle1" fontWeight={700} mt={2} mb={1}>
          Address
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          label="Street"
          value={form.address.street}
          onChange={e => setForm(f => ({ ...f, address: { ...f.address, street: e.target.value } }))}
          fullWidth
          required
        />
        <TextField
          label="Suite"
          value={form.address.suite}
          onChange={e => setForm(f => ({ ...f, address: { ...f.address, suite: e.target.value } }))}
          fullWidth
          required
        />
        <TextField
          label="City"
          value={form.address.city}
          onChange={e => setForm(f => ({ ...f, address: { ...f.address, city: e.target.value } }))}
          fullWidth
          required
        />
        <TextField
          label="Zipcode"
          value={form.address.zipcode}
          onChange={e => setForm(f => ({ ...f, address: { ...f.address, zipcode: e.target.value } }))}
          fullWidth
          required
        />
        <div className='flex flex-row gap-2'>
        <TextField
          label="Latitude"
          value={form.address.geo.lat}
          onChange={e => setForm(f => ({ ...f, address: { ...f.address, geo: { ...f.address.geo, lat: e.target.value } } }))}
          fullWidth
          required
        />
        <TextField
          label="Longitude"
          value={form.address.geo.lng}
          onChange={e => setForm(f => ({ ...f, address: { ...f.address, geo: { ...f.address.geo, lng: e.target.value } } }))}
          fullWidth
          required
        />
        </div>

        {/* Company Section */}
        <Typography variant="subtitle1" fontWeight={700} mt={2} mb={1}>
          Company
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          label="Company Name"
          value={form.company.name}
          onChange={e => setForm(f => ({ ...f, company: { ...f.company, name: e.target.value } }))}
          fullWidth
          required
        />
        <div className='flex flex-row gap-2'>
        <TextField
          label="Catch Phrase"
          value={form.company.catchPhrase}
          onChange={e => setForm(f => ({ ...f, company: { ...f.company, catchPhrase: e.target.value } }))}
          fullWidth
          required
        />
        <TextField
          label="BS"
          value={form.company.bs}
          onChange={e => setForm(f => ({ ...f, company: { ...f.company, bs: e.target.value } }))}
          fullWidth
          required
        />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onAdd} color="primary" variant="contained" disabled={!isFormValid}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
