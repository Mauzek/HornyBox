import { memo, useState } from "react";
import styles from "./Input.module.scss";
import type { InputProps } from "./types";
import { LuEye, LuEyeOff } from "react-icons/lu";

export const Input = memo(({ type, error, placeholder, minLength, setValue }: InputProps) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handlePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisiblePassword(!isVisiblePassword);
  };

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    if(minLength && inputValue.length < minLength) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const getInputType = () => {
    if (type === "password") {
      return isVisiblePassword ? "text" : "password";
    }
    return type;
  };

  console.log('render input')
  return (
    <div className={styles.inputContainer}>
      <div
        onClick={handleFocus}
        className={`
        ${styles.inputContainer__wrapper} 
        ${isError ? styles["inputContainer__wrapper--error"] : ""}
        ${isFocused ? styles["inputContainer__wrapper--focus"] : ""}`}
      >
        <input
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
              <LuEyeOff className={styles.inputContainer__icon} />
            ) : (
              <LuEye className={styles.inputContainer__icon} />
            )}
          </button>
        )}
      </div>
        {isError && <p className={styles.inputContainer__error}>{error}</p>}
    </div>
  );
});
