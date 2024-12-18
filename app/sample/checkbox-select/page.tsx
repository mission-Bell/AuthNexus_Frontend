'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from '@mui/material';

type RowData = {
  id: number;
  col1: string;
  col2: string;
};

const rows: RowData[] = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGrid', col2: 'MUI' },
  { id: 3, col1: 'React', col2: 'Table' },
];

export default function CustomTable() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 全選択チェックボックスの状態
  const isAllSelected = rows.length > 0 && selectedIds.length === rows.length;

  // 単一行の選択状態をトグルする処理
  const handleRowCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // 全選択/解除の処理
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIds(rows.map((row) => row.id));
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedIds.length > 0 && selectedIds.length < rows.length
                }
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell>Column 1</TableCell>
            <TableCell>Column 2</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedIds.includes(row.id)}
                  onChange={() => handleRowCheckboxChange(row.id)}
                />
              </TableCell>
              <TableCell>{row.col1}</TableCell>
              <TableCell>{row.col2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ padding: '16px' }}>
        選択された行: {JSON.stringify(selectedIds)}
      </div>
    </TableContainer>
  );
}
