'use client'

import React from 'react';

import { useRouter } from 'next/navigation';
import { useOrderCountListRead } from '@/(FSD)/entities/order/api/useOrderCountListRead';
import { Card, CardContent, Typography } from '@mui/material';
import { useProductSoldOutRead } from '@/(FSD)/entities/product/api/useProductSoldOutRead';




interface OrderCountType {
    count: number
}

const BrandSoldOutProductsCountCard = () => {

    const { data } = useProductSoldOutRead();
    const router = useRouter();
    const count:OrderCountType = data || null;
    console.log(count)
    const StatusCard = ({ title }: any) => (
        <Card style={{ marginBottom: '16px', textAlign: 'center' }}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
            </CardContent>
        </Card>
    );

    const handleMyPageClick = () => {
   
        router.push('/mypage')
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <StatusCard
                title={
                    <>
                        품절 상품: {count != null ? count : 0} |   {' '}
                        <span
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={handleMyPageClick}
                        >
                            마이페이지
                        </span>
                        에서 엑셀을 다운로드해 재고를 수정할 수 있어요.
                    </>
                }
            />
        </div>
    );
};

export default BrandSoldOutProductsCountCard;
