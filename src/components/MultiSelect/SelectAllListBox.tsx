import {
  ForwardedRef,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  createContext,
} from "react";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material";

interface IContextProps {
  onSelectAll: (selectedAll: boolean) => void;
  selectedAll: boolean;
  indeterminate: boolean;
}

const contextDefaultValue: IContextProps = {
  onSelectAll: () => void null,
  selectedAll: false,
  indeterminate: false,
};
type ContextType = Omit<IContextProps, "indeterminate"> & {
  indeterminate?: boolean;
};
const MuiAutocompleteSelectAllContext =
  createContext<ContextType>(contextDefaultValue);

type ListBoxProps = React.HTMLAttributes<HTMLUListElement>;
type NullableUlElement = HTMLUListElement | null;

// eslint-disable-next-line react-refresh/only-export-components
const MuiAutocompleteSelectAllListBox = forwardRef(function ListBoxBase(
  props: ListBoxProps,
  ref: ForwardedRef<HTMLUListElement>
) {
  const theme = useTheme();
  const { children, ...rest } = props;

  const innerRef = useRef<HTMLUListElement>(null);

  useImperativeHandle<NullableUlElement, NullableUlElement>(
    ref,
    () => innerRef.current
  );

  const { onSelectAll, selectedAll, indeterminate } = useContext(
    MuiAutocompleteSelectAllContext
  );

  return (
    <ul {...rest} ref={innerRef} role="list-box">
      <li style={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          id="selectAll"
          indeterminate={indeterminate}
          checked={selectedAll}
          onChange={() => onSelectAll(selectedAll)}
          // TODO: use primary color without defining
          sx={{ ml: 2, color: `${theme.palette.primary.main} !important` }}
        />
        Select All
      </li>
      <Divider />
      {children}
    </ul>
  );
});

export const MuiAutocompleteSelectAll = {
  Provider: MuiAutocompleteSelectAllContext.Provider,
  ListBox: MuiAutocompleteSelectAllListBox,
};
