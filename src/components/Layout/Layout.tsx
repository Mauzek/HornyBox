import React from 'react';
import { Header, TabBar } from '../';
import { useGetAssetsQuery } from '../../store';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    useGetAssetsQuery();
    return (
        <>
            <Header />
            <main >{children}</main>
            <TabBar/>
            {/* <Footer /> */}
        </>
    );
};
