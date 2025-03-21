import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import PasswordInput from "./PasswordInput";
import { IDynamicField } from "../types";
import AutocompleteSelect from "./AutocompleteSelect";

const DynamicField = ({
  item,
  error,
  errorText,
  color = "primary",
  disabled,
  value,
  onChange,
  size = "medium",
  sx,
}: IDynamicField.FieldConfig) => {
  const {
    placeholder: _placeholder,
    isOptional,
    _key,
    fieldType,
    overRideValues = {},
    maxLength,
    extraProps = {},
    extraData = [],
  } = item;

  const { slotProps = {}, ...restProps } = extraProps;

  const onChangeValue = ({ target }: any) => {
    handleChange({ value: target.value, _key });
  };

  const handleChange = (data: IDynamicField.FieldChangeProps) => {
    if (maxLength && data?.value?.length > maxLength) {
      return;
    }
    onChange &&
      onChange({ overRideValues, maxLength, value: data.value, _key });
  };

  const placeholder = _placeholder + (isOptional ? "" : "*");

  switch (fieldType) {
    case "text":
      return (
        <TextField
          fullWidth
          color={color}
          error={error}
          helperText={errorText}
          label={placeholder}
          name={_key}
          disabled={disabled}
          variant="outlined"
          value={value ?? ""}
          onChange={onChangeValue}
          size={size}
          {...restProps}
        />
      );

    case "password":
      return (
        <PasswordInput
          fullWidth
          color={color}
          error={error}
          helperText={errorText}
          label={placeholder}
          name={_key}
          disabled={disabled}
          variant="outlined"
          value={value ?? ""}
          onChange={onChangeValue}
          size={size}
          {...restProps}
        />
      );

    case "dropdown":
      return (
        <FormControl
          size={size}
          disabled={disabled}
          error={error}
          color={color}
          fullWidth
          {...restProps}
        >
          <InputLabel id={_key}>{placeholder}</InputLabel>
          <Select
            labelId={_key}
            name={_key}
            value={value ?? ""}
            label={placeholder}
            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
            onChange={onChangeValue}
          >
            {extraData?.map((_item: any, index: number) => (
              <MenuItem
                key={index}
                sx={{ textTransform: "capitalize" }}
                value={_item?.value ?? _item?.id ?? _item}
              >
                {_item?.label || _item?.name || _item}
              </MenuItem>
            ))}
          </Select>
          {!!errorText && (
            <FormHelperText error={error}>{errorText}</FormHelperText>
          )}
        </FormControl>
      );

    case "number":
      return (
        <TextField
          fullWidth
          color={color}
          error={error}
          helperText={errorText}
          label={placeholder}
          name={_key}
          disabled={disabled}
          variant="outlined"
          type="number"
          value={value ?? ""}
          onChange={({ target }) => handleChange({ value: target.value, _key })}
          size={size}
          onWheel={(event: React.WheelEvent<HTMLInputElement>) =>
            event.currentTarget.blur()
          }
          {...restProps}
        />
      );

    case "textarea":
      return (
        <TextField
          fullWidth
          multiline={!disabled}
          minRows={1}
          maxRows={10}
          error={error}
          color={color}
          helperText={errorText}
          label={placeholder}
          name={_key}
          variant="outlined"
          value={value ?? ""}
          disabled={disabled}
          onChange={({ target }) =>
            onChange && onChange({ value: target.value, _key })
          }
          {...restProps}
        />
      );

    case "date":
      return (
        <TextField
          fullWidth
          color={color}
          error={error}
          helperText={errorText}
          label={placeholder}
          name={_key}
          disabled={disabled}
          variant="outlined"
          type="date"
          value={value ?? ""}
          onChange={({ target }) =>
            onChange && onChange({ value: target.value, _key })
          }
          size={size}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            ...slotProps,
          }}
          {...restProps}
        />
      );

    case "time":
      return (
        <TextField
          fullWidth
          color={color}
          error={error}
          helperText={errorText}
          label={placeholder}
          name={_key}
          disabled={disabled}
          variant="outlined"
          type="time"
          value={value ?? ""}
          onChange={({ target }) =>
            onChange && onChange({ value: target.value, _key })
          }
          size={size}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            ...slotProps,
          }}
          {...restProps}
        />
      );

    case "datetime":
      return (
        <TextField
          fullWidth
          color={color}
          error={error}
          helperText={errorText}
          label={placeholder}
          name={_key}
          disabled={disabled}
          variant="outlined"
          type="datetime-local"
          value={value ?? ""}
          onChange={({ target }) =>
            onChange && onChange({ value: target.value, _key })
          }
          size={size}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            ...slotProps,
          }}
          {...restProps}
        />
      );

    case "autocomplete":
      return (
        <AutocompleteSelect
          {...item}
          fullWidth
          color={color}
          error={error}
          helperText={errorText}
          placeholder={placeholder}
          name={_key}
          disabled={disabled}
          variant="outlined"
          value={value ?? ""}
          onChange={onChange}
          size={size}
          _key={_key}
          fieldType={fieldType}
          {...restProps}
        />
      );

    case "checkbox":
      return (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={() => onChange && onChange({ _key, value: !value })}
              />
            }
            label={_placeholder}
            name={_key}
            disabled={disabled}
            sx={sx}
            {...restProps}
          />
        </FormGroup>
      );
    default:
      return null;
  }
};

export default DynamicField;
