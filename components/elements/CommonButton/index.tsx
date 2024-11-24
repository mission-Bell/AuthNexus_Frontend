import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface CommonButtonProps {
  label: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
}

const CommonButton = ({ label, onClick, type }: CommonButtonProps) => {
  // buttonのスタイルをかっこいいグレーにする
  const style = {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    width: "100%",
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Button
        onClick={onClick ? () => onClick() : undefined}
        sx={style}
        type={type}
      >
        <Typography>{label}</Typography>
      </Button>
    </Box>
  );
};

export default CommonButton;
