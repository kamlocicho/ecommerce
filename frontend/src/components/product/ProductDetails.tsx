"use client"

import { useAuthStore } from '@/store/AuthStore';

import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'

import { useCookies } from 'react-cookie';

import { MdLocalShipping } from 'react-icons/md'
import { useAddToCart } from '../cart/requests';

export interface IProduct {
    _id: string;
    title: string;
    inStock: boolean;
    description: string;
    media: any;
    price: number;
    status: string;
}


export default function ProductDetails({ product }: { product: IProduct }) {
    const { mutate, isLoading } = useAddToCart(product._id)
    const { isAuthenticated } = useAuthStore()
    const toast = useToast()

    const addToCart = async (productId: string) => {
        if (!isAuthenticated) {
            toast({
                title: "You need to login first.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return
        }

        mutate()
    }

    return (
        <Container maxW={'7xl'}>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 18, md: 24 }}>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={product.title}
                        src={product.media}
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{ base: '100%', sm: '400px', lg: '500px' }}
                    />
                </Flex>
                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                            {product.title}
                        </Heading>
                        <Text
                            color={useColorModeValue('gray.900', 'gray.400')}
                            fontWeight={300}
                            fontSize={'2xl'}>
                            {product.price} PLN
                        </Text>
                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={
                            <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
                        }>
                        <VStack spacing={{ base: 4, sm: 6 }}>
                            <Text
                                color={useColorModeValue('gray.500', 'gray.400')}
                                fontSize={'xl'}
                                fontWeight={'300'}>
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Masa Enejska. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies gdzie indziej niesklasyfikowane, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet gdzie indziej niesklasyfikowane, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Numer całkowity. Cras dapibus. Vivamus elementemm semper nisi. Aenean vulputate eleifend tellus.
                            </Text>
                        </VStack>
                    </Stack>

                    <Button
                        rounded={'none'}
                        w={'full'}
                        mt={8}
                        size={'lg'}
                        py={'7'}
                        variant={'outline'}
                        textTransform={'uppercase'}
                        onClick={() => addToCart(product._id)}
                        isLoading={isLoading}
                    >
                        Add to cart
                    </Button>

                    <Stack direction="row" alignItems="center" justifyContent={'center'}>
                        <MdLocalShipping />
                        <Text>2-3 business days delivery</Text>
                    </Stack>
                </Stack>
            </SimpleGrid>
        </Container>
    )
}