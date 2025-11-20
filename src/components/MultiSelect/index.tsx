import { useCallback, useMemo } from "react";
import { IDynamicField } from "../../types";
import { extractValue } from "../../utils";
import {
  Autocomplete,
  Checkbox,
  Chip,
  Divider,
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
  const selectedAll = useMemo(() => {
    return value?.length === extraData?.length;
  }, [value, extraData]);

  const OPTIONS = useMemo(() => {
    return [
      { label: "Select All", value: "__selectAll__", isSelectAll: true },
      ...(extraData || []),
    ];
  }, [extraData]);

  const { textFieldProps = {}, ...restProps } = (extraProps ||
    {}) as Partial<IDynamicField.MultiSelectFieldProps>;

  const { slotProps = {}, ...restTextFieldProps } = textFieldProps;

  const handleSelectAll = useCallback(() => {
    if (!onChange) return;

    if (selectedAll) {
      onChange({ _key, value: [] });
      return;
    }
    onChange({ _key, value: extraData });
  }, [_key, extraData, onChange, selectedAll]);

  return (
    <Autocomplete
      disablePortal
      multiple
      disabled={disabled}
      readOnly={disabled}
      options={OPTIONS as IDynamicField.Option[]}
      onChange={(_, value, __, details) => {
        if ((details?.option as { isSelectAll: boolean })?.isSelectAll) {
          handleSelectAll();
          return;
        }

        if (onChange) onChange({ _key, value });
      }}
      value={Array.isArray(value) ? value : [value]}
      color={color}
      size={size}
      getOptionLabel={(option) => extractValue(option, "label") as string}
      disableCloseOnSelect
      limitTags={3}
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
                if (ChipProps.onClick) ChipProps.onClick(tag);
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
        if ((option as { isSelectAll: boolean })?.isSelectAll) {
          return (
            <>
              <MenuItem {...rest} key={key}>
                <Checkbox
                  checked={selectedAll}
                  indeterminate={!!value?.length && !selectedAll}
                  tabIndex={-1}
                />
                Select All
              </MenuItem>
              <Divider />
            </>
          );
        }

        return (
          <MenuItem key={key} {...rest}>
            <Checkbox checked={selected} />

            {String(extractValue(option, "label"))}
          </MenuItem>
        );
      }}
      {...restProps}
    />
  );
};

export default MultiSelect;
