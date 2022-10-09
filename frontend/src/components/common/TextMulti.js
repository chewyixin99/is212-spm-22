import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: 400 },
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue="Description"
        />
    </Box>
  );
}
