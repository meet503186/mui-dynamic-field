import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { IDynamicField } from "../types";
import { extractValue } from "../utils";

const AutocompleteSelect = (props: IDynamicField.FieldItemConfig) => {
  const {
    _key,
    error,
    errorText,
    value,
    onChange,
    disabled,
    size,
    placeholder,
    extraProps = {},
    extraData = [],
  } = props;

  const { textFieldProps = {}, ...restProps } = (extraProps ||
    {}) as Partial<IDynamicField.AutoCompleteFieldProps>;

  const { slotProps = {}, ...restTextFieldProps } = textFieldProps;

  return (
    <Autocomplete
      size={size}
      openOnFocus
      disablePortal
      disabled={disabled}
      isOptionEqualToValue={(option, value) =>
        extractValue(option, "value") === value
      }
      getOptionLabel={(option) => {
        if (!option?.toString()) return "";

        const selected = extraData?.find((item) => {
          return extractValue(option, "value") === extractValue(item, "value");
        });

        if (!selected) {
          return "";
        }

        return String(extractValue(selected, "label"));
      }}
      options={extraData as IDynamicField.Option[]}
      value={extractValue(value, "value") as IDynamicField.Option}
      onChange={(_, value) => {
        if (onChange)
          onChange({
            value: extractValue(value, "value"),
            _key,
            textValue: extractValue(value, "label"),
          });
      }}
      renderOption={({ key, ...restProps }, option) => {
        return (
          <MenuItem key={key} {...restProps}>
            {String(extractValue(option, "label"))}
          </MenuItem>
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={placeholder}
            helperText={errorText}
            error={error}
            sx={{
              "& .MuiAutocomplete-inputRoot": {
                ...((slotProps?.input as any)?.style || {}),
              },
            }}
            {...restTextFieldProps}
          />
        );
      }}
      {...restProps}
    />
  );
};

export default AutocompleteSelect;
