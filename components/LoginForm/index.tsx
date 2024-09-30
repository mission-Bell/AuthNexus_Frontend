import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const LoginForm = () => {
  return (
    <FormControl>
      <TextField />

      <TextField />
      <Button variant="outlined">login</Button>
    </FormControl>
  );
};

export default LoginForm;
