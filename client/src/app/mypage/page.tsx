
import AppInner from '@/(FSD)/widgets/app/ui/AppInner'
import AppSection from '@/(FSD)/widgets/app/ui/AppSection'
import BrandProFileContainer from '@/(FSD)/widgets/brand/ui/BrandProFileContainer'

import React from 'react'

const Page = () => {

    return (
        <AppSection>
            <AppInner>
                <BrandProFileContainer/>
            </AppInner>
        </AppSection>
    )
}

export default Page
