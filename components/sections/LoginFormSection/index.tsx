import React from "react";
import CommonButton from "@/components/elements/CommonButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { postLogin } from "@/actions/Login";

const LoginFormSection = ({ onClick }: { onClick: () => void }) => {
  return (
    <Box component={"form"} action={postLogin}>
      <Box
        sx={{
          mb: {
            xs: 2,
            sm: 4,
            md: 6,
            lg: 8,
            xl: 10,
          },
        }}
      >
        <Box>
          <TextField
            id="outlined-basic"
            type="text"
            name="username"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            type="password"
            name="password"
            variant="outlined"
            fullWidth
          />
        </Box>
      </Box>

      <Box>
        <CommonButton label="ログイン" type="submit" />
      </Box>
    </Box>
  );
};

export default LoginFormSection;
