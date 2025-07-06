import { HelpTooltip } from "../HelpTooltip";
import { Link } from "react-router-dom";
import styles from "./FavouriteHelper.module.scss";

export const FavouriteHelper = () => {
  return (
    <div className={styles.support}>
      <div className={styles.support__icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="39"
          height="34"
          fill="none"
          viewBox="0 0 39 34"
        >
          <g clipPath="url(#heart-icon_svg__a)">
            <path
              fill="#C8FF00"
              fillRule="evenodd"
              d="M19.185 6.005c2.477-2.565 4.212-4.783 8.028-5.217 7.165-.817 13.755 6.47 10.137 13.645-1.03 2.043-3.127 4.473-5.446 6.857-2.545 2.618-5.362 5.183-7.335 7.128l-5.381 5.303-4.447-4.252C9.39 24.35.667 17.908.38 9.926.179 4.334 4.62.752 9.728.816c4.565.062 6.485 2.317 9.457 5.19"
              clipRule="evenodd"
            />
          </g>
        </svg>
      </div>
      <div className={styles.support__text}>
        <p>Ты можешь поддержать любимчика</p>
        <Link to="/about">В разделе "О нас"</Link>
      </div>
      <HelpTooltip text='Чтобы сменить любимчика - найди реферальную ссылку на его канале и перейди по ней, или же выбери кого-то в разделе "О нас (Любимчики)"💚' />
    </div>
  );
};
