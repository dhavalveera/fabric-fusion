import { forwardRef, useState, type FC } from "react";

// react router
import { useNavigate } from "react-router";

// Framer Motion
import { motion } from "framer-motion";

// react icons
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

// utils
import { cn } from "@/utils/cn";

// types
import type { AccountPopoverOptionProps } from "@/types";

const AccountPopoverOption = forwardRef<
  HTMLLIElement,
  AccountPopoverOptionProps
>((props, ref) => {
  const { className = "", icon: Icon, text, ...rest } = props;

  return (
    <motion.li
      variants={{
        open: {
          opacity: 1,
          y: 0,
          transition: {
            when: "beforeChildren",
          },
        },
        closed: {
          opacity: 0,
          y: -15,
          transition: {
            when: "afterChildren",
          },
        },
      }}
      className={cn(
        "flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 transition-colors cursor-pointer",
        className,
      )}
      ref={ref}
      {...rest}
    >
      <motion.span
        variants={{
          open: { scale: 1, y: 0 },
          closed: { scale: 0, y: -7 },
        }}
      >
        <Icon focusable="false" aria-hidden="true" className="size-4" />
      </motion.span>
      <span className="font-della-respira">{text}</span>
    </motion.li>
  );
});

const AccountPopover: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md transition-colors"
        >
          <span>
            <FaUserCircle
              className="size-8"
              focusable="false"
              aria-hidden="true"
            />
          </span>
        </button>

        <motion.ul
          initial={{
            scaleY: 0,
            transition: {
              when: "afterChildren",
              staggerChildren: 0.1,
            },
          }}
          variants={{
            open: {
              scaleY: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
              },
            },
            closed: {
              scaleY: 0,
              transition: {
                when: "afterChildren",
                staggerChildren: 0.1,
              },
            },
          }}
          style={{ originY: "top", translateX: "-80%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          <div>
            <div className="flex items-center p-2 gap-1">
              <div>
                <FaUserCircle className="size-8" />
              </div>
              <p className="text-xs font-medium font-della-respira">
                Admin Name
              </p>
            </div>

            <hr className="border-gray-400 pb-1" />

            <AccountPopoverOption
              icon={MdLogout}
              text="Logout"
              onClick={() => {
                setOpen(false);

                navigate("/", {
                  preventScrollReset: false,
                  viewTransition: true,
                });
              }}
            />
          </div>
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default AccountPopover;
