import styles from "./AuthForm.module.scss";
import { LuChevronLeft } from "react-icons/lu";
import { Input } from "./Input";
import { useCallback, useState, useEffect } from "react";
import { SocialButton } from "./SocialButton";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { useFirebase } from "../../hooks";
import { Toast } from "../Toast/Toast";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formState, setFormState] = useState<"login" | "register" | "forgot">(
    "login"
  );

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    loading,
    signInWithGoogle,
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
  } = useFirebase();

  const isActive = (() => {
    switch (formState) {
      case "login":
        return !!email.trim() && !!password.trim();
      case "register":
        return (
          !!email.trim() &&
          !!password.trim() &&
          !!confirmPassword.trim() &&
          password === confirmPassword
        );
      case "forgot":
        return !!email.trim() && email.trim().length > 0;
      default:
        return false;
    }
  })();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

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

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result) {
        showToast("Вход через Google выполнен успешно!", "success");
      }
    } catch (error) {
      console.error(error);
      showToast("Ошибка входа через Google", "error");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithGithub();
      if (result) {
        showToast("Вход через GitHub выполнен успешно!", "success");
      }
    } catch (error) {
      console.error(error);
      showToast("Ошибка входа через GitHub", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      switch (formState) {
        case "login": {
          const result = await signInWithEmail(email, password);
          if (result) {
            showToast("Вход выполнен успешно!", "success");
          } else {
            showToast("Неверный email или пароль", "error");
          }
          break;
        }

        case "register": {
          const result = await signUpWithEmail(email, password);
          if (result) {
            showToast("Регистрация прошла успешно!", "success");
          } else {
            showToast("Ошибка регистрации", "error");
          }
          break;
        }

        case "forgot": {
          await resetPassword(email);
          showToast("Письмо отправлено на вашу почту!", "success");
          setTimeout(() => handleBackClick(), 1000);
          break;
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      showToast("Произошла ошибка. Попробуйте еще раз.", "error");
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
              value={email}
              error="Поле обязательно для заполнения"
              setValue={handleSetEmail}
            />
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              error="Пароль должен содержать не менее 6 символов"
              setValue={handleSetPassword}
              minLength={6}
            />
            <Input
              type="password"
              placeholder="Подтвердите пароль"
              value={confirmPassword}
              error={
                confirmPassword && password && password !== confirmPassword
                  ? "Пароли не совпадают"
                  : "Обязательное поле"
              }
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
            value={email}
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
              value={email}
              error="Поле обязательно для заполнения"
              setValue={handleSetEmail}
            />
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
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
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          position="top-center"
          duration={3000}
        />
      )}

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
                onAction={handleGoogleSignIn}
                disabled={loading}
              />
              <SocialButton
                text="GitHub"
                icon={<GrGithub />}
                onAction={handleGithubSignIn}
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
            Продолжить
          </button>
        )}
      </form>
    </section>
  );
};
