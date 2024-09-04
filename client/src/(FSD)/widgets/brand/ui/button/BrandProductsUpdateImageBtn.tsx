"use client"

import { useProductByBrandRead } from "@/(FSD)/entities/product/api/useProductByBrandRead";
import React, { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { useRecoilState } from "recoil";
import { productListState } from "@/(FSD)/shareds/stores/ProductAtom";
import BrandProductsUpdateImageModal from "../modal/BrandProductsUpdateImageModal";
interface ProductColorCreateBtnType {
    productId: number;
    productNumber: string;
    productName: string;
}

const BrandProductsUpdateImageBtn = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>

            <Button style={{ marginBottom: "10px" }} onClick={onOpen} size={"sm"} className="w-full h-[100px] bg-white border-2" radius="none" endContent={<IconShared iconType={isOpen ? "top" : "bottom"} />}><TextMediumShared>
                등록한 상품의 이미지 수정하기</TextMediumShared></Button>
            <BrandProductsUpdateImageModal
                isOpen={isOpen}
                onOpenChange={onClose}
            />

        </>
    );
};

export default BrandProductsUpdateImageBtn;