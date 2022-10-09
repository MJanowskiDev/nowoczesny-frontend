import Link from "next/link";

export const Header = () => {
  return (
    <header className="mx-auto w-full max-w-2xl ">
      <nav className="bg-gray-800 px-4 py-2 text-white flex gap-4 ">
        <Link href={"/"}>
          <a>Home</a>
        </Link>
        <Link href={"/about"}>
          <a>About</a>
        </Link>
      </nav>
    </header>
  );
};
