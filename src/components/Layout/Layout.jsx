'use client'
import Providers from '../../providers/Providers'
import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { ToastContainer } from 'react-toastify';
import { usePathname } from 'next/navigation'

const Layout = ({ children }) => {
    const pathname = usePathname()
    return (
        <>
            <Providers>
                <ToastContainer />
                {
                    pathname.includes('/auth') ? <></>
                        : <Header />
                }
                {children}
                {
                    pathname.includes('/auth') ? <></>
                        :
                        <Footer />
                }
            </Providers>
        </>
    )
}

export default Layout