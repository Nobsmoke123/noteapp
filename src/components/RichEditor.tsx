import { useRef } from "react";

const RichEditor = ({ onChange }: { onChange: (text: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    const text = editorRef.current?.innerText;
    onChange(text!); // you can also strip HTML if you want plain text
  };

  return (
    <div
      ref={editorRef}
      contentEditable
      onInput={handleInput}
      className="min-h-[150px] p-4 border border-gray-300 rounded-md focus:outline-none"
      suppressContentEditableWarning={true}
    >
      Write your note here...
    </div>
  );
};

export default RichEditor;
