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
  TextFieldProps,
} from "@mui/material";

import PasswordInput from "./PasswordInput";
import { IDynamicField } from "../types";
import AutocompleteSelect from "./AutocompleteSelect";
import { MuiFileUploader } from "mui-file-uploader";
import MultiSelect from "./MultiSelect";
import PhoneNumberInput from "./PhoneNumberInput";
import { formatDateToISOString } from "../utils/helper";
import { REGEX } from "../constants";

const DynamicField = ({
  item,
  itemData,
  error,
  errorText,
  color = "primary",
  disabled,
  value,
  onChange,
  size = "medium",
  sx,
  onError,
  countryCodes,
  getLocalizedText,
}: IDynamicField.FieldConfig) => {
  const {
    placeholder: _placeholder,
    isOptional,
    _key,
    fieldType,
    overRideValues = {},
    maxLength,
    multiple,
    countryCodeField,
    extraProps = {},
    extraData = [],
  } = item;

  const { slotProps = {}, ...restProps } = { ...(extraProps ?? {}) } as any;

  const onChangeValue = ({ target }: any) => {
    handleChange({ value: target.value, _key });
  };

  const handleChange = (data: IDynamicField.FieldChangeProps) => {
    if (maxLength && data?.value?.length > maxLength) {
      return;
    }
    onChange &&
      onChange({
        overRideValues,
        maxLength,
        value: data.value,
        _key: data._key,
        textValue: data.textValue,
      });
  };

  const placeholder = _placeholder
    ? (getLocalizedText?.(_placeholder) || _placeholder) +
      (isOptional ? "" : "*")
    : "";

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
          sx={sx}
          {...(extraProps as Partial<TextFieldProps>)}
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
          sx={sx}
          {...(extraProps as Partial<TextFieldProps>)}
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
          // {...restProps}
        >
          <InputLabel id={_key} {...((slotProps as any)?.inputLabel || {})}>
            {placeholder}
          </InputLabel>
          <Select
            labelId={_key}
            name={_key}
            label={placeholder}
            value={value ?? ""}
            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
            onChange={onChangeValue}
            sx={sx}
            slotProps={slotProps}
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
          type="tel"
          value={value ?? ""}
          onChange={(e) => {
            if (e.target.value.match(REGEX.NUMBERS.pattern)) {
              return e.preventDefault();
            }

            handleChange({ _key, value: e.target.value });
          }}
          size={size}
          onWheel={(event: React.WheelEvent<HTMLInputElement>) =>
            event.currentTarget.blur()
          }
          {...(extraProps as Partial<TextFieldProps>)}
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
          onChange={onChangeValue}
          sx={sx}
          {...(extraProps as Partial<TextFieldProps>)}
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
          value={value ? formatDateToISOString(value.toString()) : ""}
          onChange={onChangeValue}
          size={size}
          sx={sx}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            ...slotProps,
          }}
          {...(restProps as Partial<TextFieldProps>)}
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
          onChange={onChangeValue}
          size={size}
          sx={sx}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            ...slotProps,
          }}
          {...(restProps as Partial<TextFieldProps>)}
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
          value={value ? formatDateToISOString(value.toString(), true) : ""}
          onChange={onChangeValue}
          size={size}
          sx={sx}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            ...slotProps,
          }}
          {...(restProps as Partial<TextFieldProps>)}
        />
      );

    case "autocomplete":
      return (
        <AutocompleteSelect
          {...item}
          fullWidth
          color={color}
          error={error}
          errorText={errorText}
          placeholder={placeholder}
          name={_key}
          disabled={disabled}
          variant="outlined"
          value={value ?? ""}
          onChange={handleChange}
          size={size}
          sx={sx}
          _key={_key}
          fieldType={fieldType}
        />
      );

    case "checkbox":
      const { labelProps, checkboxProps } =
        extraProps as Partial<IDynamicField.CheckboxFieldProps>;

      return (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={() => handleChange({ _key, value: !value })}
                {...checkboxProps}
              />
            }
            label={getLocalizedText?.(_placeholder || "") || _placeholder}
            name={_key}
            disabled={disabled}
            sx={sx}
            {...labelProps}
          />
        </FormGroup>
      );

    case "file":
      return (
        <MuiFileUploader
          {...item}
          size={size}
          name={_key}
          label={placeholder}
          files={(value ? (Array.isArray(value) ? value : [value]) : []) as any}
          onChange={(value) => handleChange({ _key, value })}
          onError={onError}
          disabled={disabled}
          multiple={multiple}
          getLocalizedText={getLocalizedText}
          error={errorText}
          isOptional={isOptional}
          extraProps={extraProps as IDynamicField.FileUploaderProps}
        />
      );

    case "multiselect":
      return (
        <MultiSelect
          {...item}
          sx={sx}
          fullWidth
          multiline={!disabled}
          error={error}
          errorText={errorText}
          color={color}
          placeholder={placeholder}
          variant="outlined"
          value={value ?? []}
          disabled={disabled}
          onChange={onChange}
          extraData={extraData}
          size={size}
        />
      );

    case "phone":
      return (
        <PhoneNumberInput
          fullWidth
          color={color}
          error={error}
          helperText={errorText}
          label={placeholder}
          name={_key}
          disabled={disabled}
          variant="outlined"
          value={value ?? ""}
          handleChange={handleChange}
          size={size}
          sx={sx}
          countryCodes={countryCodes}
          countryCode={
            itemData && item.countryCodeField
              ? itemData[item.countryCodeField]
              : ""
          }
          countryCodeField={countryCodeField}
          {...(extraProps as Partial<TextFieldProps>)}
        />
      );
    default:
      return null;
  }
};

export default DynamicField;
