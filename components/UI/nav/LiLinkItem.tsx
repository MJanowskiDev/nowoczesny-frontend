import { ActiveLink } from "./ActiveLink";

interface LinkItemProps {
  content: string;
  href: string;
  icon?: JSX.Element;
}
export const LiLinkItem = ({ content, href, icon }: LinkItemProps) => {
  return (
    <li>
      <ActiveLink
        className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
        href={href}
      >
        <a>
          <div className="flex gap-2 items-center">
            <div>{icon}</div>
            <div>{content}</div>
          </div>
        </a>
      </ActiveLink>
    </li>
  );
};
