"use client";

import React, { useEffect } from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import { Button } from "@nextui-org/button";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { useProductUploadImagesRead } from "../api/useProductUploadImagesRead";
import { ImageListType } from "@/(FSD)/features/product/ui/ProductCreateForm";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Card, CardContent } from "@mui/material";

interface ProductImageCheckModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

const ProductImageCheckModal = ({ isOpen, onOpenChange }: ProductImageCheckModalProps) => {
    const { data, isError, error, isPending, refetch } = useProductUploadImagesRead();
    const images: ImageListType[] = data || [];

    useEffect(() => {
        refetch();
    }, [refetch]);

    const copyImagesToClipboard = (imageUrls: string[]) => {
        // 유효한 URL만 필터링
        const validUrls = imageUrls.filter(url => url);
        if (validUrls.length === 0) {
            alert('복사할 이미지 URL이 없습니다.');
            return;
        }

        // 탭으로 구분된 URL 문자열 생성
        const urlsText = validUrls.join('\t');

        // 클립보드에 복사
        navigator.clipboard.writeText(urlsText).then(() => {
            console.log('이미지 URL이 클립보드에 복사되었습니다.');
            alert('이미지 URL이 클립보드에 복사되었습니다.');
        }).catch(err => {
            console.error('클립보드 복사 실패:', err);
            alert('클립보드 복사에 실패했습니다.');
        });
    };

    if (!images) return <></>;

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            {(onClose: any) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">이미지 조회 | 24시간 내에 상품이 등록되지 않은 이미지는 삭제돼요.</ModalHeader>
                    <ModalBody>
                        <div>
                            {images.map((image) => (
                                <Card key={image.productNumber} style={{ marginBottom: '16px' }}>
                                    <CardContent>
                                        <AppInner>
                                            <TextMediumShared>품번 : {image.productNumber}</TextMediumShared>
                                            <br />
    
                                            <TextMediumShared>상품 이미지</TextMediumShared>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                                                {[
                                                    image.url_1, image.url_2, image.url_3, image.url_4, image.url_5, image.url_6
                                                ].map((url, index) => (
                                                    <div key={index} style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '8px', border: '1px solid #ddd' }}>
                                                        {url ? (
                                                            <img src={url} alt={`상품 이미지 ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        ) : (
                                                            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
                                                                <TextMediumShared>이미지 없음</TextMediumShared>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div style={{ marginBottom: '16px' }}>
                                                <Button onClick={() => copyImagesToClipboard([
                                                    image.url_1, image.url_2, image.url_3, image.url_4, image.url_5, image.url_6
                                                ])}>
                                                    이미지 링크 일괄 복사하기
                                                </Button>
                                            </div>
    
                                            <TextMediumShared>상세 이미지</TextMediumShared>
                                            {image.detailUrl ? (
                                                <div style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '16px' }}>
                                                    <img src={image.detailUrl} alt="상세 이미지" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            ) : (
                                                <div style={{ width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '16px' }}>
                                                    <TextMediumShared>상세 이미지 없음</TextMediumShared>
                                                </div>
                                            )}
                                            <div >
                                                <Button onClick={() => copyImagesToClipboard([
                                                    image.detailUrl
                                                ])}>
                                                    상세 이미지 링크 복사하기
                                                </Button>
                                            </div>
                                        </AppInner>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
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

export default ProductImageCheckModal;