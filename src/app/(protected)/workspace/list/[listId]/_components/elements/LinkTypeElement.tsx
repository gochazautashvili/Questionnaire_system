import { Link, QrCode } from "lucide-react";

interface LinkTypeElementProps {
  value: string;
}

const LinkTypeElement = ({ value }: LinkTypeElementProps) => {
  if (value === "qr_code") {
    return (
      <div className="flex items-center gap-2">
        <QrCode className="size-4" /> QR code
      </div>
    );
  }

  if (value === "link") {
    return (
      <div className="flex items-center gap-2">
        <Link className="size-4" /> Link
      </div>
    );
  }

  return <p>****</p>;
};

export default LinkTypeElement;
