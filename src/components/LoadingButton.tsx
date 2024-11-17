import { Loader2, LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

interface LoadingButtonProps extends ButtonProps {
  RightIcon?: LucideIcon;
  LeftIcon?: LucideIcon;
  isLoading: boolean;
}

const LoadingButton = ({
  isLoading,
  LeftIcon,
  RightIcon,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button disabled={props.disabled || isLoading} {...props}>
      {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
      {!isLoading && RightIcon && <RightIcon className="mr-2 size-4" />}
      {props.children}
      {LeftIcon && <LeftIcon className="ml-2 size-4" />}
    </Button>
  );
};

export default LoadingButton;
