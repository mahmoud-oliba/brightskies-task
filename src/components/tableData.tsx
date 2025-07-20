import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import type { User } from '../models/user';

interface TableDataProps {
  users: User[];
  isLoading: boolean;
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Users Name',
    flex: 1,
    disableColumnMenu: true,
    hideSortIcons: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    disableColumnMenu: true,
    hideSortIcons: true,
  },
  {
    field: 'company',
    headerName: 'Company Name',
    flex: 1,
    disableColumnMenu: true,
    hideSortIcons: true,
    valueGetter: (value, row) => `${row.company.name || ''}`,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TableData({ users, isLoading }: TableDataProps) {
  return (
    <Paper
      sx={{
        height: 400,
        width: { xs: '100%', sm: '90%', md: '80%', lg: '70%' },
        px: { xs: 2, sm: 4, md: 8, lg: 10 },
        mx: 'auto',
      }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15, 20]}
        sx={{ border: 0 }}
        loading={isLoading}
      />
    </Paper>
  );
}
