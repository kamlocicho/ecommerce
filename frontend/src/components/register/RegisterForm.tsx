'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useForm, SubmitHandler } from 'react-hook-form'
import { redirect } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { useAuthStore } from '@/store/AuthStore'


type Inputs = {
    fullName: string
    email: string
    password: string
}


export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const { isAuthenticated, setIsAuthenticated } = useAuthStore()
    const [cookies, setCookie] = useCookies(['access_token']);
    const toast = useToast()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
        const responseData = await res.json()
        console.log(responseData);


        if (responseData.success == false) {
            toast({
                title: responseData?.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return;
        }

        toast({
            title: 'User created.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        const token = responseData.token
        setCookie("access_token", token)
        setIsAuthenticated(true)
        redirect('/')
    }

    if (isAuthenticated) redirect('/')


    return (
        <>
            <Flex
                minH={'80vh'}
                h='100%'
                w='100%'
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('white', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} align='center' py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}
                        minW='500px'
                    >
                        <Stack spacing={4}>
                            <FormControl id="fullName" isInvalid={errors?.fullName ? true : false}>
                                <FormLabel>Full Name</FormLabel>
                                <Input type="text" {...register("fullName", { required: "Full name is required" })} />
                                {errors?.fullName && <FormErrorMessage>{errors?.fullName?.message}</FormErrorMessage>}
                            </FormControl>
                            <FormControl id="email" isInvalid={errors?.email ? true : false}>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" {...register("email", { required: "Email is required" })} />
                                {errors?.email && <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>}
                            </FormControl>
                            <FormControl id="password" isInvalid={errors?.password ? true : false}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} {...register("password", { required: "Password is required" })} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors?.password && <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>}
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link href='/login' color={'blue.400'}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}