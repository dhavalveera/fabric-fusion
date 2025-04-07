import { forwardRef } from "react";

// utils
import { cn } from "@/utils/cn";

// types
import { CheckboxInputProps } from "@/types";

const Checkbox = forwardRef<HTMLInputElement, CheckboxInputProps>((props, ref) => {
  const { className = "", label, id, ...rest } = props;

  return (
    <>
      <div className="flex items-center">
        <div className="flex">
          <input
            type="checkbox"
            className={cn(
              "mt-0.5 shrink-0 rounded-sm border-gray-200 text-blue-600 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800",
              className,
            )}
            ref={ref}
            {...rest}
          />
        </div>
        <div className="ms-3">
          <label htmlFor={id} className="font-della-respira text-sm dark:text-white">
            {label}
          </label>
        </div>
      </div>
    </>
  );
});

export default Checkbox;
