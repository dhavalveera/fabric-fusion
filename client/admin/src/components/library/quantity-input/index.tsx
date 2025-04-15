import { forwardRef } from "react";

// utils
import { cn } from "@/utils/cn";

// types
import type { QuantityInputProps } from "@/types";

const QuantityInput = forwardRef<HTMLInputElement, QuantityInputProps>((props, ref) => {
  const { className = "", label, id, onDecrement, onIncrement, value, ...rest } = props;

  return (
    <>
      <label htmlFor={id}>{label}</label>

      <div className="mt-2 flex w-fit items-center rounded-sm border border-gray-200 text-center dark:border-gray-800">
        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 disabled:cursor-not-allowed disabled:border-none disabled:bg-[#cccccc] disabled:text-[#666666] disabled:opacity-50 dark:text-gray-300"
          onClick={onDecrement}
          disabled={value < 1}
        >
          &minus;
        </button>

        <input
          ref={ref}
          type="number"
          value={value}
          {...rest}
          className={cn(
            "h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm dark:bg-gray-900 dark:text-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
            className,
          )}
        />

        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 disabled:cursor-not-allowed disabled:border-none disabled:bg-[#cccccc] disabled:text-[#666666] disabled:opacity-50 dark:text-gray-300"
          onClick={onIncrement}
        >
          &#x2b;
        </button>
      </div>
    </>
  );
});

export default QuantityInput;
