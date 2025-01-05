'use client';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CommonDrawer from '@/components/blocks/CommonDrawer';
import MailIcon from '@mui/icons-material/Mail';
import { SideMenuButtonInterface } from '@/components/elements/SideMenuButton';
interface CommonAppBarProps {
  sideMenuButtons: SideMenuButtonInterface[];
}
const CommonAppBar = ({ sideMenuButtons }: CommonAppBarProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleSetTitle = (newTitle: string) => {
    setTitle(newTitle);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <CommonDrawer
            open={open}
            toggleDrawer={toggleDrawer}
            sideMenuButtons={sideMenuButtons}
            handleSetTitle={handleSetTitle}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit" onClick={() => { setTitle('title') }}>button</Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CommonAppBar;