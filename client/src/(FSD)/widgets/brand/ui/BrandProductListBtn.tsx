"use client"


import { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { useProductByBrandRead } from "@/(FSD)/entities/product/api/useProductByBrandRead";
interface ProductColorCreateBtnType {
    productId: number;
    productNumber: string;
    productName: string;
}

const BrandProductListBtn = () => {
    const { data, isError, error, isPending } = useProductByBrandRead();
    const router = useRouter();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {

    }, [data]);

    const productInfoList: ProductColorCreateBtnType[] = data || [];

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const handleRead = (productId: number) => {
        router.push(`/products/${productId}`);
    };

 


    return (
        <div style={{marginBottom:"10px"}}>
            <Button onClick={onOpen} size={"sm"}   className="w-full h-[100px] bg-white border-2" radius="none" 
             endContent={<IconShared iconType={isOpen ? "top" : "bottom"} />}><TextMediumShared>상품 목록 보기</TextMediumShared></Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">상품 목록</ModalHeader>
                            <ModalBody>
                                {productInfoList.length > 0 ? (
                                    <Select label="상품 상세 페이지로 가기" >
                                        {productInfoList.map(product => (
                                            <SelectItem key={product.productId} onClick={() => handleRead(product.productId)}>
                                                품번 : {product.productNumber} 상품 이름 : {product.productName}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                ) : (
                                    <p>등록된 상품이 없습니다.</p>
                                )}

                        
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    닫기
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    );
};

export default BrandProductListBtn;