'use client'

import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useProductByBrandRead } from '@/(FSD)/entities/product/api/useProductByBrandRead';

import { Select, SelectItem } from "@nextui-org/select";
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import TextLargeShared from '@/(FSD)/shareds/ui/TextLargeShared';
import TextMediumShared from '@/(FSD)/shareds/ui/TextMediumShared';



interface ProductCreateManualModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

const ProductCreateManualModal = ({ isOpen, onOpenChange }: ProductCreateManualModalProps) => {

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='full'>
            <ModalContent style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">상품 등록 메뉴얼</ModalHeader>
                        <ModalBody>
                            <div style={{ padding: '16px' }}>

                                <TextLargeShared>상품 등록 시 기입할 품번과 해당하는 이미지를 업로드해 주세요. 업로드한 이미지는 상품을 등록하기 전 24시간 동안 유지돼요.
                                    <br />
                                    업로드 이미지 조회하기 버튼을 눌러 이미지를 확인할 수 있어요.<br /> 해당 이미지의 링크를 복사하여 엑셀에 기입해 주세요.</TextLargeShared><br/>
                                <TextLargeShared>엑셀 파일의 각 열은 다음과 같은 정보를 담고 있습니다: </TextLargeShared> 
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>열</th>
                                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>열 이름</th>
                                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>필수 여부</th>
                                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>설명</th>
                                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>예시</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>A</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>품번</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>필수</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 고유 식별 번호입니다. 이미지 업로드시 사용한 품번을 작성해 주세요.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>MITS0005-KR</td>

                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>B</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품 이름</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>필수</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 이름을 작성해 주세요. </td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>릴렉스 핏 크루 넥 반팔 티셔츠 [브릭 레드]</td>

                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>C</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>카테고리</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>필수</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품이 속하는 상위 카테고리를 작성해 주세요.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상의, 하의, 아우터</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>D</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>서브 카테고리</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>필수</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상위 카테고리에 속하는 하위 카테고리를 작성해 주세요.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상의 - 반팔, 긴팔 <br />
                                                하의 - 청바지, 반바지, 면, 나일론 <br />
                                                아우터 - 후드집업, 코트, 바람막이, 패딩, 자켓</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>E</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>가격</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>필수</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 정가를 작성해 주세요.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>30000</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>F</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>할인 가격</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>선택</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 할인 가격입니다. 할인 적용이 없는 경우 0으로 작성해 주세요.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>25000</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>G</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>색상</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>필수</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 색상을 작성해 주세요.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>레드</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>H</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>사이즈</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>필수</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 사이즈입니다. 여러 사이즈일 경우 쉼표로 구분하여 작성해 주세요.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>S,M,L,XL</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>I</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>재고</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>필수</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 현재 재고 수량입니다. 사이즈 순서에 맞게 재고를 쉼표로 구분하여 작성해 주세요.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>10,20,30,40</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>J</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>이미지1</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>필수</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 첫 번째 이미지 URL입니다.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>https://xenoimages12341234.s3.ap-northeast-2.amazonaws.com/.....</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>K</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>이미지2</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>선택</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 두 번째 이미지 URL입니다.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>https://xenoimages12341234.s3.ap-northeast-2.amazonaws.com/.....</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>L</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>이미지3</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>선택</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 세 번째 이미지 URL입니다.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>https://xenoimages12341234.s3.ap-northeast-2.amazonaws.com/.....</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>M</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>이미지4</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>선택</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 네 번째 이미지 URL입니다.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>https://xenoimages12341234.s3.ap-northeast-2.amazonaws.com/.....</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>N</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>이미지5</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>선택</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 다섯 번째 이미지 URL입니다.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>https://xenoimages12341234.s3.ap-northeast-2.amazonaws.com/.....</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>O</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>이미지6</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>선택</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 여섯 번째 이미지 URL입니다.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>https://xenoimages12341234.s3.ap-northeast-2.amazonaws.com/.....</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>P</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상세이미지</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>필수</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품의 상세 이미지 URL입니다.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>https://xenoimages12341234.s3.ap-northeast-2.amazonaws.com/.....</td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Q</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>시즌</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>필수</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>상품이 속하는 시즌입니다.</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>2022 SS</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p style={{ marginTop: '16px' }}>
                                <TextLargeShared>위의 설명에 따라 엑셀 파일을 작성하여 업로드한 후 엑셀 등록하기 버튼을 눌러주세요. <br/>각 항목에 맞는 정보를 정확하게 입력하지 않으면 오류가 발생할 수 있어요.</TextLargeShared>   
                                </p>
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

export default ProductCreateManualModal;
