'use client'

import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useProductByBrandRead } from '@/(FSD)/entities/product/api/useProductByBrandRead';

import { Select, SelectItem } from "@nextui-org/select";
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';


interface ProductListType {
    productId: number;
    productNumber: string;
    productName: string;
}

interface BrandProductListModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

const BrandProductListModal = ({ isOpen, onOpenChange }:BrandProductListModalProps) => {

    const handleRead = (productId: number) => {
        router.push(`/products/${productId}`);
    };

    const { data, isError, error, isPending } = useProductByBrandRead();
    const router = useRouter();

    useEffect(() => {

    }, [data]);

    const productInfoList: ProductListType[] = data || [];

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
 
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose:any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">상품 목록</ModalHeader>
                        <ModalBody>
                            {productInfoList.length > 0 ? (
                                <Select label="상품 상세 페이지로 가기">
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
                            <Button color="danger" variant="light" onClick={onClose}>
                                닫기
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default BrandProductListModal;
