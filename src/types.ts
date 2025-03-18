import { SxProps, TextFieldProps } from "@mui/material";

export namespace MuiDynamicInputTypes {
  /**
   * Represents an option in dropdowns, checkboxes, or autocomplete fields.
   */
  export interface IOption {
    label?: string;
    value?: string | number | boolean;
    [key: string]: any;
  }

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
    | "switch";

  export interface IFormFieldConfig {
    item: MuiDynamicInputTypes.IFormFieldItemConfig;
    error?: boolean;
    errorText?: string;
    color?: TextFieldProps["color"];
    disabled?: boolean;
    value: string | boolean | number | MuiDynamicInputTypes.IOption;
    sx?: SxProps;
    onChange?: (data: MuiDynamicInputTypes.IOnChangeProps) => void;
    size?: TextFieldProps["size"];
  }

  /**
   * Represents the configuration for a form field (input, select, picker, etc.).
   */
  export interface IFormFieldItemConfig<T extends Record<string, any> = {}> {
    _key: Extract<keyof T, string> | (string & { custom?: true });

    /**
     * Defines the type of the field (input, dropdown, picker, etc.).
     */
    fieldType: FieldTypes;

    placeholder?: string;
    extraProps?: Record<string, any>;
    regex?: RegExp;
    extraData?: IOption[] | string[] | number[];
    size?: "small" | "medium";
    isOptional?: boolean;
    md?: number;
    options?: IOption[];

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
  export interface IOnChangeProps<T extends Record<string, any> = {}> {
    _key: Extract<keyof T, string> | (string & { custom?: true });
    value: any;
    [key: string]: any;
  }

  /**
   * Represents the state for dropdown options.
   */
  export type IDropDownState<T extends Record<string, any> = {}> = {
    [key in keyof MapValues<T>]: IOption[];
  };
}
