import { forwardRef, type ComponentProps } from "react";

// Helpers => clsx to Join multiple ClassNames
import { clsx } from "~/helpers/clsx";

interface InputProps extends Omit<ComponentProps<"input">, "ref"> {
  additionalClass?: string;
  idName: string;
  inputLabel: string;
  isError?: boolean;
  errorMsg?: string;
  whiteLabelColor?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { additionalClass = "", className = "", idName, inputLabel, errorMsg, whiteLabelColor, required, isError = false, ...rest } = props;

  return (
    <>
      <div className="flex flex-col font-medium">
        <span className="mb-2">
          <label htmlFor={inputLabel} className={clsx(["text-sm", whiteLabelColor ? "text-white" : "text-primary-marine-blue"])}>
            {inputLabel}
          </label>
        </span>

        <input
          name={idName}
          id={idName}
          required={required}
          aria-required="true"
          className={clsx([
            className,
            "border-neutral-light-gray focus:ring-primary-purplish-blue rounded border px-4 py-2 text-sm transition-all focus:outline-none focus:ring-1",
            isError ? "ring-primary-starberry-red ring-1" : "",
          ])}
          ref={ref}
          {...rest}
        />

        <div>{required && isError ? <p className="text-primary-starberry-red mt-2 leading-3">{errorMsg ? errorMsg : "This is field required"}</p> : null}</div>
      </div>
    </>
  );
});

InputField.displayName = "Input";
