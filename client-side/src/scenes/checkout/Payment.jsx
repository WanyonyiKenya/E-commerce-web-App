import { Box, Typography,TextField } from '@mui/material'
import React from 'react'

const Payment = ({values, touched, errors, handleBlur, handleChange}) => {
  return (
    <Box>
        <Typography sx = {{marginBottom:'15px'}} fontSize= '18px'>Contact info</Typography>
        <TextField
        fullWidth
        type='text'
        label = 'Email Address'
        onBlur={handleBlur}
        onChange = {handleChange}
        value = {values.email}
        name = 'email'
        error = {!!touched.email && !!errors.email}
        helperText = {touched.email && errors.email}
        sx = {{gridColumn: 'span 4', marginBottom:'15px'}}
      />
      <TextField
        fullWidth
        type='text'
        label = 'Phone Number'
        onBlur={handleBlur}
        onChange = {handleChange}
        value = {values.phoneNumber}
        name = 'phoneNumber'
        error = {!!touched.phoneNumber && !!errors.phoneNumber}
        helperText = {touched.phoneNumber && errors.phoneNumber}
        sx = {{gridColumn: 'span 4'}}
      />
    </Box>
  )
}

export default Payment