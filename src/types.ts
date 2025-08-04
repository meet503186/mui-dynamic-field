import {
  SxProps,
  TextFieldProps,
  SelectProps,
  FormControlLabelProps,
  CheckboxProps,
  AutocompleteProps,
} from "@mui/material";
import { IFileUploader, IMedia } from "mui-file-uploader";

/**
 * Namespace for dynamic field types and configurations.
 * Contains types and interfaces used for building dynamic form fields.
 */
export namespace IDynamicField {
  /**
   * Represents a generic record with string keys and any values.
   */
  type GenericRecord = Record<string, any>;

  /**
   * Represents an option for a field, with customizable keys and optional label/value.
   * @template T - The shape of the record for custom keys.
   */
  export type Option<T extends GenericRecord = {}> = {
    [key in Extract<keyof T, string> | (string & { custom?: true })]?: any;
  } & {
    /**
     * Display label for the option.
     */
    label?: string;
    /**
     * Value for the option.
     */
    value?: string | number | boolean;
  };

  /**
   * Represents a mapping of values for a field, with customizable keys.
   * @template T - The shape of the record for custom keys.
   */
  export type MapValues<T extends GenericRecord = {}> = {
    [key in Extract<keyof T, string> | (string & { custom?: true })]?: any;
  };

  /**
   * Supported field types for dynamic fields.
   */
  export type FieldTypes =
    | "dropdown"
    | "text"
    | "password"
    | "number"
    | "textarea"
    | "date"
    | "time"
    | "datetime"
    | "checkbox"
    | "autocomplete"
    | "file"
    | "multiselect"
    | "phone";

  /**
   * Base interface for shared properties across all field configurations.
   * @template T - The shape of the record for custom keys.
   */
  interface BaseFieldItemConfig<T extends GenericRecord = {}> {
    /**
     * Unique key for the field.
     */
    _key: Extract<keyof T, string> | (string & { custom?: true });
    /**
     * Placeholder text for the field.
     */
    placeholder?: string;
    /**
     * Regex validation for the field.
     */
    regex?: {
      /**
       * Regex pattern.
       */
      pattern: RegExp;
      /**
       * Optional error message for regex validation.
       */
      message?: string;
    };
    /**
     * Additional data for the field, such as options.
     */
    extraData?: Option[] | string[] | number[];
    /**
     * Indicates if the field is optional.
     */
    isOptional?: boolean;
    /**
     * Medium size for layout purposes.
     */
    md?: number;
    /**
     * Options for fields like dropdowns or autocompletes.
     */
    options?: Option[];
    /**
     * Custom render function for the field.
     */
    renderField?: (props: any) => React.JSX.Element | string;
    /**
     * Override values for the field.
     */
    overRideValues?: Partial<MapValues<T>>;
    /**
     * Data key for the field.
     */
    dataKey?: Extract<keyof T, string> | (string & { custom?: true });
    /**
     * Dependency configuration for the field.
     */
    dependent?: {
      /**
       * Key of the dependent field.
       */
      _key: Extract<keyof T, string> | (string & { custom?: true });
      /**
       * Values that trigger the dependency.
       */
      value: any[];
    };
    [key: string]: any;
  }

  /**
   * Props for a checkbox field.
   */
  export interface CheckboxFieldProps {
    /**
     * Props for the FormControlLabel component.
     */
    labelProps: Partial<FormControlLabelProps>;
    /**
     * Props for the Checkbox component.
     */
    checkboxProps: Partial<CheckboxProps>;
  }

  /**
   * Props for an autocomplete field.
   */
  export interface AutoCompleteFieldProps
    extends AutocompleteProps<Option | string, false, false, false> {
    /**
     * Props for the TextField component.
     */
    textFieldProps?: Partial<TextFieldProps>;
  }

  /**
   * Props for a multiselect field.
   */
  export interface MultiSelectFieldProps
    extends AutocompleteProps<Option | string, true, false, false> {
    /**
     * Props for the TextField component.
     */
    textFieldProps?: Partial<TextFieldProps>;
  }

  /**
   * Props for a file uploader field.
   */
  export type FileUploaderProps = IFileUploader.Props["extraProps"];

  /**
   * Configuration for a single field item, with type-specific extraProps.
   * @template T - The shape of the record for custom keys.
   */
  export type FieldItemConfig<T extends GenericRecord = {}> =
    | (BaseFieldItemConfig<T> & {
        /**
         * Field type: file.
         */
        fieldType: "file";
        /**
         * Extra props for file uploader.
         */
        extraProps?: Partial<FileUploaderProps>;
      })
    | (BaseFieldItemConfig<T> & {
        /**
         * Field types: text, password, number, textarea, date, time, datetime.
         */
        fieldType:
          | "text"
          | "password"
          | "number"
          | "textarea"
          | "date"
          | "time"
          | "datetime";
        /**
         * Extra props for text fields.
         */
        extraProps?: Partial<TextFieldProps>;
      })
    | (BaseFieldItemConfig<T> & {
        /**
         * Field type: phone.
         */
        fieldType: "phone";
        /**
         * Key for country code field.
         */
        countryCodeField?: string;
        /**
         * Extra props for phone field.
         */
        extraProps?: Partial<TextFieldProps> & {
          /**
           * List of country codes.
           */
          countryCodes?: IDynamicField.Option[];
        };
      })
    | (BaseFieldItemConfig<T> & {
        /**
         * Field type: autocomplete.
         */
        fieldType: "autocomplete";
        /**
         * Extra props for autocomplete field.
         */
        extraProps?: Partial<AutoCompleteFieldProps>;
      })
    | (BaseFieldItemConfig<T> & {
        /**
         * Field type: multiselect.
         */
        fieldType: "multiselect";
        /**
         * Extra props for multiselect field.
         */
        extraProps?: Partial<MultiSelectFieldProps>;
      })
    | (BaseFieldItemConfig<T> & {
        /**
         * Field type: dropdown.
         */
        fieldType: "dropdown";
        /**
         * Extra props for dropdown field.
         */
        extraProps?: Partial<SelectProps>;
      })
    | (BaseFieldItemConfig<T> & {
        /**
         * Field type: checkbox.
         */
        fieldType: "checkbox";
        /**
         * Extra props for checkbox field.
         */
        extraProps?: Partial<CheckboxFieldProps>;
      });

  /**
   * Configuration for a dynamic field, including value, error state, and callbacks.
   */
  export interface FieldConfig {
    /**
     * Field item configuration.
     */
    item: FieldItemConfig;
    /**
     * Data associated with the field item.
     */
    itemData?: any;
    /**
     * Indicates if the field has an error.
     */
    error?: boolean;
    /**
     * Error text to display.
     */
    errorText?: string;
    /**
     * Color of the field.
     */
    color?: TextFieldProps["color"];
    /**
     * Indicates if the field is disabled.
     */
    disabled?: boolean;
    /**
     * Value of the field.
     */
    value: string | boolean | number | Option | File[] | MediaFileData[];
    /**
     * Style overrides for the field.
     */
    sx?: SxProps;
    /**
     * Callback for when the field value changes.
     */
    onChange?: (data: FieldChangeProps) => void;
    /**
     * Callback for when an error occurs.
     */
    onError?: (error: string) => void;
    /**
     * Size of the field.
     */
    size?: TextFieldProps["size"];
    /**
     * Function to get localized text.
     */
    getLocalizedText?: (key: string, params?: GenericRecord) => string;
  }

  /**
   * Props for field change events.
   * @template T - The shape of the record for custom keys.
   */
  export interface FieldChangeProps<T extends GenericRecord = {}> {
    /**
     * Key of the field that changed.
     */
    _key: Extract<keyof T, string> | (string & { custom?: true });
    /**
     * New value of the field.
     */
    value: any;
    [key: string]: any;
  }

  /**
   * State for dropdown fields, mapping keys to options.
   * @template T - The shape of the record for custom keys.
   */
  export type DropDownState<T extends GenericRecord = {}> = {
    [key in keyof MapValues<T>]: Option[];
  };

  /**
   * Data for media files.
   */
  export type MediaFileData = IMedia.FileData;
}
