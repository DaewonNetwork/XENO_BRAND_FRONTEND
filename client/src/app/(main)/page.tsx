import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import BrandDashboardContainer from "@/(FSD)/widgets/brand/ui/BrandDashboardContainer";
import React from "react";

const Page = () => {
    return (
        <>
            <AppSection>
                <div>
                    <BrandDashboardContainer/>
                </div>
            </AppSection>
        </>
    );
};

export default Page;