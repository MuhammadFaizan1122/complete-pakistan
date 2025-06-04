'use client'
import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";

const Providers = ({ children }) => {
    const theme = extendTheme({
        fonts: {
            heading: `'Figtree', sans-serif`,
            body: `'Figtree', sans-serif`,
        },
        colors: {
            brand: {
                100: "#f7fafc",
                900: "#1a202c",
            },
        },
        styles: {
            global: {
                "html, body": {
                    fontFamily: "'Figtree', sans-serif",
                },
                "*": {
                    fontFamily: "'Figtree', sans-serif",
                },
            },
        },
    });

    return (
        <>
            <ChakraProvider theme={theme}>
                {children}
            </ChakraProvider>
        </>
    )
}

export default Providers