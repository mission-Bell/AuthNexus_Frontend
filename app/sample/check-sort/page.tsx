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
  Checkbox,
} from '@mui/material';

type RowData = {
  id: number;
  col1: string; // TextField の値
  col2: string; // Select の値
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
  const [order, setOrder] = useState<Order>('asc'); // ソート方向
  const [orderBy, setOrderBy] = useState<keyof RowData>('col1'); // ソート対象列
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // 選択された行のID

  // 行の選択処理
  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // 全選択処理
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIds(rows.map((row) => row.id));
    } else {
      setSelectedIds([]);
    }
  };

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

  // フィルタリングとソートを適用
  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const valA = a[orderBy] || '';
      const valB = b[orderBy] || '';
      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, order, orderBy]);

  const isAllSelected = rows.length > 0 && selectedIds.length === rows.length;

  return (
    <Paper sx={{ p: 2 }}>
      <TableContainer>
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
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.includes(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </TableCell>
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

      {/* 選択された行の表示 */}
      <div style={{ marginTop: '16px' }}>
        選択された行のID: {JSON.stringify(selectedIds)}
      </div>
    </Paper>
  );
}
