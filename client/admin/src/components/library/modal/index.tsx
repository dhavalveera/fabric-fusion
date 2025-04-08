import { forwardRef } from "react";

// framer-motion
import { AnimatePresence, motion } from "framer-motion";

// heroicons
import { XMarkIcon } from "@heroicons/react/24/solid";

// utils
import { cn } from "@/utils/cn";

// types
import type { CustomModalProps } from "@/types";

const CustomModal = forwardRef<HTMLDivElement, CustomModalProps>((props, ref) => {
  const { isOpen, modalTitle, setIsOpen, isOtpSent, secondaryDivClassName = "", showCloseButton = false, className = "", children, ...rest } = props;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.2, // 0.2 Seconds Delay
          }}
          exit={{ opacity: 0 }}
          onClick={() => (isOtpSent ? null : setIsOpen(false))}
          className={cn("fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll p-8 shadow-sm backdrop-blur", className)}
          ref={ref}
          {...rest}
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={e => e.stopPropagation()}
            className={cn("relative w-full max-w-lg cursor-default overflow-hidden rounded-lg bg-white p-6 shadow-xl", secondaryDivClassName)}
          >
            <div className="mb-7 flex w-full justify-between border-b">
              <p className="text-lg font-semibold">{modalTitle}</p>

              {showCloseButton ? (
                <button type="button" className="cursor-pointer" onClick={() => (isOtpSent ? null : setIsOpen(false))}>
                  <XMarkIcon className="size-7" />
                </button>
              ) : null}
            </div>

            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});

export default CustomModal;
