'use client'

import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

import BrandSalesCountChart from './BrandSalesCountChart';
import BrandSalesStautsCountCard from './card/BrandSalesStautsCountCard';
import BrandSalesAmountChartCard from './card/BrandSalesAmountChartCard';
import BrandSalesQuantityChartCard from './card/BrandSalesQuantityChartCard';
import BrandSalesProductsTop10ChartCard from './card/BrandSalesProductsTop10ChartCard';
import BrandSoldOutProductsCountCard from './BrandSoldOutProductsCountCard';




interface OrderCountType {
    status: string;
    count: number
}

const BrandSalesDashBoard = () => {


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <BrandSalesStautsCountCard/>

            <BrandSoldOutProductsCountCard/>

            <BrandSalesAmountChartCard/>
        
            <BrandSalesQuantityChartCard/>

            <BrandSalesProductsTop10ChartCard/>

        </div>
    );
};

export default BrandSalesDashBoard;
