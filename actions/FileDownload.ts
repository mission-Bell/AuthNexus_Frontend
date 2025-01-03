"use server";

import axios from "axios";

export async function downloadFileFromJavaBackend() {
  try {
    // JavaバックエンドのファイルダウンロードURL
    const javaBackendUrl = "http://localhost:8080/api/download";

    // Javaバックエンドにリクエストを送信してファイルを取得
    const response = await axios.get(javaBackendUrl, {
      responseType: "arraybuffer", // バイナリデータとして受信
    });

    // ファイル名を取得（例: レスポンスヘッダーに含まれる場合）
    const fileName = response.headers["content-disposition"]?.split("filename=")[1]?.replace(/"/g, "") || "downloaded-file";

    // サーバーアクションでバイナリデータとファイル名を返す
    return { success: true, data: response.data, fileName };
  } catch (error: any) {
    console.error("Error downloading file from backend:", error);
    return {
      success: false,
      error: error.response?.data || error.message || "Unknown error",
    };
  }
}
