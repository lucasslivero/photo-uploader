import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Header from "./Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={poppins.className}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
