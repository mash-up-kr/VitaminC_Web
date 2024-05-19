import React from "react";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Additional styling using tailwind
   */
  className?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  className,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "text-white bg-[#1ea7fd]"
    : "text-[#333] bg-transparent shadow-md";
  return (
    <button
      type="button"
      style={{ backgroundColor }}
      className={[
        "font-[700] border-0 rounded-[3em] cursor-pointer inline-block leading-normal",
        size === "small" && "text-[12px] py-[10px] px-[16px]",
        size === "medium" && "text-[14px] py-[11px] px-[20px]",
        size === "large" && "text-[16px] py-[12px] px-[24px]",
        mode,
        className,
      ].join(" ")}
      {...props}
    >
      {label}
    </button>
  );
};
