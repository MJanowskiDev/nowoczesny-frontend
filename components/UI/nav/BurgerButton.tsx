import { BurgerIconSVG } from "../Icons";
interface BurgerButtonProps {
  onClickHandle: () => void;
}

export const BurgerButton = ({ onClickHandle }: BurgerButtonProps) => (
  <button
    onClick={onClickHandle}
    data-collapse-toggle="navbar-default"
    type="button"
    className="inline-flex items-center bpx-2 py-1  text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    aria-controls="navbar-default"
    aria-expanded="false"
  >
    <span className="sr-only">Open main menu</span>
    <BurgerIconSVG />
  </button>
);
