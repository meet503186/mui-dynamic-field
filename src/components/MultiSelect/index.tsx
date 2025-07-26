import { IDynamicField } from "../../types";
import { extractValue } from "../../utils";
import { MuiAutocompleteSelectAll } from "./SelectAllListBox";
import {
  Autocomplete,
  Checkbox,
  Chip,
  MenuItem,
  TextField,
} from "@mui/material";

const MultiSelect = ({
  _key,
  value,
  onChange,
  disabled,
  extraData,
  color,
  size,
  error,
  errorText,
  placeholder,
  ChipProps = {},
  extraProps,
}: IDynamicField.FieldItemConfig) => {
  const selectedAll = value?.length === extraData?.length;

  const { textFieldProps = {}, ...restProps } = (extraProps ||
    {}) as Partial<IDynamicField.MultiSelectFieldProps>;

  const { slotProps = {}, ...restTextFieldProps } = textFieldProps;

  return (
    <MuiAutocompleteSelectAll.Provider
      value={{
        onSelectAll: (selectedAll) => {
          onChange &&
            (selectedAll
              ? onChange({ _key, value: [] })
              : onChange({ _key, value: extraData }));
        },
        selectedAll,
        indeterminate: !!value?.length && !selectedAll,
      }}
    >
      <Autocomplete
        disablePortal
        multiple
        disabled={disabled}
        options={(extraData || []) as IDynamicField.Option[]}
        onChange={(_, value) => {
          onChange && onChange({ _key, value });
        }}
        value={Array.isArray(value) ? value : [value]}
        color={color}
        size={size}
        getOptionLabel={(option) => extractValue(option, "label") as string}
        disableCloseOnSelect
        limitTags={3}
        slotProps={{
          listbox: {
            component: MuiAutocompleteSelectAll.ListBox,
          },
        }}
        isOptionEqualToValue={(option, value) => {
          return extractValue(option, "value") === extractValue(value, "value");
        }}
        renderTags={(tags, getTagProps) => {
          return tags.map((tag, index) => {
            const { disabled, onDelete, ...tagProps } = getTagProps({ index });

            return (
              <Chip
                onClick={(e) => {
                  e.stopPropagation();
                  ChipProps.onClick && ChipProps.onClick(tag);
                }}
                onDelete={(deleteProps) => !disabled && onDelete(deleteProps)}
                label={extractValue(tag, "label") as string}
                {...tagProps}
              />
            );
          });
        }}
        renderInput={(params) => {
          const { InputProps, ...restParams } = params;
          const { startAdornment, ...restInputProps } = InputProps;

          return (
            <TextField
              {...restParams}
              variant="outlined"
              size={size}
              error={error}
              helperText={errorText}
              label={placeholder}
              slotProps={{
                inputLabel: slotProps.inputLabel,
                input: {
                  startAdornment: (
                    <div
                      style={{
                        maxHeight: 100,
                        overflowY: "auto",
                      }}
                      className="hide-scrollbar"
                    >
                      {startAdornment}
                    </div>
                  ),
                  ...restInputProps,
                  ...(slotProps?.input || {}),
                },
              }}
              {...restTextFieldProps}
            />
          );
        }}
        renderOption={({ key, ...rest }, option, { selected }) => {
          return (
            <MenuItem key={key} {...rest}>
              <Checkbox checked={selected} />

              {String(extractValue(option, "label"))}
            </MenuItem>
          );
        }}
        {...restProps}
      />
    </MuiAutocompleteSelectAll.Provider>
  );
};

export default MultiSelect;
