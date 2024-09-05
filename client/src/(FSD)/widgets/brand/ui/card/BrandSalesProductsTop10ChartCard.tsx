'use client'

import React from 'react';


import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, Bar, BarChart } from 'recharts';
import { useOrderSalesAmountReadByYear } from '@/(FSD)/entities/order/api/useOrderSalesAmountReadByYear';
import { useOrderSellingProductsByTop10 } from '@/(FSD)/entities/order/api/useOrderSellingProductsByTop10';

const BrandSalesProductsTop10ChartCard = () => {

    const { data } = useOrderSellingProductsByTop10();
    console.log(data)
    if (!data) return <></>

    return (
        <Card style={{ marginBottom: '16px', textAlign: 'center' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    가장 많이 팔린 상품
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="productName"
                            tickFormatter={(value) => value.length > 10 ? `${value.slice(0, 10)}...` : value}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quantity" fill="#8884d8" name={"판매 수량"} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default BrandSalesProductsTop10ChartCard;