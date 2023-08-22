import { Button, Center, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Heading, IconButton, Image, Spinner, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useCart, useRemoveFromCart } from './requests'
import { DeleteIcon } from '@chakra-ui/icons';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { data, isLoading } = useCart()
    const { mutate } = useRemoveFromCart()

    console.log(data);

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size={'md'}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Cart</DrawerHeader>

                <DrawerBody>
                    <Center w='full' h='full'>
                        {isLoading ? <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        /> :
                            <VStack w='full' alignItems={'stretch'} justifyContent={'start'} gap='5' h='full' divider={<Divider />}>
                                {data?.cart.map((product, index) => (
                                    <HStack alignItems={'flex-start'}>
                                        <Image src={product.media} maxW={'100px'} />

                                        <HStack alignItems={'flex-start'} w='full' justifyContent={'space-between'}>
                                            <VStack alignItems={'flex-start'}>
                                                <Heading fontSize={'16px'} fontWeight={500}>{product.title}</Heading>

                                                <Text>Price: {product.price} PLN</Text>
                                            </VStack>
                                            <IconButton onClick={() => mutate(index)} size={'sm'} aria-label='delete from cart' icon={<DeleteIcon color='red.600' />} />
                                        </HStack>
                                    </HStack>
                                ))}
                            </VStack>
                        }
                    </Center>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='blue'>Save</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
