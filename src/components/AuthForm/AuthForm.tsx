import styles from "./AuthForm.module.scss";
import { LuChevronLeft } from "react-icons/lu";
import { Input } from "./Input";
import { useCallback, useState } from "react";
import { SocialButton } from "./SocialButton";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { useFirebase } from "../../hooks";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formState, setFormState] = useState<"login" | "register" | "forgot">(
    "login"
  );
  
  const {
    error,
    loading,
    signInWithGoogle,
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
  } = useFirebase();
  
  const navigate = useNavigate();

  const isActive = (() => {
    switch (formState) {
      case "login":
        return !!email && !!password;
      case "register":
        return (
          !!email &&
          !!password &&
          !!confirmPassword &&
          password === confirmPassword
        );
      case "forgot":
        return !!email;
      default:
        return false;
    }
  })();

  const handleSetEmail = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handleSetPassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const handleSetConfirmPassword = useCallback((value: string) => {
    setConfirmPassword(value);
  }, []);

  const handleRegisterClick = () => {
    setFormState("register");
  };

  const handleForgotClick = () => {
    setFormState("forgot");
  };

  const handleBackClick = () => {
    setFormState("login");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const getTitle = () => {
    switch (formState) {
      case "register":
        return "Регистрация";
      case "forgot":
        return "Восстановление пароля";
      default:
        return "Вход";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let result = null;
      
      switch (formState) {
        case "login": {
          result = await signInWithEmail(email, password);
          if (result) {
            navigate("/");
          }
          break;
        }
        
        case "register": {
          result = await signUpWithEmail(email, password);
          if (result) {
            navigate("/");
          }
          break;
        }
        
        case "forgot": {
          alert("Функция восстановления пароля будет реализована позже");
          break;
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  const renderInputs = () => {
    switch (formState) {
      case "register":
        return (
          <>
            <Input
              type="email"
              placeholder="Email"
              error="Поле обязательно для заполнения"
              setValue={handleSetEmail}
            />
            <Input
              type="password"
              placeholder="Пароль"
              error="Пароль должен содержать не менее 6 символов"
              setValue={handleSetPassword}
              minLength={6}
            />
            <Input
              type="password"
              placeholder="Подтвердите пароль"
              error="Пароли не совпадают"
              setValue={handleSetConfirmPassword}
              minLength={6}
            />
          </>
        );
      case "forgot":
        return (
          <Input
            type="email"
            placeholder="Email"
            error="Поле обязательно для заполнения"
            setValue={handleSetEmail}
          />
        );
      default:
        return (
          <>
            <Input
              type="email"
              placeholder="Email"
              error="Поле обязательно для заполнения"
              setValue={handleSetEmail}
            />
            <Input
              type="password"
              placeholder="Пароль"
              error="Пароль должен содержать не менее 6 символов"
              setValue={handleSetPassword}
              minLength={6}
            />
          </>
        );
    }
  };

  return (
    <section className={styles.authForm}>
      <div className={styles.authForm__header}>
        {formState !== "login" && (
          <button
            className={styles.authForm__back}
            onClick={handleBackClick}
            type="button"
          >
            <LuChevronLeft className={styles.authForm__icon} />
          </button>
        )}
        <h1 className={styles.authForm__title}>{getTitle()}</h1>
      </div>
      
      {error && (
        <div className={styles.authForm__error}>
          {error.message || "Произошла ошибка авторизации"}
        </div>
      )}
      
      <form className={styles.authForm__form} onSubmit={handleSubmit}>
        {renderInputs()}

        {formState === "login" && (
          <>
            <div className={styles.authForm__actions}>
              <button
                className={styles.authForm__action}
                type="button"
                onClick={handleRegisterClick}
              >
                Зарегистрироваться
              </button>
              <button
                className={styles.authForm__action}
                type="button"
                onClick={handleForgotClick}
              >
                Забыли пароль?
              </button>
            </div>
            <button
              className={styles.authForm__button}
              disabled={!isActive || loading}
              type="submit"
            >
              {loading ? "Загрузка..." : "Продолжить"}
            </button>
            <div className={styles.authForm__social}>
              <SocialButton
                text="Google"
                icon={<FcGoogle />}
                onAction={signInWithGoogle}
                disabled={loading}
              />
              <SocialButton
                text="GitHub"
                icon={<GrGithub />}
                onAction={signInWithGithub}
                disabled={loading}
              />
            </div>
          </>
        )}

        {formState !== "login" && (
          <button
            className={styles.authForm__button}
            disabled={!isActive || loading}
            type="submit"
          >
            {loading ? "Загрузка..." : (formState === "register" ? "Зарегистрироваться" : "Отправить")}
          </button>
        )}
      </form>
    </section>
  );
};