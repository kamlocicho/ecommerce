"use client"

import { GridItem, SimpleGrid } from '@chakra-ui/layout';
import React from 'react'
import ProductCard from './ProductCard';

interface Product {
    _id: string;
    title: string;
    inStock: boolean;
    description: string;
    media: any;
    price: number;
    status: string;
}

export default function ProductGrid({ products }: any) {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }}>
            {products && products.map((product: Product) => (
                <GridItem>
                    <ProductCard product={product} />
                </GridItem>
            ))}
        </SimpleGrid>
    )
}
