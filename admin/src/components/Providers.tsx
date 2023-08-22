import React from 'react'
import { QueryClientProvider, QueryClient    } from 'react-query';

type Props = {
    children: string | React.JSX.Element | React.JSX.Element[]
}

const queryClient = new QueryClient()

export default function Providers({children}: Props) {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}
