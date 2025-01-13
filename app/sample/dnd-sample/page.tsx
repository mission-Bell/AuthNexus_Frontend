import React from 'react'
import Box from '@mui/material/Box'
import DndGetLocationTemplate from '@/components/templates/DndGetLocationTemplate'

const DndSsamplePage = () => {
  return (
    <Box>
      <DndGetLocationTemplate isPdf={false} numberList={
        [
          { id: 1, x: 100, y: 100, },
          { id: 2, x: 103, y: 20, },
          { id: 3, x: 400, y: 300, },
          { id: 4, x: 200, y: 200, },
          { id: 5, x: 300, y: 300, },
          { id: 6, x: 400, y: 400, },

        ]
      } />
    </Box>
  )
}

export default DndSsamplePage