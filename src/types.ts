import {
  SxProps,
  TextFieldProps,
  SelectProps,
  FormControlLabelProps,
  CheckboxProps,
  AutocompleteProps,
} from "@mui/material";
import { IFileUploader, IMedia } from "mui-file-uploader";

export namespace IDynamicField {
  type GenericRecord = Record<string, any>;
  export type Option<T extends GenericRecord = {}> = {
    [key in Extract<keyof T, string> | (string & { custom?: true })]?: any;
  } & {
    label?: string;
    value?: string | number | boolean;
  };

  export type MapValues<T extends GenericRecord = {}> = {
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
    | "file"
    | "multiselect"
    | "phone";

  // Base interface for shared props/members across all field configs
  interface BaseFieldItemConfig<T extends GenericRecord = {}> {
    _key: Extract<keyof T, string> | (string & { custom?: true });
    placeholder?: string;
    regex?: {
      pattern: RegExp;
      message?: string;
    };
    extraData?: Option[] | string[] | number[];
    isOptional?: boolean;
    md?: number;
    options?: Option[];
    renderField?: (props: any) => React.JSX.Element | string;
    overRideValues?: Partial<MapValues<T>>;
    dataKey?: Extract<keyof T, string> | (string & { custom?: true });
    dependent?: {
      _key: Extract<keyof T, string> | (string & { custom?: true });
      value: any[];
    };
    [key: string]: any;
  }

  export interface CheckboxFieldProps {
    labelProps: Partial<FormControlLabelProps>;
    checkboxProps: Partial<CheckboxProps>;
  }

  export interface AutoCompleteFieldProps
    extends AutocompleteProps<Option | string, false, false, false> {
    textFieldProps?: Partial<TextFieldProps>;
  }

  export interface MultiSelectFieldProps
    extends AutocompleteProps<Option | string, true, false, false> {
    textFieldProps?: Partial<TextFieldProps>;
  }

  export type FileUploaderProps = IFileUploader.Props["extraProps"];

  // Specific field configs by fieldType, with correctly typed extraProps

  export type FieldItemConfig<T extends GenericRecord = {}> =
    | (BaseFieldItemConfig<T> & {
        fieldType: "file";
        extraProps?: Partial<FileUploaderProps>;
      })
    | (BaseFieldItemConfig<T> & {
        fieldType:
          | "text"
          | "password"
          | "number"
          | "textarea"
          | "date"
          | "time"
          | "datetime";
        extraProps?: Partial<TextFieldProps>;
      })
    | (BaseFieldItemConfig<T> & {
        fieldType: "phone";
        countryCodeField?: string;
        extraProps?: Partial<TextFieldProps> & {
          countryCodes?: IDynamicField.Option[];
        };
      })
    | (BaseFieldItemConfig<T> & {
        fieldType: "autocomplete";
        extraProps?: Partial<AutoCompleteFieldProps>;
      })
    | (BaseFieldItemConfig<T> & {
        fieldType: "multiselect";
        extraProps?: Partial<MultiSelectFieldProps>;
      })
    | (BaseFieldItemConfig<T> & {
        fieldType: "dropdown";
        extraProps?: Partial<SelectProps>;
      })
    | (BaseFieldItemConfig<T> & {
        fieldType: "checkbox";
        extraProps?: Partial<CheckboxFieldProps>;
      });

  export interface FieldConfig {
    item: FieldItemConfig;
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
    countryCodes?: Option[];
    getLocalizedText?: (key: string, params?: GenericRecord) => string;
  }

  export interface FieldChangeProps<T extends GenericRecord = {}> {
    _key: Extract<keyof T, string> | (string & { custom?: true });
    value: any;
    [key: string]: any;
  }

  export type DropDownState<T extends GenericRecord = {}> = {
    [key in keyof MapValues<T>]: Option[];
  };

  export type MediaFileData = IMedia.FileData;
}
