import Providers from '@/providers/Providers'
import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Layout = ({ children }) => {
    return (
        <>
            <Providers>
                <Header/>
                {children}
                <Footer/>
            </Providers>
        </>
    )
}

export default Layout