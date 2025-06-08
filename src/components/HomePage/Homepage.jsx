import React from 'react'
import { HeroSection } from './HeroSection'
import { StatsSection } from './StatsSection'
import BrowseByCategory from './BrowseSection'
import CoreFeatures from './CoreFeature'
import ServiceSection from './ServicesSection'

const Homepage = () => {
    return (
        <div>
            <HeroSection />
            <StatsSection />
            <BrowseByCategory />
            <CoreFeatures />
            <ServiceSection />
        </div>
    )
}

export default Homepage