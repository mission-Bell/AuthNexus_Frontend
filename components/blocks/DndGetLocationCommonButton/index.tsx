import React from "react";
import { Box, Button } from "@mui/material";

interface DndGetLocationCommonButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const DndGetLocationCommonButton = ({
  label,
  onClick,
}: DndGetLocationCommonButtonProps) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Button onClick={onClick} variant="outlined">
        {label}
      </Button>
    </Box>
  );
};

export default DndGetLocationCommonButton;
