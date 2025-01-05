import React from 'react'
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

export interface SideMenuButtonInterface {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SideMenuButtonProps {
  sideMenuButton: SideMenuButtonInterface;
  onClick: () => void;
}
const SideMenuButton = ({ sideMenuButton, onClick }: SideMenuButtonProps) => {
  const { href, label, icon } = sideMenuButton;
  return (
    <Box>
      <Link href={href}>
        <ListItemButton onClick={onClick}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </Link>
    </Box>
  )
}

export default SideMenuButton