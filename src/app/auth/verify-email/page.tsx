import { notFound } from "next/navigation";
import VerifyEmail from "../_components/VerifyEmail";

interface VerifyEmailPageProps {
  searchParams: { token: string };
}

const VerifyEmailPage = async ({
  searchParams: { token },
}: VerifyEmailPageProps) => {
  if (!token) return notFound();

  return (
    <section className="flex h-[300px] w-full max-w-[400px] items-center justify-center rounded-lg bg-slate-50 p-4">
      <VerifyEmail token={token} />
    </section>
  );
};

export default VerifyEmailPage;
