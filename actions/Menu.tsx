'use server';
import MailIcon from '@mui/icons-material/Mail';
export const getMenuItems = async () => {
  // メニュー情報を取得する
  return [
    { href: '/', label: 'Home', icon: <MailIcon /> },
    { href: '/sample', label: 'Sample', icon: <MailIcon /> },
    { href: '/contact', label: 'Contact', icon: <MailIcon /> },
  ];
}