import { useEffect, useState } from "react";
import { useGetAboutQuery, useSaveAboutMutation, useDeleteAboutMutation } from "../features/about/aboutApi";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

export default function AboutSectionAdmin() {
  const { data, isLoading } = useGetAboutQuery();
  const [saveAbout] = useSaveAboutMutation();
  const [deleteAbout] = useDeleteAboutMutation();

  const [image, setImage] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit, Image, Link],
    content: "",
  });

  useEffect(() => {
    if (data) {
      editor?.commands.setContent(data.content || "");
      setImage(data.image || null);
    }
  }, [data, editor]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("content", editor.getHTML());
    if (image instanceof File) formData.append("image", image);
    await saveAbout(formData);
    alert("Saved!");
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete About section?")) return;
    await deleteAbout();
    editor.commands.setContent("");
    setImage(null);
    alert("Deleted!");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage About Us</h2>

      {image && typeof image === "string" && (
        <img src={image} alt="About" className="mb-2 w-64 rounded" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4"
      />

      <div className="border p-2 rounded min-h-[250px] mb-4">
        <EditorContent editor={editor} />
      </div>

      <div className="space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
