import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer';
import SideMenuButton from '@/components/elements/SideMenuButton';
import { SideMenuButtonInterface } from '@/components/elements/SideMenuButton';

interface CommonDrawerProps {
  toggleDrawer: (isOpen: boolean) => void;
  open: boolean;
  sideMenuButtons: SideMenuButtonInterface[];
  handleSetTitle: (newTitle: string) => void;
}
const CommonDrawer = ({ toggleDrawer, open, sideMenuButtons, handleSetTitle }: CommonDrawerProps) => {
  return (
    <Box>
      <Drawer open={open} onClick={() => toggleDrawer(false)}>
        {sideMenuButtons.map((sideMenuButton) => (
          <Box key={sideMenuButton.label}>
            <SideMenuButton
              sideMenuButton={sideMenuButton}
              onClick={() => {
                handleSetTitle(sideMenuButton.label);
              }}
            />
          </Box>
        ))}
      </Drawer>
    </Box>
  )
}

export default CommonDrawer