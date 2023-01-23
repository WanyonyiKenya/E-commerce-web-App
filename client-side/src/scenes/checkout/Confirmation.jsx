import { Alert, AlertTitle } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'


const Confirmation = () => {
  return (
    <Box m ='90px' width = '80%' height = '50vh'>
      <Alert severity='seccess'>
        <AlertTitle>The Order is placed and Successfull</AlertTitle>
        You hvae successfully made the order 

      </Alert>
    </Box>
  )
}

export default Confirmation