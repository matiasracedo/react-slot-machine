import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'slot1', headerName: 'Slot 1', type: 'number', width: 100 },
  { field: 'slot2', headerName: 'Slot 2', type: 'number', width: 100 },
  { field: 'slot3', headerName: 'Slot 3', type: 'number', width: 100 },
  {
    field: 'date',
    headerName: 'Date',
    width: 160,
  },
];


export default function DataTable({ rows }) {  

  return (
    <div style={{ height: 400, width: '50%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
