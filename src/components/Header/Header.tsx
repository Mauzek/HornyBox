import { LuUserRound } from "react-icons/lu";
import { Link } from "react-router-dom";
import { images } from "../../assets";
import { memo } from "react";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../store";
import { OrderHistory } from "../Popups";
import styles from "./Header.module.scss";
import { usePopup } from "../../hooks";
import { useScrollDirection } from "../../hooks/useScrollDirection";

const Header = memo(() => {
  //   const user = useSelector((state: RootState) => state.user.user);
  const user = true;
  const { isVisible, toggle } = usePopup();
  const { headerRef } = useScrollDirection(50);
  console.log("render");
  return (
    <header ref={headerRef} className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__list}>
          <li className={styles.header__item}><Link to="/about">О нас (Любимчики)</Link></li>
          <li className={styles.header__item}><Link to="/faq">FAQ</Link></li>
        </ul>
      </nav>

      <div className={styles.header__content}>
        <Link to="/" className={styles.header__logo}>
          <img
            src={images.logo}
            alt="HornyBox logo"
            className={styles.header__image}
          />
        </Link>

        <div className={styles.header__actions}>
          {user ? (
            <>
              <div className={styles.header__order_wrapper}>
                <button className={styles.header__button} onClick={toggle}>
                  История заказов
                </button>
                <OrderHistory onClose={toggle} isOpen={isVisible} />
              </div>
              <Link to="/profile" className={styles.header__profile}>
                <img
                  src="https://lh3.googleusercontent.com/a/ACg8ocL2JNj8N5vHEvpI_OGMNidNFRVo1ZFOBDZNb4aAHxmvXCn-tTGB=s96-c"
                  alt="User avatar"
                  className={styles.header__avatar}
                />
              </Link>
            </>
          ) : (
            <Link to="/auth" className={styles.header__auth}>
              <LuUserRound className={styles.header__icon} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export { Header };
