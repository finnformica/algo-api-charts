import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export function ComboBox({ id, options, label, width = 300 }) {
  return (
    <Autocomplete
      disablePortal
      id={id}
      options={options}
      sx={{ width }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

export default ComboBox;
