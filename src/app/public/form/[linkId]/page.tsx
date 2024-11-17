import { getLinkWithForm } from "@/server/db/link";
import Form from "./_components/Form";
import { notFound } from "next/navigation";

interface PublicFormPageProps {
  params: { linkId: string };
}

const PublicFormPage = async ({ params: { linkId } }: PublicFormPageProps) => {
  const link = await getLinkWithForm(linkId);

  if (!link) return notFound();

  return <Form link={link} />;
};

export default PublicFormPage;
