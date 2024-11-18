import Link from "next/link";
import { Button, ButtonProps } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigatorProps extends ButtonProps {
  url: string;
  name: string;
  left?: boolean;
  right?: boolean;
}

const Navigator = (props: NavigatorProps) => {
  const { name, url, left, right, ...buttonProps } = props;

  return (
    <Button {...buttonProps} asChild variant="outline" size="sm">
      <Link href={url} prefetch={true}>
        {left && <ArrowLeft />}
        {name}
        {right && <ArrowRight />}
      </Link>
    </Button>
  );
};

export default Navigator;
