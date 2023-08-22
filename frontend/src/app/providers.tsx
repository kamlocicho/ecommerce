// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { useCookies } from 'react-cookie'
import { QueryClientProvider, QueryClient } from 'react-query'

export function Providers({
    children
}: {
    children: React.ReactNode
}) {
    const [cookies, setCookie] = useCookies(['access_token']);
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <CacheProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </QueryClientProvider>
    )
}