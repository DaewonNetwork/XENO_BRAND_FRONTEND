'use client'

import React from 'react';


import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { useOrderSalesAmountReadByYear } from '@/(FSD)/entities/order/api/useOrderSalesAmountReadByYear';


const BrandSalesAmountChartCard = () => {

    const { data } = useOrderSalesAmountReadByYear(2024);

    if (!data) return <></>

    const formatNumber = (value: any) => {
        if (value >= 10000) {
            return `${Math.round(value / 10000)}만원`;
        }
        return `${value}원`;
    };



    return (
        <Card style={{ marginBottom: '16px', textAlign: 'center' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    월별 매출액
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" orientation="left" tickFormatter={formatNumber} />
                        <Tooltip
                            formatter={(value, name) => {
                                // 툴팁에서 값 포맷팅
                                return [formatNumber(value), name];
                            }}
                            labelFormatter={(label) => `날짜: ${label}`}
                        />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="amount" stroke="#82ca9d" name="매출액" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

    );
};

export default BrandSalesAmountChartCard;
