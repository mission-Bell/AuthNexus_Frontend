'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Box } from '@mui/material';

type FormValues = {
  name: string;
  email: string;
};

export default function ConfirmForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  // データ送信処理
  const onSubmit = (data: FormValues) => {
    const userConfirmed = window.confirm('送信します。よろしいですか？');

    if (userConfirmed) {
      console.log('送信されるデータ:', data);
      alert('データが送信されました！');
      reset(); // フォームリセット
    } else {
      console.log('送信がキャンセルされました');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
      <TextField
        label="名前"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('name', { required: true })}
      />
      <TextField
        label="メールアドレス"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('email', { required: true })}
      />
      <Button type="submit" variant="contained" color="primary">
        送信
      </Button>
    </Box>
  );
}
