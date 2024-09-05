'use client'

import React from 'react';

import { useRouter } from 'next/navigation';
import { useOrderCountListRead } from '@/(FSD)/entities/order/api/useOrderCountListRead';
import { Card, CardContent, Typography } from '@mui/material';



interface OrderCountType {
    status: string;
    count: number
}

const BrandSalesStautsCountCard = () => {

    const { data } = useOrderCountListRead();

    const list:OrderCountType[] = data || null;

    if(!list) return <></>
    const router = useRouter();
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
                        결제 완료 상품: {list[1].count} |   {' '}
                        <span
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={handleMyPageClick}
                        >
                            마이페이지
                        </span>
                        에서 엑셀을 다운로드해 운송장을 등록하세요.
                    </>
                }
            />
            <StatusCard
                title={
                    <>
                        환불 요청 상품: {list[0].count} |  {' '}
                        <span
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={handleMyPageClick}
                        >
                            마이페이지
                        </span>
                        에서 엑셀을 다운로드해 상품을 확인하세요.
                    </>
                }
            />
        </div>
    );
};

export default BrandSalesStautsCountCard;
