import ColumnSheet from "../_components/columns/ColumnSheet";
import Navigator from "@/components/Navigator";

interface NavbarProps {
  listId: string;
  formId: string;
}

const Navbar = ({ listId, formId }: NavbarProps) => {
  return (
    <div className="absolute top-0 flex w-full items-center justify-between gap-5">
      <Navigator name="Back" url={`/workspace/list/${listId}`} left />
      <div className="flex items-center gap-4">
        <Navigator name="Links" right url={`/workspace/list/${listId}/links`} />
        <ColumnSheet isPublic formId={formId} />
      </div>
    </div>
  );
};

export default Navbar;
