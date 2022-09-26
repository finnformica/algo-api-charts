import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { titleToSlug } from "../utils/utils";

export function ComboBox({ id, options, label, width = 300, setValue }) {
  return (
    <Autocomplete
      disablePortal
      id={id}
      options={options}
      sx={{ width }}
      onChange={(event) => {
        setValue(event.target.innerHTML);
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

export default ComboBox;
