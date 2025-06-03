import React from 'react';
import { Header, TabBar } from '../';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main >{children}</main>
            <TabBar/>
            {/* <Footer /> */}
        </>
    );
};
