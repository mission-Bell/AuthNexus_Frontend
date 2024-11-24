import { Box, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import Paper from "@mui/material/Paper";

export interface MenuButtonProps {
  icon: React.ReactElement;
  label: string;
  link: string;
}

const MenuButton = ({ icon, label, link }: MenuButtonProps) => {
  // iconにスタイル追加
  const styledIcon = React.cloneElement(icon, {
    sx: {
      fontSize: {
        xs: "30px",
        sm: "40px",
        md: "50px",
        lg: "60px",
        xl: "70px",
      },
    },
  });

  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Link
        href={link}
        style={{
          textDecorationLine: "none",
        }}
      >
        <Paper
          sx={{
            py: {
              xs: "5px",
              sm: "10px",
              md: "15px",
              lg: "20px",
              xl: "25px",
            },
          }}
        >
          {styledIcon}
          <Typography>{label}</Typography>
        </Paper>
      </Link>
    </Box>
  );
};

export default MenuButton;
