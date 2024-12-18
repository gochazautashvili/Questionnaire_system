import { getFormByListId } from "@/server/db/form";
import { notFound } from "next/navigation";
import Form from "./_components/Form";

interface BuildFormPageProps {
  params: { listId: string };
}

const BuildFormPage = async ({ params: { listId } }: BuildFormPageProps) => {
  const form = await getFormByListId(listId);

  if (!form) return notFound();

  return <Form form={form} />;
};

export default BuildFormPage;
