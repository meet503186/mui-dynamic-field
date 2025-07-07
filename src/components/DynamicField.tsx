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
import { IFileUploader, MuiFileUploader } from "mui-file-uploader";
import MultiSelect from "./MultiSelect";
import PhoneNumberInput from "./PhoneNumberInput";
import { formatDateToISOString } from "../utils/helper";

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

  const { slotProps = {}, ...restProps } = { ...(extraProps ?? {}) };

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
          {...extraProps}
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
          {...extraProps}
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
          type="number"
          value={value ?? ""}
          onChange={onChangeValue}
          size={size}
          onWheel={(event: React.WheelEvent<HTMLInputElement>) =>
            event.currentTarget.blur()
          }
          {...extraProps}
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
          {...extraProps}
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
          onChange={onChangeValue}
          size={size}
          sx={sx}
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
          {...extraProps}
        />
      );

    case "checkbox":
      return (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                slotProps={slotProps}
                onChange={() => handleChange({ _key, value: !value })}
              />
            }
            label={getLocalizedText?.(_placeholder || "") || _placeholder}
            name={_key}
            disabled={disabled}
            sx={sx}
            {...extraProps}
          />
        </FormGroup>
      );

    case "file":
      const { onUploadFile, onDeleteFile, onSubmit, count, ...rest }: any =
        extraProps || {};

      return (
        <MuiFileUploader
          size={size}
          name={_key}
          label={placeholder}
          files={(value ? (Array.isArray(value) ? value : [value]) : []) as any}
          onChange={(value) => handleChange({ _key, value })}
          onError={onError}
          disabled={disabled}
          multiple={multiple}
          onUploadFile={onUploadFile}
          onDeleteFile={onDeleteFile}
          onSubmit={onSubmit}
          getLocalizedText={getLocalizedText}
          count={count}
          error={errorText}
          isOptional={isOptional}
          extraProps={rest as IFileUploader.Props["extraProps"]}
        />
      );

    case "multiselect":
      return (
        <MultiSelect
          _key={_key}
          sx={sx}
          fullWidth
          multiline={!disabled}
          error={error}
          errorText={errorText}
          color={color}
          label={placeholder}
          variant="outlined"
          value={value ?? []}
          disabled={disabled}
          onChange={onChange}
          extraData={extraData}
          size={size}
          {...extraProps}
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
          countryCode={itemData ? itemData[item.countryCodeField] : ""}
          countryCodeField={countryCodeField}
          {...extraProps}
        />
      );
    default:
      return null;
  }
};

export default DynamicField;
