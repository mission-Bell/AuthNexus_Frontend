'use client';
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const ImageSample = () => {
  const [src, setSrc] = useState<string>('/images/hyomolabo_image.png');
  return (
    <Box>
      <Button onClick={() => setSrc('/images/yoko.jpeg')}>
        change yoko
      </Button>
      <Button onClick={() => setSrc('/images/tate.jpeg')}>
        change tate
      </Button>
      <Button onClick={() => setSrc('/images/hyomolabo_image.png')}>
        change sikaku
      </Button>
      <Box>
        <Typography variant='h3'>noramal fill</Typography>
        <Box sx={{
          position: 'relative',
          width: 400,
          height: 200,
          bgcolor: 'gray',
        }}>
          <Image
            src={src}
            alt="sample"
            style={{
              border: '1px solid black',
            }}
            fill
          />
        </Box>

      </Box>
      <Box>
        <Typography variant='h3'>direct size</Typography>
        <Box sx={{
          bgcolor: 'gray',
        }}>
          <Image
            src={src}
            alt="sample"
            style={{
              border: '1px solid black',
            }}
            width={400}
            height={200}
          />
        </Box>
      </Box>
      <Typography variant='h5'>同じサイズ指定でも、fillだと親のサイズにハマるように伸縮する</Typography>
      <Typography variant='h5'>一方、直接サイズ指定だと比率を維持したままになる。（横幅に合わせる）</Typography>
      <Box>
        <Typography variant='h3'>contain fill</Typography>
        <Box sx={{
          position: 'relative',
          width: 400,
          height: 200,
          bgcolor: 'gray',
        }}>
          <Image
            src={src}
            alt="sample"
            style={{
              border: '1px solid black',
            }}
            fill
            objectFit='contain'
          />
        </Box>
      </Box>
      <Box>
        <Typography variant='h3'>cover fill</Typography>
        <Box sx={{
          position: 'relative',
          width: 400,
          height: 200,
          bgcolor: 'gray',
        }}>
          <Image
            src={src}
            alt="sample"
            style={{
              border: '1px solid black',
            }}
            fill
            objectFit='cover'
          />
        </Box>
      </Box>
      <Box>
        <Typography variant='h3'>none fill</Typography>
        <Box sx={{
          position: 'relative',
          width: 400,
          height: 200,
          bgcolor: 'gray',
        }}>
          <Image
            src={src}
            alt="sample"
            style={{
              border: '1px solid black',
            }}
            fill
            objectFit='none'
          />
        </Box>
      </Box>
      <Box>
        <Typography variant='h3'>scale-down fill</Typography>
        <Box sx={{
          position: 'relative',
          width: 1000,
          height: 1000,
          bgcolor: 'gray',
        }}>
          <Image
            src={src}
            alt="sample"
            style={{
              border: '1px solid black',
            }}
            fill
            objectFit='scale-down'
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ImageSample