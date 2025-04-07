import { forwardRef } from "react";

// utils
import { cn } from "@/utils/cn";

// types
import { InputProps } from "@/types";

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className = "", label, icon: Icon, id, ...rest } = props;

  return (
    <>
      <label htmlFor={id} className="font-della-respira ml-2 text-left">
        {label}
      </label>
      <div className="relative">
        <input
          className={cn(
            "peer block w-full rounded-lg border-transparent bg-gray-100 px-4 py-2.5 ps-11 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm dark:border-transparent dark:bg-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
            className,
          )}
          ref={ref}
          {...rest}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
          {Icon ? <Icon className="size-4 shrink-0 text-gray-500 dark:text-neutral-500" /> : null}
        </div>
      </div>
    </>
  );
});

export default Input;
