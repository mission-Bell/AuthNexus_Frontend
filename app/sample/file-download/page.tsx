'use client';
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import {
  uploadFile, uploadFileToJavaBackend
} from '@/actions/FileUpload';
import { downloadFileFromJavaBackend } from '@/actions/FileDownload';

const CSVUploadDownload = () => {
  const [message, setMessage] = useState<string>("");

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFile(formData);
      // const response = await uploadFileToJavaBackend(formData);

      console.log("response", response);

      if (response.success) {
        alert("ファイルのアップロードに成功しました！");
      } else {
        alert("ファイルのアップロードに失敗しました。");
      }
    } catch (error) {
      console.error("アップロードエラー:", error);
      alert("エラーが発生しました。");
    }
  };

  const handleFileDownload = async () => {
    try {
      // Server Actionsを呼び出してファイルを取得
      const result = await downloadFileFromJavaBackend();

      if (!result.success) {
        setMessage(`Error: ${result.error}`);
        return;
      }

      // Blobを作成し、ブラウザでダウンロード
      const blob = new Blob([result.data], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = result.fileName; // ファイル名を設定
      a.click();

      URL.revokeObjectURL(url); // メモリ解放
      setMessage("File downloaded successfully");
    } catch (error) {
      console.error("File download error:", error);
      setMessage("An unexpected error occurred");
    }
  };

  return (
    <Box>
      <input
        accept=".csv"
        type="file"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        id="csv-upload"
      />
      <label htmlFor="csv-upload">
        <Button variant="contained" component="span" style={{ marginRight: 16 }}>
          Upload CSV
        </Button>
      </label>
      <Button variant="contained" onClick={handleFileDownload} style={{ marginRight: 16 }}>
        Download CSV
      </Button>
    </Box>
  );
};

export default CSVUploadDownload;
