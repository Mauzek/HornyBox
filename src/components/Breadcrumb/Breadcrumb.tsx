import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumb.module.scss";
import type { BreadcrumbProps } from "./types";

export const Breadcrumb: React.FC<BreadcrumbProps> = ({lable, breadcrumb}) => {
  
    const buildBreadcrumbs = () => {
    const items = [{ label: "Главная", path: "/" }];
    if (breadcrumb.productName) {
      items.push({
        label: lable,
        path: `/${breadcrumb.productName}`
      });
    }
    return items;
  };

  const breadcrumbs = buildBreadcrumbs();

  return (
    <nav className={styles.breadcrumb} aria-label="Навигационная цепочка">
      <ul className={styles.breadcrumb__list}>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.path}>
            <li className={styles.breadcrumb__item}>
              {index === breadcrumbs.length - 1 ? (
                <span 
                  className={styles.breadcrumb__current}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link 
                  to={item.path} 
                  className={styles.breadcrumb__link}
                  aria-label={`Перейти к ${item.label}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
            {index !== breadcrumbs.length - 1 && (
              <span className={styles.breadcrumb__separator} aria-hidden="true">
                /
              </span>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};
