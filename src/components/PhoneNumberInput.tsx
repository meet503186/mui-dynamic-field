import {
  Autocomplete,
  Box,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { IDynamicField } from "../types";
import { useState } from "react";
import { REGEX } from "../constants";

const PhoneNumberInput = (
  props: TextFieldProps & {
    errorText?: string;
    countryCodes?: IDynamicField.Option[];
    countryCode?: string;
    countryCodeField?: string;
    countryCodeFieldProps?: Partial<
      IDynamicField.AutoCompleteFieldProps<IDynamicField.Option, false, true>
    >;
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
    countryCodeField,
    countryCodes,
    sx,
    slotProps,
    countryCodeFieldProps = {},
    ...restProps
  } = props;

  const {
    sx: countryCodeFieldSx,
    autoFocus,
    ...countryCodeFieldRestProps
  } = countryCodeFieldProps;

  const selectedOption = countryCodes?.find((c) => c.value === countryCode);

  const [inputValue, setInputValue] = useState("");

  // useEffect(() => {
  //   if (!inputValue && selectedOption) {
  //     setInputValue(""); // keep input blank when not typing
  //   }
  // }, [selectedOption]);

  const showFlag = !inputValue && selectedOption?.shortCode;

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      {!!countryCodes?.length && (
        <Autocomplete
          // TODO: fix the rest props spread issue
          {...countryCodeFieldRestProps}
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
              (opt as IDynamicField.Option).label
                ?.toLowerCase()
                .includes(inputValue.toLowerCase())
            )
          }
          isOptionEqualToValue={(option, value) => {
            const _option = option as IDynamicField.Option;
            const _value = value as IDynamicField.Option;

            return (
              `${_option.label}${_option.value}` ===
              `${_value.label}${_value.value}`
            );
          }}
          onChange={(_, newValue) => {
            if (!countryCodeField) return;
            handleChange({
              _key: countryCodeField,
              value: (newValue as IDynamicField.Option)?.value,
            });
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
                autoFocus={autoFocus}
              />
            </Box>
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <img
                src={`https://flagsapi.com/${
                  (option as { shortCode: string }).shortCode
                }/flat/32.png`}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 8,
                  borderRadius: 4,
                }}
                alt="flag"
              />
              {(option as IDynamicField.Option).label}
            </li>
          )}
          sx={{
            ...countryCodeFieldSx,
            "& .MuiAutocomplete-input": {
              paddingLeft: "8px !important",
            },
          }}
        />
      )}
      <TextField
        type={"tel"}
        fullWidth
        color={color}
        error={error}
        helperText={errorText}
        label={label}
        name={name}
        disabled={disabled}
        variant="outlined"
        value={value ?? ""}
        onChange={(e) => {
          if (e.target.value.match(REGEX.NUMBERS.pattern) || !name) {
            return;
          }

          handleChange({ _key: name, value: e.target.value });
        }}
        size={size}
        onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
          (e.target as HTMLInputElement).blur()
        }
        slotProps={{
          ...(slotProps || {}),
          input: {
            ...(slotProps?.input || {}),
            startAdornment: (
              <Typography
                sx={{ color: "black !important", whiteSpace: "nowrap" }}
              >
                {selectedOption?.value}
              </Typography>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            paddingLeft: "7px !important",
          },
          "& input": {
            paddingLeft: "4px !important",
          },
          ...sx,
        }}
        {...restProps}
      />
    </Box>
  );
};

export default PhoneNumberInput;
