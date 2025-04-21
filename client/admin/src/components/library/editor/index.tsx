import { useRef, type FC } from "react";

// Sun Editor
import SunEditor, { buttonList } from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

// types
import type { EditorProps } from "@/types";

const Editor: FC<EditorProps> = props => {
  const { defaultValue, onChange } = props;

  const editorRef = useRef<SunEditorCore | null>(null);

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editorRef.current = sunEditor;
  };

  return (
    <SunEditor
      getSunEditorInstance={getSunEditorInstance}
      setAllPlugins={true}
      placeholder="Please type here..."
      defaultValue={defaultValue}
      setOptions={{
        buttonList: buttonList.complex,
      }}
      onChange={onChange}
    />
  );
};

export default Editor;
