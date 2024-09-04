'use client'

import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useProductByBrandRead } from '@/(FSD)/entities/product/api/useProductByBrandRead';

import { Select, SelectItem } from "@nextui-org/select";
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { productListState } from '@/(FSD)/shareds/stores/ProductAtom';


interface ProductListType {
    productId: number;
    productNumber: string;
    productName: string;
}

interface BrandProductListModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

const BrandProductsUpdateImageModal = ({ isOpen, onOpenChange }:BrandProductListModalProps) => {

    const { data, isError, error, isPending } = useProductByBrandRead();
    const [productList, setProductList] = useRecoilState(productListState);
    const router = useRouter();

    const [values, setValues] = React.useState(new Set([]));

    useEffect(() => {

    }, [data]);

    const productInfoList: ProductListType[] = data || [];

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const handleSetProductList = (values: Set<never>) => {
        setProductList(values);
        router.push('/mypage/product/update-image')
    }

 
 
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">상품 목록</ModalHeader>
                    <ModalBody>
                        {productInfoList.length > 0 ? (
                            // @ts-ignore
                            <Select selectionMode="multiple" label="최대 5개까지 선택 가능해요." selectedKeys={values} onSelectionChange={setValues} >
                                {productInfoList.map(product => (
                                    <SelectItem key={product.productNumber}
                                    >
                                        상품 고유 코드 : {product.productId} 품번 : {product.productNumber} 상품 이름 : {product.productName}
                                    </SelectItem>
                                ))}
                            </Select>
                        ) : (
                            ""
                        )}
                        <p className="text-small text-default-500">품번 : {Array.from(values).join(", ")}</p>
                        <Button onClick={() => handleSetProductList(values)}>확인</Button>

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
    );
};

export default BrandProductsUpdateImageModal;
