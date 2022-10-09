import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextFields(props) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: 400 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id={props.field} label={props.field} variant="outlined" />
    </Box>
  );
}