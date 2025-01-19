import { NextResponse } from 'next/server';
import { createCanvas, loadImage } from 'canvas';

export async function GET() {
  // 画像をロード
  const img = await loadImage('./public/images/tate.jpeg');
  
  // キャンバス作成
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');

  console.log(img.width, img.height);
  
  // 元画像を描画
  ctx.drawImage(img, 0, 0);
  
  // 四角形を描画
  ctx.fillStyle = 'rgb(255, 0, 0)'; // 半透明の赤
  ctx.fillRect(
    564.94921875,
    900.27734375, 
    100, 
    100);

  // テキストの設定
  ctx.font = '20px Arial'; // フォントサイズとフォントファミリー
  ctx.fillStyle = 'white'; // テキストの色
  ctx.textAlign = 'center'; // 水平位置
  ctx.textBaseline = 'middle'; // 垂直位置

  // テキストを四角形の中央に描画
  const rectX = 564.94921875 / 2; // 四角形の中央x座標
  const rectY = 900.27734375 / 2; // 四角形の中央y座標
  ctx.fillText('Hello Canvas', rectX, rectY);

    // 四角形を描画
  ctx.fillStyle = 'rgb(0, 255, 0)';
  ctx.fillRect(
    613.31640625,
    1019.0546875,
    10, 
    10);

  // バッファを取得
  const buffer = canvas.toBuffer('image/png');
  
  // NextResponseで返却
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
