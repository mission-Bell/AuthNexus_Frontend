"use client";

import React, { useMemo } from "react";
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
} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";

type RowData = {
  id: number;
  col1: string;
  col2: string;
  category: string;
};

const initialRows: RowData[] = [
  { id: 1, col1: "", col2: "", category: "A" },
  { id: 2, col1: "", col2: "", category: "B" },
  { id: 3, col1: "", col2: "", category: "C" },
  { id: 4, col1: "", col2: "", category: "A" },
];

type Order = "asc" | "desc";

export default function EnhancedTable() {
  const { control, handleSubmit } = useForm({
    defaultValues: { rows: initialRows },
  });

  const { fields, replace, update } = useFieldArray({
    control,
    name: "rows",
  });

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof RowData>("col1");

  const handleSort = (column: keyof RowData) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
    const sorted = [...fields].sort((a, b) => {
      const valA = a[column] || "";
      const valB = b[column] || "";
      if (valA < valB) return isAsc ? -1 : 1;
      if (valA > valB) return isAsc ? 1 : -1;
      return 0;
    });
    replace(sorted);
  };

  const onSubmit = (data: { rows: RowData[] }) => {
    console.log("Form Data:", data);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "col1"}
                    direction={orderBy === "col1" ? order : "asc"}
                    onClick={() => handleSort("col1")}
                  >
                    Column 1 (TextField)
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "col2"}
                    direction={orderBy === "col2" ? order : "asc"}
                    onClick={() => handleSort("col2")}
                  >
                    Column 2 (Select)
                  </TableSortLabel>
                </TableCell>
                <TableCell>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <TextField
                      value={row.col1}
                      onChange={(e) => update(index, { ...row, col1: e.target.value })}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.col2}
                      onChange={(e) => update(index, { ...row, col2: e.target.value })}
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
        <button type="submit">Submit</button>
      </form>
    </Paper>
  );
}
