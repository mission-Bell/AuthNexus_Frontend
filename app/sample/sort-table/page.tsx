'use client';
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  MenuItem,
  Select,
} from '@mui/material';

type RowData = {
  id: number;
  col1: string; // TextField の値を管理
  col2: string; // Select の値を管理
  category: string;
};

// 初期データソース
const initialRows: RowData[] = [
  { id: 1, col1: '', col2: '', category: 'A' },
  { id: 2, col1: '', col2: '', category: 'B' },
  { id: 3, col1: '', col2: '', category: 'C' },
  { id: 4, col1: '', col2: '', category: 'A' },
];

type Order = 'asc' | 'desc';

export default function EnhancedTable() {
  const [rows, setRows] = useState<RowData[]>(initialRows);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof RowData>('col1');

  // TextField や Select の入力を更新する処理
  const handleInputChange = (id: number, field: keyof RowData, value: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  // ソート処理
  const handleSort = (column: keyof RowData) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  // ソートされたデータ
  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const valA = a[orderBy] || ''; // null 値を回避
      const valB = b[orderBy] || '';
      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, order, orderBy]);

  return (
    <Paper sx={{ p: 2 }}>
      {/* テーブル */}
      <TableContainer>
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'col1'}
                  direction={orderBy === 'col1' ? order : 'asc'}
                  onClick={() => handleSort('col1')}
                >
                  Column 1 (TextField)
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'col2'}
                  direction={orderBy === 'col2' ? order : 'asc'}
                  onClick={() => handleSort('col2')}
                >
                  Column 2 (Select)
                </TableSortLabel>
              </TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <TextField
                    value={row.col1}
                    onChange={(e) =>
                      handleInputChange(row.id, 'col1', e.target.value)
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={row.col2}
                    onChange={(e) =>
                      handleInputChange(row.id, 'col2', e.target.value)
                    }
                    displayEmpty
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="">すべて</MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{row.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
