import React from 'react';


export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {/* <Header /> */}
            <main>{children}</main>
            {/* <Footer /> */}
        </div>
    );
};
