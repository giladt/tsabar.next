import { ReactNode, ReactElement, ButtonHTMLAttributes } from "react";
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
  children: ReactNode;
};
export const Button = ({
  onClick,
  title = "Button",
  type = "button",
  children,
}: TButtonProps): ReactElement<ButtonHTMLAttributes<HTMLButtonElement>> => (
  <button
    className="p-2 mt-7 mb-8
              border-2 border-solid border-primary-dark 
              rounded-lg text-center hover:text-black
              bg-transparent hover:bg-primary-dark
            "
    type={type}
    role="button"
    title={title}
    onClick={onClick}
  >
    {children}
  </button>
);
