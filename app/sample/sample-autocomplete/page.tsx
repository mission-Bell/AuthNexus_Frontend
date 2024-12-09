"use client";
import React from "react";
import { Autocomplete } from "@mui/material";
import { postData } from "@/actions/SendServer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
const SampleAutocompletePage = () => {
  const handleClick = async () => {
    const formData = new FormData();
    formData.append("name", "test");
    const res = await postData(formData);
    console.log("res", res);
  };

  const myParams = [
    {
      id: 1,
      label: "jon",
    },
    {
      id: 2,
      label: "jane",
    },
    {
      id: 3,
      label: "tom",
    },
  ];
  return (
    <div>
      <Box component={"form"} action={postData}>
        <Autocomplete
          options={myParams}
          renderInput={(params) => (
            <TextField {...params} name="autocomp-text" />
          )}
        ></Autocomplete>
        <Button onClick={handleClick} type="submit">
          post
        </Button>
      </Box>
    </div>
  );
};

export default SampleAutocompletePage;
