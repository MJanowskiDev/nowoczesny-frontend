import { ActiveLink } from "./ActiveLink";

export const Header = () => {
  return (
    <header className="mx-auto w-full max-w-2xl ">
      <nav className="bg-gray-800 px-4 py-2 text-white flex gap-4 ">
        <ActiveLink href={"/"}>
          <a>Home</a>
        </ActiveLink>
        <ActiveLink href={"/about"}>
          <a>About</a>
        </ActiveLink>
      </nav>
    </header>
  );
};
