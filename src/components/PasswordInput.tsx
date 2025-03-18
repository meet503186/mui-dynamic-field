import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/**
 * A React functional component that renders a password input field with toggleable visibility.
 * This component is built using Material-UI's `TextField` and provides additional functionality
 * such as error handling, dynamic props, and a visibility toggle button.
 *
 * @param props - The configuration object for the password input field.
 * @param props.color - The color of the input field (e.g., primary, secondary).
 * @param props._key - The unique key or name for the input field.
 * @param props.error - A boolean indicating whether the input field is in an error state.
 * @param props.errorText - The helper text to display when the input field is in an error state.
 * @param props.label - The label for the input field.
 * @param props.value - The current value of the input field.
 * @param props.onChange - The callback function triggered when the input value changes.
 * @param props.disabled - A boolean indicating whether the input field is disabled.
 * @param props.size - The size of the input field (e.g., small, medium).
 * @param props.extraProps - Additional props to pass to the `TextField` component.
 *
 * @returns A password input field with a visibility toggle button.
 */
const PasswordInput = (props: TextFieldProps & { errorText?: string }) => {
  const {
    color,
    name,
    error,
    errorText,
    label,
    value,
    onChange,
    disabled,
    size,
    ...restProps
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      fullWidth
      color={color}
      error={error}
      helperText={errorText}
      label={label}
      name={name}
      disabled={disabled}
      variant="outlined"
      value={value ?? ""}
      onChange={onChange}
      size={size}
      onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
        (e.target as HTMLInputElement).blur()
      }
      slotProps={{
        input: {
          endAdornment: (
            <IconButton onClick={toggleShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        },
      }}
      {...restProps}
    />
  );
};

export default PasswordInput;
