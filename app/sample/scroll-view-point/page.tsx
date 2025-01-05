'use client';
import React, { useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows = [
  { id: "row1", name: "Row 1", value: 100 },
  { id: "row2", name: "Row 2", value: 200 },
  { id: "row3", name: "Row 3", value: 300 },
  { id: "row4", name: "Row 4", value: 400 },
  { id: "row5", name: "Row 5", value: 500 },
  { id: "row6", name: "Row 6", value: 600 },
  { id: "row7", name: "Row 7", value: 700 },
  { id: "row8", name: "Row 8", value: 800 },
  { id: "row9", name: "Row 9", value: 900 },
  { id: "row10", name: "Row 10", value: 1000 },
  { id: "row11", name: "Row 11", value: 1100 },
  { id: "row12", name: "Row 12", value: 1200 },
  { id: "row13", name: "Row 13", value: 1300 },
  { id: "row14", name: "Row 14", value: 1400 },
  { id: "row15", name: "Row 15", value: 1500 },
];

export default function FixedHeaderTable() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRowId = "row6"; // 先頭に表示したい要素のID

  useEffect(() => {
    const container = containerRef.current;
    const targetElement = document.getElementById(targetRowId);

    if (container && targetElement) {
      // スクロール位置を計算
      const containerTop = container.getBoundingClientRect().top;
      const targetTop = targetElement.getBoundingClientRect().top;

      // スクロール位置を設定
      container.scrollTop += targetTop - containerTop;
    }
  }, []);

  return (
    <TableContainer component={Paper} ref={containerRef} style={{ maxHeight: 400, overflow: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} id={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
