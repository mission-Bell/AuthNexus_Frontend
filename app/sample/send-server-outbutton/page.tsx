"use client";
import Box from "@mui/material/Box";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { postData } from "@/actions/SendServer";
const SendServerOutButtonPage = () => {
  return (
    <Box>
      <Box component={"form"} action={postData} id="sample-form">
        <TextField name="name" />
        {/* submitじゃないと発火しない */}
        <Button type="button">post</Button>
      </Box>
      <Button type="submit" form="sample-form">
        out button
      </Button>
      <Box
        component={"form"}
        onSubmit={() => postData(new FormData())}
        id="sample-form2"
      >
        <TextField name="name" />
        <Button type="submit">post</Button>
      </Box>
    </Box>
  );
};

export default SendServerOutButtonPage;
