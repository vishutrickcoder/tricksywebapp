import { useSlate } from "slate-react";
import { Transforms, Editor, Text } from "slate";

export const Toolbar = ({ editor, insertImage }) => {
  const slate = useSlate();

  const toggleMark = (format) => {
    const isActive = Editor.marks(slate)?.[format];
    if (isActive) Editor.removeMark(slate, format);
    else Editor.addMark(slate, format, true);
  };

  return (
    <div className="mb-2 flex space-x-2">
      <button onMouseDown={(e) => { e.preventDefault(); toggleMark("bold"); }}><b>B</b></button>
      <button onMouseDown={(e) => { e.preventDefault(); toggleMark("italic"); }}><i>I</i></button>
      <button onMouseDown={(e) => { e.preventDefault(); toggleMark("underline"); }}><u>U</u></button>
      <button onMouseDown={(e) => { e.preventDefault(); insertImage(prompt("Image URL")); }}>Image</button>
    </div>
  );
};
