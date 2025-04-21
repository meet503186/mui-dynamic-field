import { Autocomplete, Box, TextField, TextFieldProps } from "@mui/material";
import { IDynamicField } from "../types";
import { useEffect, useState } from "react";

const PhoneNumberInput = (
  props: TextFieldProps & {
    errorText?: string;
    countryCodes?: IDynamicField.Option[];
    countryCode?: IDynamicField.Option;
    handleChange: (data: IDynamicField.FieldChangeProps) => void;
  }
) => {
  const {
    color,
    name,
    error,
    errorText,
    label,
    value,
    handleChange,
    disabled,
    size,
    countryCode,
    countryCodes,
    sx,
    ...restProps
  } = props;

  const selectedOption = countryCodes?.find(
    (c) => c.shortCode === countryCode?.shortCode
  );

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!inputValue && selectedOption) {
      setInputValue(""); // keep input blank when not typing
    }
  }, [selectedOption]);

  const showFlag = !inputValue && selectedOption?.shortCode;

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      {!!countryCodes?.length && (
        <Autocomplete
          id="country-code-autocomplete"
          options={countryCodes}
          value={selectedOption}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
          getOptionLabel={() => ""} // Always return empty label
          filterOptions={(options, { inputValue }) =>
            options.filter((opt) =>
              opt.label?.toLowerCase().includes(inputValue.toLowerCase())
            )
          }
          isOptionEqualToValue={(option, value) => {
            console.log({ option, value });

            return (
              `${option.label}${option.value}` ===
              `${value.label}${value.value}`
            );
          }}
          onChange={(_, newValue) => {
            handleChange({ _key: "countryCode", value: newValue });
            setInputValue("");
          }}
          disableClearable
          disabled={disabled}
          size={size}
          slotProps={{
            popper: {
              sx: {
                width: "fit-content !important",
                maxWidth: 300,
              },
            },
          }}
          renderInput={(params) => (
            <Box sx={{ position: "relative", width: 70 }}>
              {showFlag && (
                <Box
                  component="img"
                  src={`https://flagsapi.com/${selectedOption.shortCode}/flat/32.png`}
                  alt="flag"
                  sx={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 24,
                    height: 24,
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />
              )}
              <TextField
                {...params}
                variant="outlined"
                sx={{
                  "& input": {
                    paddingLeft: showFlag ? "40px" : "12px",
                  },
                }}
              />
            </Box>
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <img
                src={`https://flagsapi.com/${option.shortCode}/flat/32.png`}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 8,
                  borderRadius: 4,
                }}
                alt="flag"
              />
              {option.label}
            </li>
          )}
          sx={{
            [`& .MuiAutocomplete-inputRoot`]: {
              paddingRight: "8px !important",
            },
            ...sx,
          }}
        />
      )}
      <TextField
        type={"number"}
        fullWidth
        color={color}
        error={error}
        helperText={errorText}
        label={label}
        name={name}
        disabled={disabled}
        variant="outlined"
        value={value ?? ""}
        onChange={(e) =>
          name && handleChange({ _key: name, value: e.target.value })
        }
        size={size}
        onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
          (e.target as HTMLInputElement).blur()
        }
        {...restProps}
      />
    </Box>
  );
};

export default PhoneNumberInput;
