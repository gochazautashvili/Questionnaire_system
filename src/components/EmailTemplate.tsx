interface EmailTemplateProps {
  name: string;
  user_JWT: string;
}

export const EmailTemplate = ({ name, user_JWT }: EmailTemplateProps) => (
  <div>
    <h1 className="text-3xl text-primary">Welcome, {name}!</h1>
    <p className="mb-5 mt-3">This link will verify your email address</p>
    <a
      href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/verify-email?token=${user_JWT}`}
    >
      Verify email link
    </a>
  </div>
);
