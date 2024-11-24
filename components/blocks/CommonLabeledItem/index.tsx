import React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

export interface CommonLabeledItemProps {
  label: string;
  children: React.ReactElement;
  // 比率
  ratio?: "1-1" | "1-2" | "2-1";
}

const CommonLabeledItem = ({
  label,
  children,
  ratio,
}: CommonLabeledItemProps) => {
  const LabelGridSize = ratio === "1-2" ? 4 : ratio === "2-1" ? 8 : 6;
  const ItemGridSize = ratio === "1-2" ? 8 : ratio === "2-1" ? 4 : 6;

  return (
    <Grid container>
      <Grid
        size={{ xs: 12, sm: LabelGridSize }}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.07)",
          border: "1px solid rgba(0, 0, 0, 0.07)",
          padding: "8px",
          fontWeight: "bold",
        }}
      >
        <Box textAlign="left">{label}</Box>
      </Grid>
      <Grid
        size={{ xs: 12, sm: ItemGridSize }}
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.07)",
          padding: "8px",
        }}
      >
        <Box textAlign="left">{children}</Box>
      </Grid>
    </Grid>
  );
};

export default CommonLabeledItem;
