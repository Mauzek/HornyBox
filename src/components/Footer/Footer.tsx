import styles from "./Footer.module.scss";
import { icons } from "../../assets";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr className={styles.footer__division} />
      <div className={styles.footer__container}>
        <h2 className={styles.footer__headline}>
          ХорниБокс. Магазин пополнения и донатов, все права защищены
        </h2>

        <p className={styles.footer__content}>
          Магазин игрового доната, который позволяет легко и безопасно пополнить
          баланс в различных онлайн играх и сервисах, таких как: Genshin Impact,
          Honkai Star Rail, Zenless Zone Zero, Mobile Legends Bang Bang, PUBG
          New State, Steam. Мы используем только безопасные способы пополнения,
          поэтому вы можете быть уверены в безопасности своих данных. Мы
          гарантируем качество, приятные скидки, а так же быструю доставку
          денежных средств на аккаунт
          <br />
          <br />
          ИП Гранкин Виталий Валерьевич, ИНН 780438646461
        </p>

        <section
          className={styles.footer__reviews}
          aria-label="Отзывы T-Bank"
        >
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img className={styles.footer__icon} src={icons.tBank} alt="T-Bank" />
            <div className={styles.footer__stars}>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={icons.star} alt="Рейтинг" />
              ))}
            </div>
            <p className={styles.footer__reviewCount}>2700</p>
          </a>
        </section>

        <section
          className={styles.footer__social}
          aria-label="Социальные сети и контакты"
        >
          <ul className={styles.footer__socialList}>
            <li>
              <a
                href="https://t.me/HornyGem"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={icons.telegram} alt="Telegram" />
              </a>
            </li>
            <li>
              <a
                href="https://vk.com/hornybox?from=search"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={icons.vk} alt="VK" />
              </a>
            </li>
          </ul>

          <div className={styles.footer__buttons}>
            <a
              href="https://t.me/HornyBoxer"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__linkButton}
            >
              Поддержка
            </a>
            <a
              href="https://t.me/Hanwig"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__linkButton}
            >
              По вопросам рекламы
            </a>
            <a
              href="https://t.me/HornyBoxer"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__linkButton}
            >
              Сотрудничество
            </a>
          </div>

          <div className={styles.footer__contact}>
            <p>Для коммерческих предложений</p>
            <a
              href="mailto:vitaly.busifurr@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              vitaly.busifurr@gmail.com
            </a>
          </div>
        </section>
      </div>
      <hr className={styles.footer__division} />
      <nav className={styles.footer__navigation}>
        <ul className={styles.footer__navigation_list}>
          <li className={styles.footer__navigation_item}>
            <Link to="/politics#agency-agreement">
              Политика конфиденциальности
            </Link>
          </li>
          <li className={styles.footer__navigation_item}>
            <Link to="/politics#offer-agreement">Оферта</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
