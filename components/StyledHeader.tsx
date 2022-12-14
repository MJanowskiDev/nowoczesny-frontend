import Link from "next/link";
import { ThemeToggler } from "./UI/nav/ThemeToggler";
import { CartIcon } from "./Cart/CartIcon";
import { useState } from "react";
import UserClerkButton from "./UI/UserClerkButton";
import { useUser } from "@clerk/nextjs";
import { BurgerButton } from "./UI/nav/BurgerButton";
import { LogoSVG } from "./UI/Icons";
import { LiLinkItem } from "./UI/nav/LiLinkItem";

import {
  HomeIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";

export const StyledHeader = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  const onBurgerButtonClick = () => {
    setMenuToggle((prev) => !prev);
  };

  const onUlLinkClicked = () => {
    setMenuToggle(false);
  };
  return (
    <header
      aria-label="Site Header"
      className="bg-gray-100/50 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8  flex-wrap">
        <div className="flex h-16 items-center justify-between ">
          <div className="flex-1 md:flex md:items-center  md:gap-12 ">
            <Link href="/">
              <a className="block text-teal-600 dark:text-teal-300">
                <span className="sr-only">Home</span>
                <LogoSVG />
              </a>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Site Nav" className="flex gap-6">
              <MenuList className="items-center gap-6 text-sm sm:flex-wrap md:flex hidden" />
              <ActionList onBurgerClickHandle={onBurgerButtonClick} />
            </nav>
          </div>
        </div>
      </div>
      <MenuList
        ulClickHandle={onUlLinkClicked}
        className={`${
          menuToggle ? "flex" : "hidden"
        } z-50 gap-6 text-md flex flex-col justify-end align-top text-right mr-2 absolute right-0 bg-gray-100 dark:bg-gray-900 p-6  border-r-2 border-gray-50/50 w-full`}
      />
    </header>
  );
};

interface ActionListProps {
  onBurgerClickHandle: () => void;
}

const ActionList = ({ onBurgerClickHandle }: ActionListProps) => {
  const { isLoaded, isSignedIn } = useUser();
  const authenticated = isLoaded && isSignedIn;
  return (
    <ul className="items-center gap-6 text-sm sm:flex-wrap flex">
      {authenticated && (
        <li>
          <CartIcon data-testid="nav-link-cart" />
        </li>
      )}

      <li>
        <UserClerkButton />
      </li>
      <li>
        <ThemeToggler />
      </li>
      <li>
        <BurgerButton onClickHandle={onBurgerClickHandle} />
      </li>
    </ul>
  );
};

interface MenuListProps {
  className: string;
  ulClickHandle?: () => void;
}

const MenuList = ({ className, ulClickHandle }: MenuListProps) => {
  const { isLoaded, isSignedIn } = useUser();
  const authenticated = isLoaded && isSignedIn;

  return (
    <ul className={className} onClick={ulClickHandle}>
      <LiLinkItem content="Home" href="/" icon={<HomeIcon height={18} />} />
      <LiLinkItem
        content="About"
        href="/about"
        icon={<InformationCircleIcon height={18} />}
      />
      <LiLinkItem
        content="Products"
        href="/products-ssg/1"
        icon={<ShoppingBagIcon height={18} />}
        data-testid="nav-link-products"
      />
      {authenticated && (
        <LiLinkItem
          content="Orders"
          href="/orders"
          icon={<QueueListIcon height={18} />}
        />
      )}
    </ul>
  );
};
