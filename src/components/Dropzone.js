import { Trash } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "./Modal";

export default function Dropzone() {
  const [files, setFiles] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");
  const [openModal, setOpenModal] = useState(null);

  const FILE_STATUS = {
    PENDING: "Pending upload",
    SUCCESS: "Successful upload",
    ERROR: "Error uploading",
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        status: FILE_STATUS.PENDING,
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
  });

  function formatFileSize(size) {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }

  const handleDeleteImage = async (index) => {
    const res = await fetch(`/api/upload/${index}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  };

  const handleUploadImage = async () => {
    setStatusMsg("Sending...");

    const filesToUpload = files.filter(f => f.status !== FILE_STATUS.SUCCESS);

     if (filesToUpload.length === 0) {
      setStatusMsg("All images successfully uploaded");
      return;
    }

    try {
      const updatedFiles = [...files];

      for (let i = 0; i < updatedFiles.length; i++) {
        if (updatedFiles[i].status === FILE_STATUS.SUCCESS) continue;
        const formData = new FormData();
        formData.append("file", updatedFiles[i].file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          updatedFiles[i].status = FILE_STATUS.SUCCESS;
        } else {
          updatedFiles[i].status = FILE_STATUS.ERROR;
        }
      }

      setFiles([...updatedFiles]);

      const remainingFiles = updatedFiles.filter(f => f.status === FILE_STATUS.PENDING || FILE_STATUS.ERROR)
      if(remainingFiles.length === 0 ) {
        setStatusMsg("All images successfully uploaded");
      }else {
        setStatusMsg(`${filesToUpload.length - remainingFiles.length} images sended. ${remainingFiles.length} remaining`);
      }
    } catch (error) {
      setStatusMsg("Unsuccessful upload ❌");
    }
  };

  const fileItems = files.map((f, index) => (
    <li
      key={index}
      className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-white"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium truncate flex-1">
          {f.file.path}
        </span>
        <span className="text-sm font-medium truncate flex-1">{f.status}</span>
        <div className="flex flex-shrink-0 ml-4 space-x-2">
          <button
            className="bg-blue-600 hover:bg-blue-800 cursor-pointer rounded-md px-2 py-1 text-xs"
            onClick={() => setOpenModal(index)}
          >
            Open Modal
          </button>
          <button
            className="text-red-600 hover:text-red-800 cursor-pointer rounded-md px-2 py-1 text-xs"
            onClick={() => handleDeleteImage(index)}
          >
            <Trash />
          </button>
        </div>
      </div>
      <div className="text-xs text-zinc-400">{formatFileSize(f.file.size)}</div>
      {openModal === index && (
        <Modal
          open={true}
          onClose={() => setOpenModal(null)}
          file={f.file}
          preview={URL.createObjectURL(f.file)}
        />
      )}
    </li>
  ));

  return (
    <div className={`flex flex-col items-center justify-center min-h-[300px]`}>
      <section className="w-full max-w-md mb-6">
        <div
          {...getRootProps({
            className:
              "flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-xl p-12 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900/50 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20",
          })}
        >
          <input {...getInputProps()} />
          <p className="text-zinc-300 font-medium text-center">
            Drag n drop some files here, or click to select files
          </p>
        </div>
      </section>
      {files.length > 0 && (
        <aside className="w-full max-w-md">
          <ul className="space-y-3">{fileItems}</ul>
        </aside>
      )}
      <button
        className={`w-md h-12 mt-4 border-2 rounded-xl border-zinc-700 ${
          files.length === 0
            ? "border-zinc-700 text-zinc-500 cursor-not-allowed bg-zinc-900/20"
            : "border-zinc-600 text-white cursor-pointer hover:border-zinc-500 hover:bg-zinc-800/50"
        }`}
        disabled={files.length === 0}
        onClick={handleUploadImage}
      >
        Upload images
      </button>
      <p>{statusMsg}</p>
    </div>
  );
}
