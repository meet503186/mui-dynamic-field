import { IDynamicField } from "../../types";
import { MuiAutocompleteSelectAll } from "./SelectAllListBox";
import { Autocomplete, Checkbox, Chip, TextField } from "@mui/material";

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
  isCreatable,
  ChipProps = {},
  ...extraProps
}: Omit<IDynamicField.FieldItemConfig, "fieldType">) => {
  const selectedAll = value?.length === extraData?.length;

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
        options={extraData || []}
        onChange={(_, value) => {
          onChange && onChange({ _key, value });
        }}
        value={Array.isArray(value) ? value : []}
        color={color}
        size={size}
        getOptionLabel={(option: any) =>
          option?.label ?? option?.name ?? option
        }
        disableCloseOnSelect
        limitTags={3}
        slotProps={{
          listbox: {
            component: MuiAutocompleteSelectAll.ListBox,
          },
        }}
        isOptionEqualToValue={(option, value) =>
          option?.value
            ? option?.value === value?.value
            : option?.id
            ? option?.id === value?.id
            : option === value
        }
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
                label={tag?.label ?? tag?.name ?? tag}
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
              placeholder={placeholder}
              slotProps={{
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
                },
              }}
              {...extraProps}
            />
          );
        }}
        renderOption={({ key, ...rest }, option, { selected }) => {
          return (
            <li
              key={(option?.value || option?.id || option)?.toString()}
              {...rest}
            >
              <Checkbox checked={selected} />
              {option?.label ?? option?.name ?? option}
            </li>
          );
        }}
        {...extraProps}
      />
    </MuiAutocompleteSelectAll.Provider>
  );
};

export default MultiSelect;
