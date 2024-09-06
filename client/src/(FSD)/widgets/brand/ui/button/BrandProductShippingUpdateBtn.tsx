"use client"


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
import { paymentCompletedOrderDownload } from "@/(FSD)/entities/product/api/useProductListExcelDownload";
import { apiPath } from "@/(FSD)/shareds/fetch/APIpath";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
interface ProductColorCreateBtnType {
    productId: number;
    productNumber: string;
    productName: string;
}

const BrandProductShippingUpdateBtn = () => {


    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [excelFile, setExcelFile] = useState<File | null>(null);


    const handleExcelFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setExcelFile(event.target.files[0]);
        }
    };




    let accessToken = null;

    if (typeof window !== "undefined") {
        accessToken = localStorage.getItem("access_token");
    }


    const handleExcelUpload = async () => {
        if (!excelFile) {
            alert('엑셀 파일을 선택해 주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('excel', excelFile);

        try {
            const response = await fetch(`${apiPath}/api/orders/tracking`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                alert('엑셀 파일 업로드 성공');
                window.location.reload();
            } else {
                const errorText = await response.text();
                alert(`업로드 실패: ${errorText}`);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('엑셀 파일 업로드 중 오류가 발생했습니다.');
        }
    };




    return (
        <>
            <Button style={{ marginBottom: "10px" }} onClick={onOpen} size={"sm"} className="w-full h-[100px] bg-white border-2" radius="none" endContent={<IconShared iconType={isOpen ? "top" : "bottom"} />}><TextMediumShared>
                상품 운송장 등록하기</TextMediumShared></Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                운송장 등록
                                <Tippy
                                    content={
                                        <div>
                                            <p><strong>엑셀을 다운로드해 택배사 코드와 운송장 번호를 입력해 주세요.</strong></p>
                                            <br/>
                                            <ul>
                                                <li><strong>CJ대한통운</strong>: <code>kr.cjlogistics</code></li>
                                                <li><strong>CU 편의점택배</strong>: <code>kr.cupost</code></li>
                                                <li><strong>우체국택배</strong>: <code>kr.epost</code></li>
                                                <li><strong>로젠택배</strong>: <code>kr.logen</code></li>
                                                <li><strong>롯데택배</strong>: <code>kr.lotte</code></li>
                                                <li><strong>한진택배</strong>: <code>kr.hanjin</code></li>
                                            </ul>
                                        </div>
                                    }
                                    placement="right"
                                    theme="light"
                                    maxWidth={500}  
                                >
                                   <Button  variant={"light"}  isIconOnly endContent={<IconShared iconType={"question"} iconSize={"md"}/>} ></Button>
                                </Tippy>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <Button
                                    // isDisabled={(!isValid)}
                                    fullWidth size={"lg"} type={"button"} variant={"ghost"}
                                    onClick={() => paymentCompletedOrderDownload()}
                                    style={{ marginBottom: '16px' }}  // 버튼 아래에 여백 추가
                                >
                                    결제 완료 된 주문 목록 다운 받기
                                </Button>

                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    onChange={handleExcelFileChange}
                                    style={{ display: 'block', marginBottom: '16px' }}  // 입력 필드 아래에 여백 추가
                                />

                                <Button
                                    isDisabled={!excelFile}
                                    fullWidth size={"lg"} type={"button"} variant={"ghost"}
                                    onClick={handleExcelUpload}
                                >
                                    엑셀 업로드하기
                                </Button>

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

        </>
    );
};

export default BrandProductShippingUpdateBtn;