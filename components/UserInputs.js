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
import { slugToTitle } from "../utils/utils";

export const UserInputs = ({
  slug,
  ticker,
  date,
  setStart,
  start,
  setTicker,
  setIndicator,
  onClick,
}) => {
  return (
    <Stack my={3} mx={2} spacing={2} direction={{ xs: "column", sm: "row" }}>
      <BasicDatePicker label="start date" setValue={setStart} value={start} />
      <TextField
        id="text-field-ticker"
        label="ticker"
        variant="outlined"
        onChange={(event) => {
          setTicker(event.target.value);
        }}
      />
      <ComboBox
        id="combo-box-indicator"
        options={slugs.map((slug) => slugToTitle(slug))}
        label="indicator"
        width={300}
        setValue={setIndicator}
      />
      <Button variant="contained" size="medium" onClick={onClick}>
        Submit
      </Button>
    </Stack>
  );
};

export default UserInputs;
