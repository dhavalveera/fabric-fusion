import { forwardRef } from "react";

// Utils
import { cn } from "@/utils/cn";

// types
import type { StepperProps } from "@/types";

const Stepper = forwardRef<HTMLDivElement, StepperProps>((props, ref) => {
  const { activeStep, className = "", stepsData, ...rest } = props;

  const totalSteps = stepsData.length;

  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  return (
    <div className={cn("mx-auto w-full max-w-2xl px-4 pb-10", className)} ref={ref} {...rest}>
      <div className="before:transform-y-1/2 relative mt-14 flex justify-between before:absolute before:top-1/2 before:left-0 before:h-1 before:w-full before:bg-slate-200">
        {stepsData.map(({ label, step }, index) => {
          return (
            <div className="relative z-10" key={index}>
              <div
                className={cn("flex size-8 items-center justify-center rounded-full border-2 border-zinc-200 bg-white transition-all delay-200 ease-in", activeStep === step ? "border-slate-400" : "")}
              >
                {activeStep > step ? (
                  <div className="font-della-respira -scale-x-100 rotate-45 text-base font-semibold text-slate-400">L</div>
                ) : (
                  <span className="font-della-respira text-lg font-medium text-zinc-400">{step}</span>
                )}
              </div>
              <div className="absolute top-16 left-1/2 -translate-x-2/4 -translate-y-2/4">
                <span className={cn("font-della-respira text-lg font-semibold text-zinc-400", activeStep === step ? "block" : "hidden", "md:block")}>{label}</span>
              </div>
            </div>
          );
        })}
        <div className="transform-y-1/2 absolute top-1/2 left-0 h-1 w-full bg-slate-400 transition-all delay-200 ease-in" style={{ width: width }} />
      </div>
    </div>
  );
});

export default Stepper;
