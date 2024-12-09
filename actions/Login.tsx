"use server";

import { redirect } from "next/navigation";
import Box from "@mui/material/Box";

export interface ReturnMessage {
  errorId: number;
  message: string;
}

export const postLogin = async (formData: FormData) => {
  // 認証処理
  // バックエンドにリクエストを送信して認証処理を行う
  // ここではダミーの処理を行う
  if (
    formData.get("username") === "test" &&
    formData.get("password") === "test"
  ) {
    // ログイン成功ログイン成功の場合は、topmenuにリダイレクトする

    redirect("/topmenu");
  }
  console.log("postLogin", formData);
  return <Box>test</Box>;
};
