import { memo, useState } from "react";
import styles from "./Input.module.scss";
import type { InputProps } from "./types";
import { LuEye, LuEyeOff } from "react-icons/lu";

export const Input = memo(
  ({ type, error, placeholder, minLength, setValue }: InputProps) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isError, setIsError] = useState(false);

    const handlePasswordVisibility = (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      setIsVisiblePassword(!isVisiblePassword);
    };

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = e.target.value;
  setValue(inputValue);
  const hasError = minLength 
    ? inputValue.length < minLength 
    : inputValue.length === 0;
    
  setIsError(hasError);
};

    const getInputType = () => {
      if (type === "password") {
        return isVisiblePassword ? "text" : "password";
      }
      return type;
    };
    
    return (
      <div className={styles.inputContainer}>
        <div
          className={`
        ${styles.inputContainer__wrapper} 
        ${isError ? styles["inputContainer__wrapper--error"] : ""}
        `}
          onClick={() => {
            const input = document.getElementById(placeholder);
            if (input) input.focus();
          }}
        >
          <input
            id={placeholder}
            className={styles.inputContainer__input}
            type={getInputType()}
            placeholder={placeholder}
            onChange={handleInputChange}
            minLength={minLength}
          />
          {type === "password" && (
            <button
              type="button"
              className={styles.inputContainer__button}
              onClick={handlePasswordVisibility}
            >
              {isVisiblePassword ? (
                <LuEye className={styles.inputContainer__icon} />
              ) : (
                <LuEyeOff className={styles.inputContainer__icon} />
              )}
            </button>
          )}
        </div>
        <p
          className={`${styles.inputContainer__error} ${
            isError && styles["inputContainer__error--visible"]
          }`}
        >
          {error}
        </p>
      </div>
    );
  }
);
