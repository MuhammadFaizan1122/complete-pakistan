"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {isVisible && (
                <IconButton
                    icon={<FaArrowUp />}
                    aria-label="Back to top"
                    onClick={scrollToTop}
                    position="fixed"
                    bottom="30px"
                    right="30px"
                    bg="#0a7450"
                    color="white"

                    size="lg"
                    borderRadius="full"
                    shadow="md"
                    zIndex="9999"
                />
            )}
        </>
    );
}
