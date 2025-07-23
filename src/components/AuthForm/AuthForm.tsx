import styles from "./AuthForm.module.scss";
import { LuChevronLeft } from "react-icons/lu";
import { Input } from "./Input";
import { useCallback, useState } from "react";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleSetEmail = useCallback((value: string) => {
    setEmail(value);
  }, [setEmail]);

  const handleSetPassword = useCallback((value: string) => {
    setPassword(value);
  }, [setPassword]);
  console.log('render auth form')
  return (
    <section className={styles.authForm}>
      <div className={styles.authForm__header}>
        <button className={styles.authForm__back}>
          <LuChevronLeft className={styles.authForm__icon} />
        </button>
        <h1 className={styles.authForm__title}>Вход</h1>       
      </div>
      <form className={styles.authForm__form}>
          <Input
            type="email"
            placeholder="email"
            error="Поле обязательно для заполнения"
            setValue={handleSetEmail}
          />
          <Input
            type="password"
            placeholder="Пароль"
            error="Пароль должен содержать не менее 4 символов"
            setValue={handleSetPassword}
            minLength={4}
          />
          <div className={styles.authForm__actions}>
            <button className={styles.authForm__button}>
              Зарегистрироваться
            </button>
            <button className={styles.authForm__action}>Забыли пароль?</button>
          </div>
          <button className={styles.authForm__button}>Продолжить</button>
          <div className={styles.authForm__social}></div>
        </form>
    </section>
  );
};
