import { IDynamicField } from "./types";

export const getUpdatedKey = (_key: string): string => `updated_${_key}`;
export const getErrorKey = (_key: string): string => `er_${_key}`;
export const getErrorText = (_key: string): string => `er_txt_${_key}`;

interface IValidationProps<
  T extends Record<string, any> = Record<string, any>
> {
  _state: Record<string, any>;
  fields: IDynamicField.FieldItemConfig<T>[];
  customFunctions?: Record<string, () => string | null>;
}

export const validateFields = <T extends Record<string, any>>({
  _state,
  fields,
  customFunctions,
}: IValidationProps<T>) => {
  let isValid = true;
  const updatedState = { ..._state };

  // Helper to set an error message
  const setError = (_key: string, message: string) => {
    isValid = false;
    updatedState[getErrorKey(_key)] = true;
    updatedState[getErrorText(_key)] = message;
  };

  fields.forEach(
    ({
      isOptional,
      regex,
      _key,
      dependent,
      minLength,
      maxLength,
      placeholder,
    }) => {
      const fieldValue = updatedState[_key];

      // Skip validation if the field is optional and empty
      if (!fieldValue && isOptional) return;

      // Skip validation if the field has a dependency that isn't met
      if (dependent && updatedState[dependent._key] !== dependent.value) return;

      // Handle array fields
      if (Array.isArray(fieldValue) && fieldValue.length) {
        updatedState[getErrorKey(_key)] = false;
        updatedState[getErrorText(_key)] = "";
        return;
      }

      // Handle required fields
      if (fieldValue === undefined || fieldValue === null) {
        setError(_key, `${placeholder || "Field"} is required`);
        return;
      }

      // Handle min/max length validation
      if (typeof fieldValue === "string") {
        if (minLength && fieldValue.length < minLength) {
          setError(_key, `Minimum length should be ${minLength}`);
          return;
        }
        if (maxLength && fieldValue.length > maxLength) {
          setError(_key, `Maximum length should be ${maxLength}`);
          return;
        }
      }

      // Handle negative number validation
      if (typeof fieldValue === "number" && fieldValue < 0) {
        setError(_key, "Please enter a valid value");
        return;
      }

      // Handle empty or whitespace-only fields
      if (typeof fieldValue === "string" && !fieldValue.trim().length) {
        setError(_key, "Please enter a valid value");
        return;
      }

      // Handle regex validation
      if (regex && typeof fieldValue === "string" && !regex.test(fieldValue)) {
        setError(_key, "Invalid format");
        return;
      }

      // Validate using custom functions
      if (customFunctions?.[_key]) {
        const error = customFunctions[_key]();
        if (error) {
          setError(_key, error);
          return;
        }
      }

      // Clear previous errors if validation passes
      updatedState[getErrorKey(_key)] = false;
      updatedState[getErrorText(_key)] = "";
      updatedState[_key] =
        typeof fieldValue === "string" ? fieldValue.trim() : fieldValue;
    }
  );

  return { isValid, _state: updatedState };
};

export const queryString = (obj: Record<string, any>): string => {
  return Object.entries(obj)
    .reduce<string[]>((acc, [key, value]) => {
      if (value !== undefined && value !== "") {
        if (Array.isArray(value)) {
          const val = value.map((item) =>
            typeof item === "object" ? item.label || item : item
          );
          if (val.length) {
            acc.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(val.join(","))}`
            );
          }
        } else {
          acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
      }
      return acc;
    }, [])
    .join("&");
};

export function extractValue<T extends unknown>(obj: T, key: string): unknown {
  if (!obj) {
    return "";
  }

  return obj[key as keyof T] ?? obj ?? "";
}
