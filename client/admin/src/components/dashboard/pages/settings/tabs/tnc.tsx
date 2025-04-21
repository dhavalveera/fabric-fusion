import { useState, type FC } from "react";

// DRY
import CustomButton from "@/components/library/custom-button";
import Editor from "@/components/library/editor";

const TNCComp: FC = () => {
  const [tncContent, setTncContent] = useState<string>("");

  const handleChange = (content: string) => {
    setTncContent(content);
  };

  return (
    <>
      <p className="font-della-respira text-lg font-medium">Terms &amp; Conditions</p>

      <div className="my-4">
        <Editor defaultValue={tncContent} onChange={handleChange} />

        <div className="mt-4 flex w-full justify-end">
          <CustomButton btnLabel="Save & Update" btnSize="md" />
        </div>
      </div>
    </>
  );
};

export default TNCComp;
