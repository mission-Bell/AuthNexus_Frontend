"use client";
import React from "react";
import Box from "@mui/material/Box";
import LoginFormSection from "@/components/sections/LoginFormSection";
import logoImage from "@/public/images/hyomolabo_image.png";
import Image from "next/image";
import { postLogin } from "@/actions/Login";
const LoginTemplate = () => {
  const handleLogin = () => {
    console.log("ログインボタンが押されました");
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          width: {
            xs: "100%",
            sm: "80%",
            md: "60%",
            lg: "50%",
            xl: "40%",
          },
        }}
        p={2}
      >
        <Box>
          <Image src={logoImage} alt="logo" />
        </Box>
        <Box>
          <LoginFormSection onClick={postLogin} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginTemplate;
