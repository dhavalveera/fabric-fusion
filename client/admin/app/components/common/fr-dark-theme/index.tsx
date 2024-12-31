import type { FC } from "react";

// flowbite-react
import { DarkThemeToggle, Tooltip, type CustomFlowbiteTheme } from "flowbite-react";

const customDarkThemeToggleTheme: CustomFlowbiteTheme["darkThemeToggle"] = {
  root: {
    base: "rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 mr-2",

    icon: "h-5 w-5",
  },
};

export const FlowbiteDarkThemeToggle: FC = () => {
  return (
    <Tooltip animation="duration-1000" content="Toggle Light/Dark Mode">
      <DarkThemeToggle theme={customDarkThemeToggleTheme} />
    </Tooltip>
  );
};

FlowbiteDarkThemeToggle.displayName = "LightDarkThemeToggler";
