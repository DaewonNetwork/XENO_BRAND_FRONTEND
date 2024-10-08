"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { Button } from "@nextui-org/button";
import ProductImageCreateModal from "./ProductImageCreateModal";
import { useRecoilState } from "recoil";
import { productDetailImageState, productImagesState } from "@/(FSD)/shareds/stores/ProductCreateAtome";
import { ProductCreateResponse, useProductCreate } from "../api/useProductCreate";
import { useRouter } from "next/navigation";
import ProductImageCheckModal from "@/(FSD)/entities/product/ui/ProductImageCheckModal";
import { download, newDownload } from "@/(FSD)/entities/product/api/useProductListExcelDownload";
import { apiPath } from "@/(FSD)/shareds/fetch/APIpath";
import { useDisclosure } from "@nextui-org/modal";




export interface ImageListType {
    productNumber: string;
    url_1: string;
    url_2: string;
    url_3: string;
    url_4: string;
    url_5: string;
    url_6: string;
    detailUrl: string;
}
const ProductCreateForm = () => {
    const { isOpen: isOpenModal, onOpen, onClose } = useDisclosure();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [checkOpen, setCheckOpen] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [formBlocks, setFormBlocks] = useState<number[]>([1]); // 초기 블록 하나 추가

    const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm({
        resolver: zodResolver(z.object({ productNumber: z.string() })),
        mode: "onChange"
    });

    const [productImages, setProductImages] = useRecoilState(productImagesState);
    const [productDetailImage, setProductDetailImage] = useRecoilState(productDetailImageState);
    const [excelFile, setExcelFile] = useState<File | null>(null);


    const handleExcelFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setExcelFile(event.target.files[0]);
        }
    };

    const { mutate } = useProductCreate({
        onSuccess: (index) => {
            alert(`${index + 1} 번째 이미지가 성공적으로 업로드되었습니다!`);
        },
        onError: () => {
            alert("이미지 업로드에 실패했습니다.");
        },
    });

    const onSubmit = async () => {
        let allSuccess = true;

        for (let i = 0; i < formBlocks.length; i++) {
            const formData = new FormData();
            const productNumber = getValues(`productNumber-${i}`); // 각 블록의 productNumber 가져오기

            formData.append("productNumber", productNumber);


            productImages[i]?.forEach((image: File) => {
                if (image) {
                    formData.append(`productImages`, image);
                }
            });

            if (productDetailImage[i]) {
                formData.append(`productDetailImage`, productDetailImage[i]);
            }

            // 업로드를 비동기적으로 처리
            await new Promise<void>((resolve, reject) => {
                mutate(
                    { formData, index: i },
                    {
                        onSuccess: () => {
                            resolve();
                        },
                        onError: () => {
                            allSuccess = false;
                            reject();
                        }
                    }
                );
            }).catch(() => {
                allSuccess = false;
            });
        }

        if (allSuccess) {
            alert("모든 이미지가 성공적으로 업로드되었습니다!");
        } else {
            alert("일부 이미지의 업로드에 실패했습니다.");
        }
    };


    let accessToken = null;

    if (typeof window !== "undefined") {
        accessToken = localStorage.getItem("access_token");
    }

    const addFormBlock = () => {
        setFormBlocks([...formBlocks, formBlocks.length + 1]);
    };

    const removeFormBlock = (index: number) => {
        setFormBlocks(formBlocks.filter((_: any, i) => i !== index));
        setProductImages(productImages.filter((_: any, i: any) => i !== index));
        setProductDetailImage(productDetailImage.filter((_: any, i: any) => i !== index));
    };



    const handleExcelUpload = async () => {
        if (!excelFile) {
            alert('엑셀 파일을 선택해 주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('excel', excelFile);

        try {
            const response = await fetch(`${apiPath}/api/product/create`, {
                method: 'POST',
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
            {formBlocks.map((block, idx) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <form key={idx} style={{ display: isOpen && idx === formBlocks.length - 1 ? "none" : "block" }} className={styles.product_create_form} onSubmit={handleSubmit(onSubmit)}>
                        <TextMediumShared isLabel={true} htmlFor={`productNumber-${idx}`}>품번</TextMediumShared>
                        <FormInputShared
                            isClearable
                            size={"lg"}
                            variant={"flat"}
                            isInvalid={!!errors[`productNumber-${idx}`]}
                            radius={"none"}
                            errorMessage={errors[`productNumber-${idx}`] && <>{errors[`productNumber-${idx}`]?.message}</>}
                            name={`productNumber-${idx}`}
                            control={control}
                            placeholder={"품번을 입력해주세요."}

                        />
                        <TextMediumShared>이미지</TextMediumShared>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button
                                onClick={() => {
                                    setIsOpen(true);
                                    setIndex(idx);
                                }}
                                size={"lg"} type={"button"} variant={"ghost"}
                            >
                                이미지 등록하기
                            </Button>
                            {idx === formBlocks.length - 1 && (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Button
                                        size={"lg"}
                                        type={"button"}
                                        variant={"ghost"}
                                        onClick={addFormBlock}
                                    >
                                        추가 이미지
                                    </Button>
                                    {formBlocks.length > 1 && (
                                        <Button
                                            size={"lg"}
                                            type={"button"}
                                            variant={"ghost"}
                                            onClick={() => removeFormBlock(idx)} // 인덱스에 맞게 삭제 함수 호출
                                        >
                                            삭제
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            ))}
            <br></br>

            {isOpen && (
                <ProductImageCreateModal
                    setIsOpen={setIsOpen}
                    files={productImages[index] || []}
                    detailFile={productDetailImage[index] || null}
                    index={index}
                />
            )}

            {isOpenModal && (
                <ProductImageCheckModal
                    isOpen={isOpenModal}
                    onOpenChange={onClose}

                />
            )}

            <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <Button
                    style={{ marginBottom: "10px", marginRight: '10px' }}
                    // isDisabled={(!isValid)}
                    size={"lg"} type={"button"} variant={"ghost"}
                    onClick={onOpen} // 모든 폼 블록을 한 번에 제출
                >
                    업로드한 이미지 조회하기
                </Button>
                <Button
                    isDisabled={(!productImages || !productDetailImage)}
                    size={"lg"}
                    type={"button"}
                    color={"primary"}

                    onClick={onSubmit} // 모든 폼 블록을 한 번에 제출
                >
                    이미지 업로드하기
                </Button>

            </div>
            <br />
            <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <Button
                    style={{ marginBottom: "10px" }}
                    // isDisabled={(!isValid)}
                    size={"lg"} variant={"ghost"}
                    onClick={() => newDownload()}
                >
                    새 엑셀 템플릿 다운받기
                </Button>
            </div>


            <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <input
                    style={{ marginBottom: "10px" }}
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleExcelFileChange}
                />
                <Button style={{ marginBottom: "10px" }}
                    isDisabled={(!excelFile)}
                    size={"lg"} type={"button"} color="primary" onClick={handleExcelUpload}>엑셀 등록하기</Button>
            </div>

        </>
    );
};

export default ProductCreateForm;
