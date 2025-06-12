import Providers from '../../providers/Providers'
import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { ToastContainer } from 'react-toastify';

const Layout = async ({ children }) => {

    return (
        <>
            <Providers>
                <ToastContainer />
                <Header />
                {children}
                <Footer />
            </Providers>
        </>
    )
}

export default Layout