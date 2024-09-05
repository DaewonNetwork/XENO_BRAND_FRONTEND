"use client"

import React, { useState } from 'react'
import QuestionBtn from './QuestionBtn'
import ProductCreateBtn from '../../product/ui/ProductCreateBtn'
import DarkModeSelectBtn from './DarkModeSelectBtn'
import { Button } from '@nextui-org/button'
import ProductImageCheckModal from '@/(FSD)/entities/product/ui/ProductImageCheckModal'
import IconShared from '@/(FSD)/shareds/ui/IconShared'
import TextMediumShared from '@/(FSD)/shareds/ui/TextMediumShared'
import { useRouter } from 'next/navigation'
import UserInfoCard from '@/(FSD)/entities/Brand/ui/UserInfoCard'
import BrandProductStockUpdateBtn from './button/BrandProductStockUpdateBtn'
import BrandProductShippingUpdateBtn from './button/BrandProductShippingUpdateBtn'
import BrandProductListBtn from './button/BrandProductListBtn'
import BrandProductsUpdateImageBtn from './button/BrandProductsUpdateImageBtn'
import BrandProductSalesListBtn from './button/BrandProductSalesListBtn'
import BrandProductRefundListBtn from './button/BrandProductRefundListBtn'
import { useDisclosure } from '@nextui-org/modal'
import ProductUpdateBtn from '../../product/ui/ProductUpdateBtn'



const BrandProFileContainer = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
   

 
    return (
        <>

            {isOpen && (
                <ProductImageCheckModal
                    isOpen={isOpen}
                    onOpenChange={onClose}
                />
            )}

            <UserInfoCard />

            <ProductCreateBtn />

            <ProductUpdateBtn />

            <BrandProductStockUpdateBtn />

            <BrandProductShippingUpdateBtn />

            <BrandProductRefundListBtn />

            <BrandProductListBtn />

            <BrandProductsUpdateImageBtn />

            <Button style={{ marginBottom: "10px" }} onClick={onOpen} size={"sm"}
                className="w-full h-[100px] bg-white border-2" radius="none"
            ><TextMediumShared>업로드한 이미지 조회하기</TextMediumShared></Button>

            <BrandProductSalesListBtn />

            {/* <QuestionBtn /> */}

            {/* <DarkModeSelectBtn/> */}
        </>
    )
}

export default BrandProFileContainer
