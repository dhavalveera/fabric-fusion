import { useState, type FC } from "react";

// DRY
import CustomButton from "@/components/library/custom-button";
import Editor from "@/components/library/editor";

const PrivacyPolicyComp: FC = () => {
  const [privacyContent, setPrivacyContent] = useState<string>("");

  const handleChange = (content: string) => {
    setPrivacyContent(content);
  };

  return (
    <>
      <p className="font-della-respira text-lg font-medium">Privacy Policy</p>

      <div className="my-4">
        <Editor defaultValue={privacyContent} onChange={handleChange} />

        <div className="mt-4 flex w-full justify-end">
          <CustomButton btnLabel="Save & Update" btnSize="md" />
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyComp;
