import { SxProps, TextFieldProps } from "@mui/material";
import { IFileUploader, IMedia } from "mui-file-uploader";

export namespace IDynamicField {
  /**
   * Represents an option in dropdowns, checkboxes, or autocomplete fields.
   */
  export type Option<T extends Record<string, any> = {}> = {
    [key in Extract<keyof T, string> | (string & { custom?: true })]?: any;
  } & {
    label?: string;
    value?: string | number | boolean;
  };

  /**
   * Maps the values of an object.
   */
  export type MapValues<T extends Record<string, any> = {}> = {
    [key in Extract<keyof T, string> | (string & { custom?: true })]?: any;
  };

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
    | "radio"
    | "switch"
    | "file"
    | "multiselect"
    | "phone";

  export interface FieldConfig {
    item: IDynamicField.FieldItemConfig;
    itemData?: any;
    error?: boolean;
    errorText?: string;
    color?: TextFieldProps["color"];
    disabled?: boolean;
    value: string | boolean | number | Option | File[] | MediaFileData[];
    sx?: SxProps;
    onChange?: (data: FieldChangeProps) => void;
    onError?: (error: string) => void;
    size?: TextFieldProps["size"];
    countryCodes?: IDynamicField.Option[];
    getLocalizedText?: (key: string) => string;
  }

  /**
   * Represents the configuration for a form field (input, select, picker, etc.).
   */
  export interface FieldItemConfig<T extends Record<string, any> = {}> {
    _key: Extract<keyof T, string> | (string & { custom?: true });

    /**
     * Defines the type of the field (input, dropdown, picker, etc.).
     */
    fieldType: FieldTypes;

    placeholder?: string;
    extraProps?:
      | (Partial<IFileUploader.Props["extraProps"]> & Record<string, unknown>)
      | {};
    regex?: RegExp;
    extraData?: Option[] | string[] | number[];
    isOptional?: boolean;
    md?: number;
    options?: Option[];

    /**
     * Custom render function for advanced field rendering.
     */
    renderField?: (props: any) => React.JSX.Element | string;

    /**
     * Overrides specific values dynamically.
     */
    overRideValues?: Partial<MapValues<T>>;

    dataKey?: Extract<keyof T, string> | (string & { custom?: true });

    /**
     * Defines if the field is dependent on another field.
     */
    dependent?: {
      _key: Extract<keyof T, string> | (string & { custom?: true });
      value: any[];
    };

    [key: string]: any;
  }

  /**
   * Represents the properties passed to the onChange event of a form field.
   */
  export interface FieldChangeProps<T extends Record<string, any> = {}> {
    _key: Extract<keyof T, string> | (string & { custom?: true });
    value: any;
    [key: string]: any;
  }

  /**
   * Represents the state for dropdown options.
   */
  export type DropDownState<T extends Record<string, any> = {}> = {
    [key in keyof MapValues<T>]: Option[];
  };

  export type MediaFileData = IMedia.FileData;
}
