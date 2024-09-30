import LoginForm from "@/components/LoginForm";
import { Box } from "@mui/material";
import React from "react";

const LoginPage = () => {
  return (
    <Box
      sx={{
        height: "1000px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
