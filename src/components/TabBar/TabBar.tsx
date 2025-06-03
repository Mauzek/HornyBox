import { Link, useLocation } from "react-router-dom";
import { LuUserRound } from "react-icons/lu";
import { icons } from "../../assets";
import styles from "./TabBar.module.scss";

export const TabBar = () => {
  const location = useLocation();
  const user = true;
  const cartNotEmpty = true;

  const parseGameName = (pathname: string) => {
    const gameMatch = pathname.match(/^\/game\/([^/]+)/);
    return gameMatch ? gameMatch[1] : null;
  };
  const gameName = parseGameName(location.pathname);
  console.log(gameName);

  const tabs = [
    {
      id: "catalog",
      path: "/",
      icon: icons.home,
      label: "Каталог",
    },
    {
      id: "profile",
      path: user ? "/profile" : "/auth",
      icon: user ? (
        <img
          className={styles.tabbar__avatar}
          src="https://lh3.googleusercontent.com/a/ACg8ocL2JNj8N5vHEvpI_OGMNidNFRVo1ZFOBDZNb4aAHxmvXCn-tTGB=s96-c"
          alt="Avatar"
        />
      ) : (
        <LuUserRound className={styles.tabbar__icon} />
      ),
    },
    {
      id: "cart",
      path: "",
      icon: icons.cart,
      label: "1 шт",
      show: !!gameName && cartNotEmpty,
    },
    {
      id: "more",
      path: "",
      icon: icons.dots,
      label: "Еще",
    },
  ];

  const visibleTabs = tabs.filter((tab) => tab.show !== false);

  const itemCount = visibleTabs.length;
  let itemMargin = "0";

  if (itemCount === 3) {
    itemMargin = "48.25px";
  } else if (itemCount === 4) {
    itemMargin = "32.7px";
  }

  return (
    <nav
      className={styles.tabbar}
      style={{ "--item-margin": itemMargin } as React.CSSProperties}
    >
      <ul className={styles.tabbar__list}>
        {visibleTabs.map((tab) => {
          const isActive = location.pathname === tab.path;

          return (
            <li
              key={tab.id}
              className={`${styles.tabbar__item} ${
                isActive ? styles["tabbar__item--active"] : ""
              }`}
            >
              {tab.path ? (
                <Link to={tab.path}>
                  {tab.icon && typeof tab.icon === "string" ? (
                    <img
                      className={styles.tabbar__icon}
                      src={tab.icon}
                      alt={tab.label}
                    />
                  ) : (
                    tab.icon
                  )}
                  <span className={styles.tabbar__label}>{tab.label}</span>
                </Link>
              ) : (
                <>
                  {tab.icon && typeof tab.icon === "string" ? (
                    <img
                      className={styles.tabbar__icon}
                      src={tab.icon}
                      alt={tab.label}
                    />
                  ) : (
                    tab.icon
                  )}
                  <span className={styles.tabbar__label}>{tab.label}</span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
