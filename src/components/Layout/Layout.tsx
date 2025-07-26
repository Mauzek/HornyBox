import React from "react";
import { Header, TabBar, Footer, ScrollToTop, Preloader } from "../";
import { useGetAssetsQuery } from "../../store";
import styles from "./Layout.module.scss";
import { usePreloader } from "../../hooks/usePreloader";
import { useFirebase } from "../../hooks";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useGetAssetsQuery();
  const {shouldShowPreloader, handlePreloaderComplete} = usePreloader({
    isLoading,
  });
  useFirebase();

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
