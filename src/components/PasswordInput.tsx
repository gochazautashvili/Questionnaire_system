"use client";
import { useState } from "react";
import { Input, InputProps } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = (props: InputProps) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <div className="relative flex w-full items-center justify-between">
      <Input type={isPassword ? "password" : "text"} {...props} />
      <div
        onClick={() => setIsPassword((prev) => !prev)}
        className="absolute right-2 flex size-5 cursor-pointer items-center justify-center opacity-80"
      >
        {isPassword ? <EyeOff /> : <Eye />}
      </div>
    </div>
  );
};

export default PasswordInput;
