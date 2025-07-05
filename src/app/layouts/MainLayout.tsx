import React, {type ReactNode} from 'react';
import {Header} from "widgets/Header";

type Props = {
    children: ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header/>
            <main>{children}</main>
        </>
    );
};

export default MainLayout;