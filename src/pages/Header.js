import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full h-10 border-b gap-2 items-center">
      <div className="text-2xl px-2 border-r">
        <Link href="/">Links</Link>
      </div>
      <div className="flex gap-5 items-center underline">
        <Link href="/upload">Upload Page</Link>
        <Link href="/dashboard">Dashboard Page</Link>
      </div>
    </div>
  );
}
