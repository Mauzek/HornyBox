import styles from './SocialButton.module.scss';
import type { SocialButtonProps } from './types';

export const SocialButton = ({text, icon}: SocialButtonProps) => {
  return (
    <button type='button' className={styles.socialButton}>
        {text}
        {icon}
    </button>
  )
}
