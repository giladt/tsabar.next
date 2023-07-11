import { ReactNode, ReactElement, ButtonHTMLAttributes } from "react";
import { CgSpinner } from "react-icons/cg";

import { ActionButton } from "./action/action";
import { NavigationIconButton } from "./back/back";
import { ThemeSwitcher } from "./theme-switcher/theme-switcher";

export const LinkBtn = {
  CTX: ActionButton,
  NavigationIcon: NavigationIconButton,
  ThemeSwitch: ThemeSwitcher,
};

type TButtonProps = {
  onClick?: () => void | Promise<void> | undefined;
  title?: string;
  type?: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
  children: ReactNode;
};
export const Button = ({
  onClick,
  title = "Button",
  type = "button",
  isLoading = false,
  children,
}: TButtonProps): ReactElement<ButtonHTMLAttributes<HTMLButtonElement>> => (
  <button
    className="p-2 mt-7 mb-8 flex align-center justify-center
              border-2 border-solid border-primary-dark 
              rounded-lg text-center hover:text-black
              bg-transparent hover:bg-primary-dark
            "
    type={type}
    role="button"
    title={title}
    onClick={onClick}
  >
    {(!isLoading && children) || (
      <CgSpinner className="animate-spin" size={"1.5rem"} />
    )}
  </button>
);
