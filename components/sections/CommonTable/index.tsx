"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface CommonTableProps {
  cellValues: any[][];
  header: string[];
}

export default function CommonTable({ header, cellValues }: CommonTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {header.map((cell, cellIndex) => (
              <StyledTableCell
                key={cellIndex}
                align={cellIndex === 0 ? "left" : "right"}
              >
                {cell}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cellValues.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <StyledTableCell
                  key={cellIndex}
                  align={cellIndex === 0 ? "left" : "right"}
                >
                  {cell}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
