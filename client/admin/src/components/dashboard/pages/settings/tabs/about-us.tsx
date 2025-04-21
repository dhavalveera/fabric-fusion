import { useState, type FC } from "react";

// DRY
import CustomButton from "@/components/library/custom-button";
import Editor from "@/components/library/editor";

const AboutUsComp: FC = () => {
  const [aboutUsContent, setAboutUsContent] = useState<string>("<p>About Us Content</p>");

  const handleChange = (content: string) => {
    setAboutUsContent(content);
  };

  return (
    <>
      <p className="font-della-respira text-lg font-medium">About Us</p>

      <div className="my-4">
        <Editor defaultValue={aboutUsContent} onChange={handleChange} />

        <div className="mt-4 flex w-full justify-end">
          <CustomButton btnLabel="Save & Update" btnSize="md" />
        </div>
      </div>
    </>
  );
};

export default AboutUsComp;
