"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller, set } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
} from "@mui/material";
import { onSend } from "@/actions/sample";
export type Inputs = {
  username: string;
  email: string;
};
import Alert from "@mui/material/Alert";
import { CostomError } from "@/actions/sample";

const FormSamplePage = () => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { username: "test", email: "" } });
  const [alert, setAlert] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const plainData = JSON.stringify(data);
    const res = await onSend(JSON.parse(plainData));
    if (res instanceof Error) {
      setError("username", {
        type: "manual",
        message: res.message,
      });
      setAlert(true);
      return;
    } else if ((res as CostomError).code) {
      const error = res as CostomError;
      setError("username", {
        type: "manual",
        message: error.message,
      });
      setAlert(true);
      return;
    }
    setAlert(false);
    console.log("onSubmit", res);

    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {alert && <Alert severity="error">{errors.username?.message}</Alert>}
        {alert && <Alert severity="info">success</Alert>}
        <FormControl error={!!errors.username} fullWidth sx={{ mt: 2 }}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Controller
            name="username"
            control={control}
            rules={{ required: "Username is required" }}
            render={({ field }) => <OutlinedInput {...field} id="username" />}
          />
          <FormHelperText>{errors.username?.message}</FormHelperText>
        </FormControl>
        <FormControl error={!!errors.email} fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                message: "Invalid email",
              },
            }}
            render={({ field }) => <OutlinedInput {...field} id="email" />}
          />
          <FormHelperText>{errors.email?.message}</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        {/* <input
          {...register("firstName", { required: true, maxLength: 20 })}
          placeholder="First name"
        />
        <br />
        {errors.firstName && <span>This field is required</span>}
        <br />
        <input
          {...register("lastName", { required: true, maxLength: 20 })}
          placeholder="Last name"
        />
        <br />
        {errors.lastName && <span>This field is required</span>}
        <br />
        <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};

export default FormSamplePage;
