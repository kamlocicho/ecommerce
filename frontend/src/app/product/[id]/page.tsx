import Layout from '@/components/Layout'
import ProductDetails from '@/components/product/ProductDetails'
import { useSearchParams } from 'next/navigation';
import React from 'react'

const getData = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
    const data = await res.json()

    return data
}

export default async function Home(props: any) {
    const { product } = await getData(props.params.id);


    return (
        <Layout>
            <ProductDetails product={product} />
        </Layout>
    )
}
