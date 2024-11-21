// MUIを使った標準的なログインページ
import React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useAuth } from "app/auth";
import { useForm } from "react-hook-form";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    await login(data.email, data.password);
  });

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label="Email"
          name="email"
          inputRef={register}
          type="email"
          required
        />
        <TextField
          label="Password"
          name="password"
          inputRef={register}
          type="password"
          required
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};
