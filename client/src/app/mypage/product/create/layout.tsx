'use client'

import IconShared from "@/(FSD)/shareds/ui/IconShared";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import ProductCreateManualModal from "@/(FSD)/widgets/product/ui/ProductCreateManualModal";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import React from "react";

const Layout = ({ children, }: { children: React.ReactNode }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"상품 등록하기"} buttons={<Button onClick={onOpen}
                    variant={"light"} isIconOnly endContent={<IconShared iconType={"question"} iconSize={"md"} />} >
                </Button>}
                />
            </AppFixedTopBar>
            {children}
            <ProductCreateManualModal
                isOpen={isOpen} 
                onOpenChange={onClose} 
            />
        </>
    );
};

export default Layout;