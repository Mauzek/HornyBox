import styles from "./SocialButton.module.scss";
import type { SocialButtonProps } from "./types";

export const SocialButton = ({
  text,
  icon,
  onAction,
  disabled,
}: SocialButtonProps) => {
  return (
    <button
      type="button"
      className={styles.socialButton}
      onClick={onAction}
      disabled={disabled}
    >
      {text}
      {icon}
    </button>
  );
};
