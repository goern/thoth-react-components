import React from "react";
import "./pythonChooser.css";

interface PythonChooserProps {
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium";
  /**
   * PythonChooser contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const PythonChooser = ({
  backgroundColor,
  size = "medium",
  label,
  ...props
}: PythonChooserProps) => {
  const mode = "storybook-pythonChooser--primary";
  return (
    <button
      type="button"
      className={[
        "storybook-pythonChooser",
        `storybook-pythonChooser--${size}`,
        mode,
      ].join(" ")}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
