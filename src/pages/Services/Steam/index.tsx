import React, { useRef, useState } from "react";
import { icons, flags } from "../../../assets";
import {
  AccordionGameInfo,
  FAQGrid,
  FavouriteHelper,
  HelpTooltip,
  Section,
} from "../../../components";
import styles from "./Steam.module.scss";
import { PaymentGrid } from "../../../components/PaymentGrid";
import type { Payment } from "../../../types";

type Currency = {
  id: string;
  label: string;
  flag: string;
  symbol: string;
  rate: number;
};

const faqData = [
  {
    id: 1,
    question: "Как пополнить если аккаунт новый?",
    answer:
      "<p><strong>Если аккаунт совсем новый, то при его пополнении валюта аккаунта изменится на доллар $ или тенге ₸</strong><br>Чтобы этого избежать:<br>1. Находясь в России, перейди в <a href='https://store.steampowered.com/account/redeemwalletcode' target='_blank' rel='noopener'>пополнение подарочными картами</a>;<br>2. Введи любой код, например&nbsp;<strong>HORNY-0BOX0-HORNY</strong>, при вводе будет получена ошибка;<br>3. Готово, валюта закреплена за страной нахождения.</p>",
  },
  {
    id: 2,
    question: "Как пополнить жителям ДНР/ЛНР/Крыма?",
    answer:
      "<p><strong>Аккаунт, привязанный к ДНР/ЛНР/Крыму пополнить можно, но для этого нужно:</strong><br>1.&nbsp;<strong>Выйти из аккаунта Steam</strong> со всех устройств +&nbsp;поставить авиарежим на телефоне, если телефон подвязан к Steam;<br>2. Находясь в России, зайти через браузер в Steam;<br>3. Через 10 минут можно перейти к пополнению аккаунта.</p>",
  },
  {
    id: 3,
    question: "Как проверить логин?",
    answer:
      "<p>После ввода логина он сразу проверяется на возможность пополнения. Если ты смог перейти к оплате - значит аккаунт можно пополнить.</p>",
  },
  {
    id: 4,
    question: "Какой картой можно оплатить?",
    answer:
      "<p>1. Используй карту или счет любого банка, подключенные к Системе быстрых платежей (СБП).</p> <p>2. Открой приложение банка, с карты которого нужно провести оплату (или через QR-код), далее в списке приложений банков выбери нужное. Дополнительной регистрации не требуется, устанавливать новые приложения тоже не нужно.</p>",
  },
  {
    id: 5,
    question: "Через сколько кошелек будет пополнен?",
    answer:
      "<p><strong>Как правило - мгновенно</strong>, но если пополнение не приходит свыше 2х часов - напиши нам в&nbsp;<a href='https://t.me/HornySupport_bot?start=start' target='_blank' rel='noopener'>поддержку.</a></p>",
  },
];

const description = `
  <p dir="ltr">Вышла новая игра в Steam или не хватает на понравившейся скин в Доте или КС, тогда без пополнения Стима не обойтись. Особенно это актуально для России в 2025 году, когда удобных способов пополнения становится все меньше. На HornyBox можно пополнить Стим всего за пару секунд. Оплата всегда проходит через официальных поставщиков, так что твой баланс Steam будет пополнен без задержек, с минимальной комиссией и абсолютно безопасно как для твоего кошелька Стим, так и для твоего аккаунта.</p>
  <h2 dir="ltr">Как пополнить Steam через HornyBox?</h2>
  <p>Каждый любитель игр хочет пополнить свой кошелек Стим выгодно и без комиссий, поэтому мы стараемся предложить самые выгодные условия. Пополнение на сайте ХорниБокс максимально простое. Выбирай сумму и нужную тебе валюту, вводи свой логин аккаунта стим и оплачивай любым удобным для тебя способом.</p>
  <p>На пополненные средства можно приобрести любые игры в Steam, любимые AAA-хиты, такие как Black Myth: Wukong, Elden Ring, ELDEN RING NIGHTREIGN, Baldur's Gate 3 и др. Покупка скинов для Counter Strike и Dota 2 также становится возможной благодаря нашему сервису.</p>
  <h3 dir="ltr">Где дешевле всего пополнить Стим?</h3>
  <p dir="ltr">В интернете есть множество сервисов по пополнению баланса Steam, однако мало кто из них может гарантировать вам безопасность всех транзакций и вашего аккаунта Стим. Пополняя Steam через HornyBox, ты получаешь не только полную безопасность, но и низкую комиссию, чтобы ты мог сэкономить на покупке любимых игр или внутриигровых товаров.&nbsp;С нами — это легко, безопасно и выгодно.</p>
`;

const currencies: Currency[] = [
  { id: "rub", label: "Рубли", flag: flags.Russia, symbol: "₽", rate: 0.885 },
  {
    id: "kzt",
    label: "Тенге",
    flag: flags.Kazakhstan,
    symbol: "₸",
    rate: 5.929,
  },
  {
    id: "usd",
    label: "Доллары",
    flag: flags.Global,
    symbol: "$",
    rate: 0.008854,
  },
];

const amounts = [550, 1180, 2150, 3400, 4800, 5200, 6900, 9700];
const payments: Payment[] = [
  {
    id: 1,
    name: "СБП",
    icon: "https://storage.yandexcloud.net/hornybox/PaymentSystem/%D1%81%D0%B1%D0%BF.svg",
  },
  {
    id: 2,
    name: "СБП #2",
    icon: "https://storage.yandexcloud.net/hornybox/PaymentSystem/%D1%81%D0%B1%D0%BF.svg",
  },
  {
    id: 3,
    name: "Карта",
    icon: "https://storage.yandexcloud.net/hornybox/PaymentSystem/1.svg",
  },
  {
    id: 4,
    name: "Карта",
    icon: "https://storage.yandexcloud.net/hornybox/PaymentSystem/1.svg",
  },
  {
    id: 5,
    name: "Карта не РФ",
    icon: "https://storage.yandexcloud.net/hornybox/global_pay_icon_1.png",
  },
  {
    id: 6,
    name: "Crypto",
    icon: "https://storage.yandexcloud.net/hornybox/PaymentSystem/crupto_usdt.svg",
  },
];

export const SteamPage = () => {
  const [activeCurrencyId, setActiveCurrencyId] = useState<string>("rub");
  const [selectedAmount, setSelectedAmount] = useState<number>(550);
  const [selectedPayment, setSelectedPayment] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const loginRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const activeCurrency =
    currencies.find((c) => c.id === activeCurrencyId) || currencies[0];
  const calculatedSteamAmount = selectedAmount * activeCurrency.rate;

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  };

  const validateAmount = (amount: number | "") => {
    if (amount === "") return null;

    if (amount > 15000) {
      return "Максимальная сумма пополнения 15 000 рублей";
    } else if (amount < 100) {
      return "Минимальная сумма пополнения 100 рублей";
    }
    return null;
  };

  const handleSetAmountButton = (amount: number) => {
    setSelectedAmount(amount);
    const errorMessage = validateAmount(amount);
    setError(errorMessage);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== "" && !/^\d+(\.\d*)?$/.test(value)) return;
    if (error) setError(null);
    const numValue = Number(value);
    if (numValue) {
      setSelectedAmount(numValue);
    } else {
      setSelectedAmount(0);
    }

    if (numValue > 15000) {
      setError("Максимальная сумма пополнения 15 000 рублей");
    } else if (numValue < 100) {
      setError("Минимальная сумма пополнения 100 рублей");
    }
  };

  const handleFocusLogin = () => loginRef.current?.focus();
  const handleFocusAmount = () => amountRef.current?.focus();

  const isSubmitDisabled =
    !username.trim() || !selectedPayment || selectedAmount <= 0 || !!error;

  return (
    <div>
      <div className={styles.page}>
        <section className={styles.page__container}>
          <div className={styles.page__header}>
            <h1 className={styles.page__title}>
              <img
                src={icons.steamLogo}
                alt="steam logo"
                className={styles.page__logo}
              />
              Пополнение Steam
            </h1>
          </div>

          <div className={styles.page__navigation}>
            {currencies.map((currency) => (
              <button
                key={currency.id}
                type="button"
                className={`${styles.page__navBtn} ${
                  activeCurrencyId === currency.id
                    ? styles["page__navBtn--active"]
                    : ""
                }`}
                onClick={() => setActiveCurrencyId(currency.id)}
              >
                <img
                  src={currency.flag}
                  alt={currency.label}
                  className={styles.page__navBtnLogo}
                />
                <p className={styles.page__navBtnText}>{currency.label}</p>
              </button>
            ))}
          </div>

          <div className={styles.page__paymentSection}>
            <div className={styles.page__paymentsWrapper}>
              <div
                className={styles.page__paymentField}
                onClick={handleFocusLogin}
              >
                <input
                  ref={loginRef}
                  type="text"
                  className={styles.page__paymentInput}
                  placeholder="Логин"
                  onChange={handleUsernameChange}
                />
                <button className={styles.page__paymentBtn}>Где взять?</button>
              </div>

              <div className={styles.page__paymentWrapper}>
                <div
                  className={`${styles.page__paymentField} ${
                    error ? styles["page__paymentField--error"] : ""
                  }`}
                  onClick={handleFocusAmount}
                >
                  <p
                    className={`${styles.page__paymentText} ${styles["page__paymentText--white"]}`}
                  >
                    ₽
                  </p>
                  <input
                    ref={amountRef}
                    type="text"
                    inputMode="decimal"
                    value={selectedAmount}
                    onChange={handleAmountChange}
                    className={styles.page__paymentInput}
                    maxLength={5}
                  />
                </div>
                <p
                  className={`${styles.page__errorMessage} ${
                    error ? styles["page__errorMessage--visible"] : ""
                  }`}
                >
                  {error}
                </p>
              </div>

              <div className={styles.page__paymentField}>
                <img
                  src={icons.steam}
                  alt="steam logo"
                  className={`${styles.page__logo} ${styles["page__logo--sm"]}`}
                />
                <div className={styles.page__steamAmountWrapper}>
                  <p
                    className={`${styles.page__paymentText} ${styles["page__paymentText--white"]} ${styles["page__paymentText--bold"]}`}
                  >
                    {selectedAmount >= 100
                      ? `~ ${calculatedSteamAmount.toFixed(2)} ${
                          activeCurrency.symbol
                        }`
                      : "Oт 100 ₽"}
                  </p>
                  <p
                    className={`${styles.page__paymentText} ${styles["page__paymentText--white"]} ${styles["page__paymentText--sm"]}`}
                  >
                    к зачислению на Steam
                  </p>
                </div>
                <div className={styles.page__paymentTooltip}>
                  <HelpTooltip
                    text={`
                  С учётом курсовой разницы на стороне Steam и 
                  провайдера услуг — до 13%. Может меняться каждый час. 
                  На аккаунт может прийти сумма больше`}
                  />
                </div>
              </div>
            </div>

            <div className={styles.page__paywallForm}>
              <p
                className={`${styles.page__paymentText} ${styles["page__paymentText--white"]} ${styles["page__paymentText--bold"]} ${styles["page__paymentText--title"]}`}
              >
                Пополнение от 100 рублей до 15 000
              </p>
              <div className={styles.page__paywallList}>
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    className={`${styles.page__paywallItem} ${
                      selectedAmount === amount
                        ? styles["page__paywallItem--selected"]
                        : ""
                    }`}
                    onClick={() => handleSetAmountButton(amount)}
                  >
                    {amount}₽
                  </button>
                ))}
              </div>
            </div>

            <PaymentGrid
              payments={payments}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              style={{ margin: "0" }}
            />

            <FavouriteHelper className={styles.page__favouriteHelper} />
            <button className={styles.page__submit} disabled={isSubmitDisabled}>
              Продолжить
            </button>
          </div>
        </section>
      </div>
      <AccordionGameInfo title="Описание сервиса" description={description} />
      <Section title="FAQ" id="faq">
        <FAQGrid items={faqData} />
      </Section>
    </div>
  );
};
