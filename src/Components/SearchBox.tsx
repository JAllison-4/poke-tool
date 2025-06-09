import React from "react";
import { Autocomplete, TextField } from "@mui/material";

interface SearchBoxProps {
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
  label?: string;
}

export default function SearchBox({ options, value, onChange, label = "Search" }: SearchBoxProps) {
  function handleChange(event: any, newValue: string | null) {
    onChange(newValue);
  }

  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          sx={{
            input: { color: "#ccc", background: "#353740" },
            label: { color: "#ccc" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset, &.Mui-focused fieldset": { borderColor: "#888" }
            }
          }}
        />
      )}
      sx={{
        mt: 3,
        mb: 3,
        width: 260,
        mx: "auto",
        "& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator": { color: "#ef5350" },
        "& .MuiAutocomplete-paper": { backgroundColor: "#2b2c30" },
        "& .MuiAutocomplete-listbox": { backgroundColor: "#2b2c30" }
      }}
      autoHighlight
      autoSelect
      clearOnEscape
    />
  );
}
