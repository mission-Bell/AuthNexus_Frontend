const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["index.ts"], // エントリーファイル
    outfile: "dist/index.js", // 出力先
    bundle: true, // 依存関係をバンドル
    minify: true, // コードを圧縮
    sourcemap: true, // ソースマップを生成
    platform: "node", // Node.js向け
    target: "es2020", // 出力のターゲット
    external: ["@aws-sdk/*"], // AWS SDK関連モジュールを除外
  })
  .then(() => {
    console.log("Build succeeded.");
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
