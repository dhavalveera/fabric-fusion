import { forwardRef } from "react";

// framer motion
import { motion, useAnimate, useDragControls, useMotionValue } from "framer-motion";

// react use measure
import useMeasure from "react-use-measure";

// utils
import { cn } from "@/utils/cn";

// types
import type { BottomDrawerProps } from "@/types";

const BottomDrawer = forwardRef<HTMLDivElement, BottomDrawerProps>((props, ref) => {
  const { className = "", children, openDrawer, setOpenDrawer, ...rest } = props;

  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpenDrawer(false);
  };

  return (
    <>
      {openDrawer ? (
        <>
          <motion.div ref={scope} initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleClose} className="fixed inset-0 z-50 bg-neutral-950/70">
            <motion.div
              id="drawer"
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
              transition={{
                ease: "easeInOut",
              }}
              className={cn("absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-white", className)}
              style={{ y }}
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
              {...rest}
            >
              <div className="absolute top-0 right-0 left-0 z-10 flex justify-center border-b border-b-gray-400 bg-white/90 p-4">
                <button
                  onPointerDown={e => {
                    controls.start(e);
                  }}
                  className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
                />
              </div>
              <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </>
  );
});

export default BottomDrawer;
