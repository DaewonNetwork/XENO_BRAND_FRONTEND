"use client"


import { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import IconShared from "@/(FSD)/shareds/ui/IconShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { useProductByBrandRead } from "@/(FSD)/entities/product/api/useProductByBrandRead";
import BrandProductListModal from "../modal/BrandProductListModal";


const BrandProductListBtn = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div style={{marginBottom:"10px"}}>
            <Button onClick={onOpen} size={"sm"}   className="w-full h-[100px] bg-white border-2" radius="none" 
             endContent={<IconShared iconType={isOpen ? "top" : "bottom"} />}><TextMediumShared>상품 목록 보기</TextMediumShared></Button>
              <BrandProductListModal 
                isOpen={isOpen} 
                onOpenChange={onClose} 
            />
        </div>
    );
};

export default BrandProductListBtn;