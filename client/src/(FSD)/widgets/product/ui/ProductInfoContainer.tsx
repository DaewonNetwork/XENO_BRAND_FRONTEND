"use client";

import React, { useEffect } from "react";
import { notFound, useParams } from "next/navigation";

import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";
import ProductInfo from "@/(FSD)/widgets/product/ui/ProductInfo";
import ProductImagesSlideList from "@/(FSD)/widgets/product/ui/ProductImagesSlideList";
import { useSetRecoilState } from "recoil";
import { nameState, urlState } from "@/(FSD)/shareds/stores/ProductAtom";
import ProductDetailImage from "./ProductDetailImage";
import { useProductRead } from "@/(FSD)/entities/product/api/useProductRead";
import NotFound from "@/app/products/not-found";
import ReviewInfoList from "../../review/ui/ReviewInfoList";



const ProductInfoContainer = () => {
    const { productId } = useParams<{ productId: string }>();
    const { data, isError, error, isPending, refetch } = useProductRead(+productId);

    const productInfo: ProductInfoType = data;

    useEffect(() => {
        refetch();
    }, [productId, data, refetch]);

    if (isError) {
        notFound();
    }

    if (!productInfo) return <></>;

    console.log(productInfo)


    return (
        <>
            <ProductImagesSlideList productImages={productInfo.productImages} />
            <ProductInfo product={productInfo} />
            <ProductDetailImage url={productInfo.productDetailImage} />

            <ReviewInfoList productId={productId} />
        </>
    );
};

export default ProductInfoContainer;
