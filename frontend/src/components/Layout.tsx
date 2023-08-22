'use client'

import { Box } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useAuthStore } from '@/store/AuthStore'
import { useCookies } from 'react-cookie'

export default function Layout({ children }: any) {
    const { isAuthenticated, setIsAuthenticated } = useAuthStore()
    const [cookies] = useCookies(['access_token']);

    useEffect(() => {
        if (cookies.access_token) {
            setIsAuthenticated(true)
        }
    }, [])

    return (
        <Box>
            <Navbar isAuthenticated={isAuthenticated}>
                {children}
            </Navbar>
            <Footer />
        </Box>
    )
}
