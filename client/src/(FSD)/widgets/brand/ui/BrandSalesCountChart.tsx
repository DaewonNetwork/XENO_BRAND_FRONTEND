import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const data = [
    { date: '2024-01', revenue: 10000000, quantity: 240 },
    { date: '2024-02', revenue: 10000000, quantity: 221 },
    { date: '2024-03', revenue: 10000000, quantity: 129 },
    { date: '2024-04', revenue: 10000000, quantity: 200 },
    { date: '2024-05', revenue: 1890, quantity: 300 },
    { date: '2024-06', revenue: 2390, quantity: 300 },
    { date: '2024-07', revenue: 3490, quantity: 400 },
];

const BrandSalesCountChart = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date">
                </XAxis>
                <YAxis yAxisId="left" orientation="left">
                </YAxis>
                <Tooltip
                    formatter={(value, name) => {
                        return [value, name];
                    }}
                    labelFormatter={(label) => `날짜: ${label}`}
                />
                <Legend />  
                <Line yAxisId="left" type="monotone" dataKey="quantity" stroke="#82ca9d" name="판매 수량" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default BrandSalesCountChart;
