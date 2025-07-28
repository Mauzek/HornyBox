import { useEffect, useState } from "react";
import {
  LuLogOut,
  LuPlus,
  LuPencil,
  LuEllipsisVertical,
  LuCheck,
} from "react-icons/lu";
import styles from "./Profile.module.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { images } from "../../assets";
import { useFirebase } from "../../hooks";

export const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { updateDisplayName, signOut, linkWithGithub, linkWithGoogle } =
    useFirebase();
  const [isEditing, setIsEditing] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [inputValue, setInputValue] = useState("");
  console.log(user);
  useEffect(() => {
    document.title = "Личный кабинет - HornyBox";
  }, []);

  useEffect(() => {
    if (user && inputValue === "") {
      setInputValue(getDisplayName());
    }
  }, [user, inputValue]);

  if (!user) return;

  const getInputValue = (provider: string): string => {
    const haveProvider = user.provider.find(
      (item) => item.providerId === provider
    );
    if (haveProvider && user.email) {
      return haveProvider.email || "";
    } else {
      return "";
    }
  };

  const isProviderLinked = (provider: string): boolean => {
    return !!user.provider.find((item) => item.providerId === provider);
  };

  const getDisplayName = (): string => {
    if (user.displayName) return user.displayName;
    if (user.email) return `HB_${user.email.split("@")[0]}`;
    return `HB_${user.uid.substring(0, 8)}`;
  };

  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setShowLine(true);
      setInputValue(getDisplayName());
      const input = document.getElementById("displayName");
      input?.focus();
    } else {
      handleSaveDisplayName();
    }
  };

  const handleSaveDisplayName = async () => {
    const currentName = getDisplayName();

    if (inputValue.trim() && inputValue.trim() !== currentName) {
      try {
        await updateDisplayName(inputValue.trim());
      } catch (error) {
        console.error("Ошибка при обновлении имени:", error);
      }
    }
    setIsEditing(false);
    setShowLine(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveDisplayName();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleLinkProvider = (provider: string) => {
    switch (provider) {
      case "google.com":
        linkWithGoogle();
        break;
      case "github.com":
        linkWithGithub();
        break;
    }
  };

  const formatRegistrationDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    try {
      const dateObject = new Date(dateString);
      return dateObject
        .toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, ".");
    } catch (error) {
      console.error("Ошибка форматирования даты:", error);
      return "Неизвестная дата";
    }
  };

  return (
    <section className={styles.profile}>
      <div
        className={`${styles.profile__section} ${styles["profile__section--left"]}`}
      >
        <div className={styles.profile__header}>
          <div className={styles.profile__avatar}>
            <div className={styles.profile__avatarImage}>
              <img
                src={user.photoURL || images.defaultAvatar}
                alt="Аватар"
                className={styles.profile__avatarImg}
              />
              <button
                className={`${styles.profile__action} ${styles.profile__avatarAdd}`}
              >
                <LuPlus />
              </button>
            </div>
            <div className={styles.profile__name}>
              <input
                id="displayName"
                name="displayName"
                type="text"
                inputMode="text"
                value={isEditing ? inputValue : getDisplayName()}
                readOnly={!isEditing}
                className={styles.profile__nameInput}
                placeholder="Имя пользователя"
                onChange={handleInputChange}
                onKeyDown={isEditing ? handleKeyPress : undefined}
              />
              <div
                className={`${styles.profile__editLine} ${
                  showLine ? styles["profile__editLine--active"] : ""
                }`}
              />
            </div>
            <button
              className={`${styles.profile__action} ${styles.profile__edit}`}
              onClick={handleEditClick}
            >
              {isEditing ? <LuCheck /> : <LuPencil />}
            </button>
            <button
              className={` ${styles.profile__action} ${styles.profile__menu}`}
            >
              <LuEllipsisVertical />
            </button>
          </div>
          <div className={styles.profile__info}>
            <p className={styles.profile__infoItem}>
              ID: <span className={styles.profile__infoValue}>{user.uid}</span>
            </p>
            <p className={styles.profile__infoItem}>
              Дата регистрации:{" "}
              <span className={styles.profile__infoValue}>
                {" "}
                {formatRegistrationDate(user.createAt)}
              </span>
            </p>
          </div>
        </div>
        <button className={styles.profile__logout} onClick={handleSignOut}>
          Выйти <LuLogOut />
        </button>
      </div>
      <div
        className={`${styles.profile__section} ${styles["profile__section--right"]}`}
      >
        <div className={styles.profile__accounts}>
          <div className={styles.profile__account}>
            <p className={styles.profile__accountLabel}>Email</p>
            <div className={styles.profile__accountControl}>
              <input
                name="email"
                type="email"
                defaultValue={getInputValue("password")}
                className={styles.profile__accountInput}
                placeholder="Не привязано"
                readOnly={isProviderLinked("password")}
              />
              {!isProviderLinked("password") && (
                <button className={styles.profile__accountButton}>
                  Привязать
                </button>
              )}
            </div>
          </div>
          <div className={styles.profile__account}>
            <p className={styles.profile__accountLabel}>GitHub</p>
            <div className={styles.profile__accountControl}>
              <input
                name="github"
                type="email"
                inputMode="email"
                defaultValue={getInputValue("github.com")}
                className={styles.profile__accountInput}
                placeholder="Не привязано"
                readOnly={isProviderLinked("github.com")}
              />
              {!isProviderLinked("github.com") && (
                <button
                  className={styles.profile__accountButton}
                  onClick={() => handleLinkProvider("github.com")}
                >
                  Привязать
                </button>
              )}
            </div>
          </div>
          <div className={styles.profile__account}>
            <p className={styles.profile__accountLabel}>Google</p>
            <div className={styles.profile__accountControl}>
              <input
                name="google"
                type="email"
                inputMode="email"
                defaultValue={getInputValue("google.com")}
                className={styles.profile__accountInput}
                placeholder="Не привязано"
                readOnly={isProviderLinked("google.com")}
              />
              {!isProviderLinked("google.com") && (
                <button
                  className={styles.profile__accountButton}
                  onClick={() => handleLinkProvider("google.com")}
                >
                  Привязать
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
