import React, { useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuCircleUser } from "react-icons/lu";
import { icons, images } from "../../assets";
import styles from "./TabBar.module.scss";
import type { Tab } from "./types";
import { usePopup } from "../../hooks";
import { ActionMenu, PaywallForm } from "../Popups";
import { useSelector } from "react-redux";
import { useGetProductsQuery, type RootState } from "../../store";

export const TabBar = () => {
  const location = useLocation();
  const {
    isVisible: isActionMenuVisible,
    toggle: toggleActionMenu,
    hide: hideActionMenu,
  } = usePopup();
  const {
    isVisible: isPaywallVisible,
    toggle: togglePaywall,
    hide: hidePaywall,
  } = usePopup();
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const { user } = useSelector((state: RootState) => state.user);

  const handleMoreToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleActionMenu();
    },
    [toggleActionMenu]
  );

  const handleCartToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      togglePaywall();
    },
    [togglePaywall]
  );

  const parseProductName = (pathname: string): string | null => {
    const productMatch = pathname.match(/^\/(games|services)\/([^/]+)/);
    return productMatch ? productMatch[2] : null;
  };

  const productName: string | null = parseProductName(location.pathname);

  const productCart = useSelector((state: RootState) =>
    productName ? state.cart[productName] : null
  );

  const { data } = useGetProductsQuery(productName!);

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
          src={user.photoURL || images.defaultAvatar}
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
      label: `${productCart?.metadata.totalQuantity} шт`,
      show: !!productName && !!productCart,
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
              ) : tab.id === "more" ? (
                <button
                  ref={moreButtonRef}
                  className={`${styles.tabbar__button} ${
                    isActionMenuVisible ? styles["tabbar__button--active"] : ""
                  }`}
                  onClick={handleMoreToggle}
                >
                  {tabContent}
                </button>
              ) : tab.id === "cart" ? (
                <button
                  className={`${styles.tabbar__button} ${
                    isPaywallVisible ? styles["tabbar__button--active"] : ""
                  }`}
                  onClick={handleCartToggle}
                >
                  {tabContent}
                </button>
              ) : (
                <button className={styles.tabbar__button}>{tabContent}</button>
              )}
            </li>
          );
        })}
      </ul>
      <ActionMenu
        isOpen={isActionMenuVisible}
        onClose={hideActionMenu}
        toggleButtonRef={moreButtonRef}
        isGamePage={!!productName}
        user={user}
      />
      {productName && data?.payments && productCart?.items && (
        <PaywallForm
          isOpen={isPaywallVisible}
          onClose={hidePaywall}
          payments={data?.payments}
          cartItems={productCart?.items}
          productName={productName}
          totalPrice={productCart?.metadata.totalPrice}
          totalQuantity={productCart.metadata.totalQuantity}
        />
      )}
    </nav>
  );
};
