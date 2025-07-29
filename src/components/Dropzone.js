import React, { use } from "react";
import { Poppins } from "next/font/google";
import { useDropzone } from "react-dropzone";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Dropzone() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
  });

  const acceptedFilesItems = acceptedFiles.map((file) => (
    <li key={file.path} className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-white">
      <div className="text-sm font-medium truncate">{file.path}</div>
      <div className="text-xs text-zinc-400">{file.size} bytes</div>
    </li>
  ));

  return (
    <div className={`flex flex-col items-center justify-center min-h-[300px] ${poppins.className}`}>
      <section className="w-full max-w-md mb-6">
        <div {...getRootProps({ className: "flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-xl p-12 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900/50 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20", })}>
          <input {...getInputProps()} />
          <p className="text-zinc-300 font-medium text-center">Drag 'n' drop some files here, or click to select files</p>
        </div>
      </section>
      {acceptedFiles.length > 0 && (
      <aside className="w-full max-w-md">
        <ul className="space-y-3">{acceptedFilesItems}</ul>
      </aside>)}
    </div>
  );
}