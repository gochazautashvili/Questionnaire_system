import FormElements from "@/components/form/FormElements";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getFormByListId } from "@/server/db/form";
import { notFound } from "next/navigation";
import ColumnSettings from "../_components/columns/ColumnSettings";
import Navbar from "./Navbar";

interface BuildFormPageProps {
  params: { listId: string };
}

const BuildFormPage = async ({ params: { listId } }: BuildFormPageProps) => {
  const form = await getFormByListId(listId);

  if (!form) return notFound();

  return (
    <section className="relative flex h-full w-full items-center justify-center">
      <Navbar listId={form.listId} formId={form.id} />
      <div className="mx-auto flex w-full max-w-[700px] flex-col gap-4 rounded-md bg-white p-5">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-bold">{form.title}</h1>
          <p className="text-sm font-semibold text-gray-500">{form.subtitle}</p>
        </div>
        {form.columns.map((column) => (
          <div key={column.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <Label className="font-semibold">{column.name}</Label>
              <ColumnSettings isPublic={true} column={column} />
            </div>
            <FormElements key={column.id} column={column} />
          </div>
        ))}
        <Button className="self-end">Submit</Button>
      </div>
    </section>
  );
};

export default BuildFormPage;
