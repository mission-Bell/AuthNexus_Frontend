'use client';
import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// ワーカーファイルのパスを正しく設定
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;

const editExistingPDF = async () => {
  const pdfUrl = '/sample.pdf'; // 既存のPDFファイル

  // 既存のPDFをフェッチして読み込む
  const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // フォントを埋め込む
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // 既存の1ページ目を取得
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // ページサイズを取得
  const { width, height } = firstPage.getSize();
  console.log(`Page width: ${width}, height: ${height}`);

  // 任意の位置にテキストを追加（サイズ調整済み）
  firstPage.drawText('T', {
    x: 270.671875, // X座標
    y: height -
      169.53125, // Y座標（ページ上部から少し下）
    size: 24, // 適切なフォントサイズ
    font,
    color: rgb(1, 0, 0), // 赤色
  });

  // PDFを保存
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // 別タブでPDFを開く
  window.open(url, '_blank');
};

export default function Home() {
  const [pageSizes, setPageSizes] = useState<{ width: number; height: number }[]>([]);

  useEffect(() => {
    const fetchPDFPageSizes = async () => {
      const pdfUrl = '/sample.pdf'; // 読み込むPDFファイルのパス
      const pdf = await getDocument(pdfUrl).promise;
      const sizes: { width: number; height: number }[] = [];

      console.log(pdf.numPages);

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1 });
        sizes.push({ width: viewport.width, height: viewport.height });
      }

      setPageSizes(sizes);
    };

    fetchPDFPageSizes().catch(console.error);
  }, []);

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <h1>PDF Page Sizes</h1>
        <ul>
          {pageSizes.map((size, index) => (
            <li key={index}>
              Page {index + 1}: {size.width} x {size.height} pt
            </li>
          ))}
        </ul>
      </div>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Next.js PDF Editor</h1>
        <button
          onClick={editExistingPDF}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
          }}
        >
          Edit Existing PDF
        </button>
      </div>
    </div>
  );
}
