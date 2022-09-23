import { useState } from "react";

// import MUI inputs
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ComboBox } from "../components/ComboBox";
import { BasicDatePicker } from "../components/DatePicker";

// available routes from api
import { slugs } from "../utils/constants";

// format slugs
import { makeTitle } from "../utils/utils";

export const UserInputs = ({ slug, ticker, date }) => {
  return (
    <Stack my={3} mx={2} spacing={2} direction={{ xs: "column", sm: "row" }}>
      <BasicDatePicker label="start date" />
      <TextField id="text-field-ticker" label="ticker" variant="outlined" />
      <ComboBox
        id="combo-box-indicator"
        options={slugs.map((slug) => makeTitle(slug))}
        label="indicator"
        width={300}
      />
      <Button variant="contained" size="medium">
        Submit
      </Button>
    </Stack>
  );
};

export default UserInputs;
