import React, { useState } from "react";
import { Header, TabBar, Footer, ScrollToTop, Preloader } from "../";
import { useGetAssetsQuery } from "../../store";
import styles from "./Layout.module.scss";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useGetAssetsQuery();
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const shouldShowPreloader = isLoading || showPreloader;

  if (!data || isError) {
    return (
      <Preloader
        isLoading={isLoading}
        onComplete={handlePreloaderComplete}
      />
    );
  }

  return (
    <>
      {shouldShowPreloader && (
        <Preloader
          isLoading={isLoading}
          onComplete={handlePreloaderComplete}
        />
      )}

      <ScrollToTop />
      <Header />
      <main className={styles.main}>{children}</main>
      <TabBar />
      <Footer />
    </>
  );
};
