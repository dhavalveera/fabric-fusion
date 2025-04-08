import { forwardRef } from "react";

// framer-motion
import { motion, useAnimate, useDragControls, useMotionValue } from "framer-motion";

// react-use-measure
import useMeasure from "react-use-measure";

// utils
import { cn } from "@/utils/cn";

// types
import type { BottomDrawerProps } from "@/types";

const BottomDrawer = forwardRef<HTMLDivElement, BottomDrawerProps>((props, ref) => {
  const { className = "", children, drawerHeight = 60, openDrawer, setOpenDrawer, ...rest } = props;

  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#bottomDrawer", {
      y: [yStart, height],
    });

    setOpenDrawer(false);
  };

  return (
    <>
      {openDrawer ? (
        <motion.div
          role="button"
          ref={scope}
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("fixed inset-0 z-50 w-full bg-gray-100", className)}
          {...rest}
        >
          <motion.div
            id="bottomDrawer"
            ref={node => {
              drawerRef(node);

              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            onClick={e => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }} // Ensures smooth closing
            transition={{
              ease: "easeInOut",
              duration: 0.4, // Adjust duration for slower closing
            }}
            className="absolute bottom-0 w-full overflow-hidden rounded-t-3xl bg-gray-100"
            style={{ y, height: "auto", maxHeight: `${drawerHeight}vh` }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-center bg-gray-300 p-3">
              <div className="w-full">
                <motion.button
                  type="button"
                  onPointerDown={e => {
                    controls.start(e);
                  }}
                  onClick={handleClose}
                  className="h-2 w-14 cursor-grab touch-none rounded-full bg-gray-500 active:cursor-grabbing"
                />
              </div>
            </div>

            <div className="relative z-0 h-full max-h-full overflow-y-scroll p-4 pt-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="mb-6 flex w-full justify-end" />
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </>
  );
});

export default BottomDrawer;
