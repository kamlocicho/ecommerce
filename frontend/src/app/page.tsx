import Layout from '@/components/Layout'
import ProductGrid from '@/components/products/ProductGrid'
import React from 'react'


const getData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    const data = await res.json()
    return data
}
export default async function Home() {
    const { products, success } = await getData()

    return (
        <Layout>
            <ProductGrid products={products} />
        </Layout>
    )
}
