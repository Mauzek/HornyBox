import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LuCircleUser } from "react-icons/lu";
import { icons } from "../../assets";
import styles from "./TabBar.module.scss";
import type { Tab } from "./types";
import { usePopup } from "../../hooks";
import { ActionMenu } from "../Popups";

export const TabBar = () => {
  const location = useLocation();
  const { isVisible, toggle, hide } = usePopup();
  const user: boolean = true;
  const cart: { count: number } | null = { count: 1 };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  };

  const parseGameName = (pathname: string): string | null => {
    const gameMatch = pathname.match(/^\/game\/([^/]+)/);
    return gameMatch ? gameMatch[1] : null;
  };

  const gameName: string | null = parseGameName(location.pathname);

  const renderIcon = (
    icon: React.ReactNode | string,
    label: string
  ): React.ReactNode => {
    if (typeof icon === "string") {
      return <img className={styles.tabbar__icon} src={icon} alt={label} />;
    }
    return icon;
  };

  const renderTabContent = (tab: Tab): React.ReactNode => (
    <>
      {renderIcon(tab.icon, tab.label)}
      <span
        className={`${styles.tabbar__label} ${
          tab.id === "cart" ? styles["tabbar__label--cart"] : ""
        }`}
      >
        {tab.label}
      </span>
    </>
  );

  const tabs: Tab[] = [
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
        <LuCircleUser className={styles.tabbar__icon} />
      ),
      label: user ? "" : "Кабинет",
    },
    {
      id: "cart",
      path: "",
      icon: icons.cart,
      label: `${cart.count} шт`,
      show: !!gameName && !!cart,
    },
    {
      id: "more",
      path: "",
      icon: icons.dots,
      label: "Еще",
    },
  ];

  const visibleTabs: Tab[] = tabs.filter((tab) => tab.show !== false);

  return (
    <nav className={styles.tabbar}>
      <ul className={styles.tabbar__list}>
        {visibleTabs.map((tab: Tab) => {
          const isActive: boolean = location.pathname === tab.path;
          const tabContent: React.ReactNode = renderTabContent(tab);

          return (
            <li
              key={tab.id}
              className={`${styles.tabbar__item} ${
                isActive ? styles["tabbar__item--active"] : ""
              }`}
            >
              {tab.path ? (
                <Link to={tab.path}>{tabContent}</Link>
              ) : (
                <button
                  className={styles.tabbar__button}
                  onClick={handleToggle}
                >
                  {tabContent}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <ActionMenu isOpen={isVisible} onClose={hide} />
    </nav>
  );
};
