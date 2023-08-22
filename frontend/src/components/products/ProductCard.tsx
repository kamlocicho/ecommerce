'use client'

import { Link } from '@chakra-ui/next-js';
import {
    Flex,
    Box,
    useColorModeValue,
} from '@chakra-ui/react'

interface Product {
    _id: string;
    title: string;
    inStock: boolean;
    description: string;
    media: any;
    price: number;
    status: string;
}


function ProductCard({ product }: { product: Product }) {
    return (
        <Flex p={50} maxW="450px" w='100%' alignItems="center" justifyContent="center" as={Link} href={`/product/${product._id}`} _hover={{ textDecor: 'none' }}>
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                w='full'
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
            >
                <Box h='250px' w='100%' bgImage={`url(${product.media})`} bgSize={'cover'} bgPos={'center'} />

                <Box p="6">
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="  xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated>
                            {product.title}
                        </Box>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                        <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                            {product.price} PLN
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}

export default ProductCard