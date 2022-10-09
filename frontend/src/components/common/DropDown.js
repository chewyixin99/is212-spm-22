import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels(props) {
  const [field, setField] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setField(event.target.value);
  };

  function showvalues(){
    var list = ``
    for (var option in props.options){
        // console.log(props.options[option])
        list += `
        <MenuItem value=${option}>${props.options[option]}</MenuItem>`
    }
    return list
  }
  

  return (
    <div>
      <FormControl sx={{  m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-helper-label">Field</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={field}
          label="Field"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {/* Cannot call for this function */}
          {showvalues()}
          {/* {console.log(showvalues())} */}
          <MenuItem value={props.options.HR}>{props.options.HR}</MenuItem>
          <MenuItem value={props.options.IT}>{props.options.IT}</MenuItem>
          <MenuItem value={props.options.Ops}>{props.options.Ops}</MenuItem>
          <MenuItem value={props.options.Finance}>{props.options.Finance}</MenuItem>
          <MenuItem value={props.options.Sales}>{props.options.Sales}</MenuItem>
          

        </Select>
        <FormHelperText>Optional</FormHelperText>
      </FormControl>
    </div>
  );
}
