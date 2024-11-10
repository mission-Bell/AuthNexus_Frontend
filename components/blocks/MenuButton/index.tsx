import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const MenuButton = ({ icon, label, onClick }: MenuButtonProps) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Button
        onClick={onClick}
        sx={{
          boxShadow: "1px 2px 3px 1px #333333",
        }}
      >
        {icon}
      </Button>
      <Typography pt="0.5%">{label}</Typography>
    </Box>
  );
};

export default MenuButton;
