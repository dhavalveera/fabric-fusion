import { useState, type FC } from "react";

// DRY
import Breadcrumb from "@/components/library/breadcrumb";
import ChpTabs from "@/components/library/chip-tab";

// Data
import { settingsPageTab } from "@/data/settings-page-tabs";

// constants
import { APP_DETAILS } from "@/constants";

// types
import type { RenderTabComponentProps, SettingsPageChipTabValue } from "@/types";

// Page (Tabs) Components
import AboutUsComp from "./tabs/about-us";
import PrivacyPolicyComp from "./tabs/privacy-policy";
import TNCComp from "./tabs/tnc";

const renderTabCompos: RenderTabComponentProps = {
  "about-us": <AboutUsComp />,
  privacy: <PrivacyPolicyComp />,
  tnc: <TNCComp />,
};

const SettingsPage: FC = () => {
  const [selected, setSelected] = useState<string>(settingsPageTab[0].chipTabValue);

  return (
    <>
      <title>Settings | {APP_DETAILS.APP_NAME}</title>

      <div className="py-10">
        <Breadcrumb secondLabel="Settings" />

        <div className="mt-3 mb-10 border-b border-b-gray-300">
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-wrap items-center gap-2 px-4 py-4">
              {settingsPageTab.map((tabs, index) => {
                return <ChpTabs key={index} label={tabs.label} setSelected={setSelected} selected={selected === tabs.chipTabValue} chipTabValue={tabs.chipTabValue} />;
              })}
            </div>
          </div>
        </div>

        {/* Render Components based on the Chip Value */}
        <div className="px-4">{renderTabCompos[selected as SettingsPageChipTabValue]}</div>
      </div>
    </>
  );
};

export default SettingsPage;
