"use client";
// app/samplePage/layout.tsx
import { ReactNode } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // プライマリカラー
    },
    secondary: {
      main: "#dc004e", // セカンダリカラー
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // フォント設定
  },
});

// レイアウト用の型
interface SamplePageLayoutProps {
  children: ReactNode;
}

export default function SamplePageLayout({ children }: SamplePageLayoutProps) {
  return (
    <html lang="en">
      <body>
        {/* ThemeProviderでMUIのテーマを提供 */}
        <ThemeProvider theme={theme}>
          {/* CssBaselineでブラウザのデフォルトCSSをリセット */}
          <CssBaseline />
          <header>
            <h1>Sample Page Header</h1>
          </header>

          {/* ページ固有のコンテンツ */}
          <main>{children}</main>

          <footer>
            <p>Sample Page Footer</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
