import React from "react";
import { Header, TabBar, Footer } from "../";
import { useGetAssetsQuery } from "../../store";
import styles from "./Layout.module.scss";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError } = useGetAssetsQuery();
  if (isLoading || isError) return <p>Loading...</p>;
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <TabBar />
      <Footer />
    </>
  );
};
