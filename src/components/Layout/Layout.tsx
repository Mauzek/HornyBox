import React from 'react';
import { Header, TabBar } from '../';
import { useGetAssetsQuery } from '../../store';
import styles from './Layout.module.scss';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    useGetAssetsQuery();
    return (
        <>
            <Header />
            <main className={styles.main}>{children}</main>
            <TabBar/>
            {/* <Footer /> */}
        </>
    );
};
