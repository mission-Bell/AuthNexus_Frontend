"use server";
import { promises as fs } from "node:fs";
import { resolve } from "node:path";
import { revalidatePath } from "next/cache";
import axios from "axios";

import crypto from "crypto";

// アップロード先ディレクトリ
const uploadDir = resolve(process.cwd(), "./uploads");

// 一時保存方式
export async function uploadFile(formData: FormData) {
  try{
    console.log("formData", formData);
    const file = formData.get("file") as File;
    if (file && file.size > 0) {
      const data = await file.arrayBuffer();
      const buffer = Buffer.from(data);
      const filePath = resolve(
        process.cwd(),
        "./uploads",
        `${crypto.randomUUID()}.${file.name.split(".").pop()}`,
      );
      await fs.writeFile(filePath, new Uint8Array(buffer));
    }
    revalidatePath("/file");
    return { success: true };
  
  } catch (error) {
    return { success: false, error };
  }
}

// そのまま送付方式
export async function uploadFileToJavaBackend(formData: FormData) {
  try {
    // フォームデータからファイルを取得
    const file = formData.get("file") as File;
    if (!file || file.size === 0) {
      throw new Error("No file provided or file is empty");
    }

    // Javaバックエンドに送信するためのFormDataを構築
    const backendFormData = new FormData();
    backendFormData.append("file", new Blob([await file.arrayBuffer()]), file.name);

    // JavaバックエンドのURL
    
    const javaBackendUrl = "http://localhost:8080/api/upload";

    // axiosでファイルを送信
    const response = await axios.post(javaBackendUrl, backendFormData, {
      headers: {
        "Authorization": "Bearer your-token", // 必要なら認証トークン
      },
      maxContentLength: Infinity, // ファイルサイズ制限の解除（必要に応じて調整）
      maxBodyLength: Infinity, // ボディサイズ制限の解除（必要に応じて調整）
    });

    return { success: true, backendResponse: response.data };
  } catch (error: any) {
    console.error("Error uploading file to backend:", error);

    // axiosのエラー構造を考慮したエラーハンドリング
    return {
      success: false,
      error: error.response?.data || error.message || "Unknown error",
    };
  }
}