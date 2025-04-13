import { forwardRef } from "react";

// HeadlessUI
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

// Heroicons
import { XMarkIcon } from "@heroicons/react/24/outline";

// utils
import { cn } from "@/utils/cn";

// types
import type { RightDrawerProps } from "@/types";

const RightDrawer = forwardRef<HTMLDivElement, RightDrawerProps>((props, ref) => {
  const { className = "", children, openRightSidebar, setOpenRightSidebar, pageTitle, ...rest } = props;

  return (
    <Dialog open={openRightSidebar} onClose={setOpenRightSidebar}>
      <div className={cn("relative z-10", className)} ref={ref} {...rest}>
        <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel transition className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="font-della-respira text-lg font-medium text-gray-900">{pageTitle}</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button type="button" onClick={() => setOpenRightSidebar(false)} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">{children}</div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
});

export default RightDrawer;
