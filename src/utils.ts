import { IDynamicField } from "./types";

export const getUpdatedKey = (_key: string): string => `updated_${_key}`;
export const getErrorKey = (_key: string): string => `er_${_key}`;
export const getErrorText = (_key: string): string => `er_txt_${_key}`;

interface IValidationProps<
  T extends Record<string, any> = Record<string, any>
> {
  _state: Record<string, any>;
  fields: IDynamicField.FieldItemConfig<T>[];
  getLocalizedText?: (text: string, params?: Record<string, any>) => string;
  customFunctions?: Record<string, () => string | null>;
  ignoreFields?: string[];
}

export const validateFields = <T extends Record<string, any>>({
  _state,
  fields,
  getLocalizedText,
  customFunctions,
  ignoreFields,
}: IValidationProps<T>) => {
  let isValid = true;
  const updatedState = { ..._state };

  // Helper to set an error message
  const setError = (
    _key: string,
    message: string,
    localizedKey?: string,
    localizedParams?: Record<string, any>
  ) => {
    isValid = false;
    updatedState[getErrorKey(_key)] = true;
    updatedState[getErrorText(_key)] =
      getLocalizedText && localizedKey
        ? getLocalizedText(localizedKey, localizedParams)
        : message;
  };

  fields.forEach(
    ({
      isOptional,
      regex,
      _key,
      dependent,
      minLength,
      maxLength,
      min,
      max,
      placeholder,
      hidden,
    }) => {
      const fieldValue = updatedState[_key];

      // Skip if _key is in ignoreFields
      if (ignoreFields?.includes(_key) || hidden) return;

      // Skip validation if the field is optional and empty
      if ((!fieldValue && isOptional) || !_key) return;

      // Skip validation if the field has a dependency that isn't met
      if (dependent && updatedState[dependent._key] !== dependent.value) return;

      // Handle array fields
      if (Array.isArray(fieldValue) && fieldValue.length) {
        updatedState[getErrorKey(_key)] = false;
        updatedState[getErrorText(_key)] = "";
        return;
      }

      if (Array.isArray(fieldValue) && !fieldValue.length) {
        setError(
          _key,
          `${placeholder || "Field"} is required`,
          "placeholderIsRequired",
          { placeholder: getLocalizedText?.(placeholder || "field") }
        );
        return;
      }

      // Handle required fields
      if (fieldValue === undefined || fieldValue === null) {
        setError(
          _key,
          `${placeholder || "Field"} is required`,
          "placeholderIsRequired",
          { placeholder: getLocalizedText?.(placeholder || "field") }
        );
        return;
      }

      // Handle min/max length validation
      if (typeof fieldValue === "string") {
        if (
          (minLength && fieldValue.length < minLength) ||
          (min && fieldValue.length < min)
        ) {
          setError(
            _key,
            `Minimum length should be ${minLength || min}`,
            "minLengthError",
            { minLength: minLength || min }
          );
          return;
        }
        if (
          (maxLength && fieldValue.length > maxLength) ||
          (max && fieldValue.length > max)
        ) {
          setError(
            _key,
            `Maximum length should be ${maxLength || max}`,
            "maxLengthError",
            { maxLength: maxLength || max }
          );
          return;
        }
      }

      // Handle negative number validation
      if (typeof +fieldValue === "number" && +fieldValue < 0) {
        setError(_key, "Please enter a valid value", "invalidValue");
        return;
      }

      // Handle empty or whitespace-only fields
      if (typeof fieldValue === "string" && !fieldValue.trim().length) {
        setError(_key, "Please enter a valid value", "invalidValue");
        return;
      }

      // Handle regex validation
      if (regex && typeof fieldValue === "string") {
        const _regexExp = new RegExp(regex.pattern);

        if (!_regexExp.test(fieldValue)) {
          setError(_key, "Invalid format", regex.message);
          return;
        }
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

          val.forEach((v) => {
            acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
          });
        } else {
          acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
      }

      return acc;
    }, [])
    .join("&");
};

export function extractValue<T>(obj: T, key: string): unknown {
  if (!obj?.toString()) {
    return "";
  }

  return obj[key as keyof T] ?? obj ?? "";
}
