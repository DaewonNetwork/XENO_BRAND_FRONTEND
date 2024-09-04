"use client"



import AppFixedBtmBar from "@/(FSD)/widgets/app/ui/AppFixedBtmBar";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppNav from "@/(FSD)/widgets/app/ui/AppNav";
import ProductHeader from "@/(FSD)/widgets/product/ui/ProductHeader";

import React, { useState } from "react";

const Layout = ({ children, }: { children: React.ReactNode }) => {


    return (
        <>
            <AppFixedTopBar>
                <ProductHeader />
            </AppFixedTopBar>
            {children}
            <AppFixedBtmBar>
                <AppNav />
            </AppFixedBtmBar>
          
        </>
    );
};

export default Layout;