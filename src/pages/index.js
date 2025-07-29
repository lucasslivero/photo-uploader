import Image from "next/image";
import Dropzone from "@/components/Dropzone";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  return (
    <div className={poppins.className}>
      <h1 className="text-center font-poppins text-3xl font-semibold mt-8">Photo Uploader</h1>
      <Dropzone/>
    </div>
  );
}
