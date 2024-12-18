import ColumnSheet from "../../_components/columns/ColumnSheet";
import Navigator from "@/components/Navigator";
import StyleSheet from "./styles/StyleSheet";
import { TStyles } from "@/lib/types";

interface NavbarProps {
  listId: string;
  formId: string;
  styles: TStyles;
  handleEditStyles: ({}: {
    key: keyof TStyles;
    value: string | number;
  }) => void;
}

const Navbar = ({ listId, formId, handleEditStyles, styles }: NavbarProps) => {
  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between gap-5">
      <Navigator name="Back" url={`/workspace/list/${listId}`} left />
      <div className="flex items-center gap-4">
        <Navigator name="Links" right url={`/workspace/list/${listId}/links`} />
        <ColumnSheet isPublic formId={formId} />
        <StyleSheet
          formId={formId}
          styles={styles}
          handleEditStyles={handleEditStyles}
        />
      </div>
    </div>
  );
};

export default Navbar;
