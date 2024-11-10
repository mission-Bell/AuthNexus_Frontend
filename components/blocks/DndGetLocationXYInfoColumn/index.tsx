import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface DndGetLocationXYInfoColumnProps {
  index: string;
  x: string;
  y: string;
}

const DndGetLocationXYInfoColumn = ({
  index,
  x,
  y,
}: DndGetLocationXYInfoColumnProps) => {
  return (
    <Box>
      <Stack spacing={2} direction="row">
        <Typography>{index}</Typography>
        <Typography>{x}</Typography>
        <Typography>{y}</Typography>
      </Stack>
    </Box>
  );
};

export default DndGetLocationXYInfoColumn;
