import { FC, MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ isLoading, children, disabled, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${styles.button}`}
      type="submit"
      disabled={isLoading || disabled}
    >
      {isLoading ? "Loading.." : children}
    </button>
  );
};
