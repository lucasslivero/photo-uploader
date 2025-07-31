import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
function ImageModal({ open, onClose, file, preview }) {
  if (!open) return null;

  return (
    <>
      <div
        data-dialog-backdrop="modal-sm"
        data-dialog-backdrop-close="true"
        className=" fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60  backdrop-blur-sm transition-opacity duration-300"
      >
        <div
          data-dialog="modal-sm"
          className="relative m-4 p-4 w-1/3 rounded-lg bg-zinc-800 shadow-sm border-1"
        >
          <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-white">
            {file.name}
          </div>
          <div className="relative border-t border-slate-200 py-4 flex justify-center items-center">
            <img
              src={preview}
              alt={file.name}
              className="max-h-full max-w-full rounded shadow"
            />
          </div>
          <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
            <button
              onClick={onClose}
              data-dialog-close="true"
              className="cursor-pointer rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-800 focus:shadow-none active:bg-red-800 hover:bg-red-800 active:shadow-none disabled: disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageModal;
