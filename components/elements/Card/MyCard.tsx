import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const MyCard = () => {
  return (
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography>
                        test
                    </Typography>
                </CardContent>
            </Card>
  )
}

export default MyCard