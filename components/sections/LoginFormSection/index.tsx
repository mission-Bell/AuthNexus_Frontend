import React from "react";
import CommonButton from "@/components/elements/CommonButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const LoginFormSection = ({
  onClick,
}: {
  onClick: (formData: FormData) => Promise<React.JSX.Element>;
}) => {
  return (
    <Box
      component={"form"}
      action={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box>
        <Box p={1}>
          <TextField
            id="outlined-basic"
            type="text"
            name="username"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box p={1}>
          <TextField
            id="outlined-basic"
            type="password"
            name="password"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box p={1}>
          <CommonButton label="ログイン" type="submit" />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginFormSection;
