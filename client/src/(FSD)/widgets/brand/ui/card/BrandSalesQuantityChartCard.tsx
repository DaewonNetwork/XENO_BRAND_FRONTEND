'use client'

import React from 'react';


import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { useOrderSalesAmountReadByYear } from '@/(FSD)/entities/order/api/useOrderSalesAmountReadByYear';
import { useOrderSalesQuantityReadByYear } from '@/(FSD)/entities/order/api/useOrderSalesQuantityReadByYear';


const BrandSalesQuantityChartCard = () => {

    const { data } = useOrderSalesQuantityReadByYear(2024);

 

    if (!data) return <></>

    return (
        <Card style={{ marginBottom: '16px', textAlign: 'center' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    월별 판매 수량
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" orientation="left" />
                        <Tooltip
                            formatter={(value, name) => {
                                // 툴팁에서 값 포맷팅
                                return [value, name];
                            }}
                            labelFormatter={(label) => `날짜: ${label}`}
                        />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="quantity" stroke="#82ca9d" name="판매 수량" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

    );
};

export default BrandSalesQuantityChartCard;
