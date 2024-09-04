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



const BrandProFileContainer = () => {
    const router = useRouter();
    let accessToken = null;
    
    if (typeof window !== "undefined") {
        accessToken = localStorage.getItem("access_token");
        if(accessToken == null) {
            router.push('/auth/signin')
        }
    }

    const [checkOpen, setCheckOpen] = useState<boolean>(false);
 
    return (
        <>

            {checkOpen && (
                <ProductImageCheckModal
                    setCheckOpen={setCheckOpen}

                />
            )}

            <UserInfoCard />

            <ProductCreateBtn />

            <BrandProductStockUpdateBtn />

            <BrandProductShippingUpdateBtn />

            <BrandProductListBtn />

            <Button style={{ marginBottom: "10px" }} onClick={() => setCheckOpen(true)} size={"sm"}
                className="w-full h-[100px] bg-white border-2" radius="none"
            ><TextMediumShared>업로드한 이미지 조회하기</TextMediumShared></Button>

            <BrandProductsUpdateImageBtn />

            <BrandProductSalesListBtn />

            <QuestionBtn />

            {/* <DarkModeSelectBtn/> */}
        </>
    )
}

export default BrandProFileContainer
