import React from 'react'
import { IconButton,Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import MenuIcon from '@mui/icons-material/Menu'

const MyButton = () => {
  return (
    <div>
          <Stack direction="row" spacing={3}>
        <IconButton aria-label='delete' color='primary'>
            <DeleteIcon />
        </IconButton>
        <IconButton color='primary'>
            <SendIcon />
        </IconButton>
        <IconButton color='primary'>
            <MenuIcon />
        </IconButton>
    </Stack>
    </div>
  )
}

export default MyButton