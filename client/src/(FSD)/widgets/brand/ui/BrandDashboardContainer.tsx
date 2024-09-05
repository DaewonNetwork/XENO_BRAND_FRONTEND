"use client"

import React, { useState } from 'react'

import BrandSalesDashBoard from './BrandSalesDashBoard'
import AppSection from '../../app/ui/AppSection'
import AppInner from '../../app/ui/AppInner'

import { useRouter } from 'next/navigation'


const BrandDashboardContainer = () => {
    let accessToken = null;
    const router = useRouter();

    if (typeof window !== "undefined") {
        accessToken = localStorage.getItem("access_token");
        if (accessToken == null) {
            router.push('/auth/signin')
        }
    }
    
    return (
        <AppSection>
            <AppInner>
                <BrandSalesDashBoard />
            </AppInner>
        </AppSection>
    )
}

export default BrandDashboardContainer
