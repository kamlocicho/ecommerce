'use client'

import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useAuthStore } from '@/store/AuthStore'
import { useCookies } from 'react-cookie'
import CartDrawer from './cart/CartDrawer'
import { Link } from '@chakra-ui/next-js'

interface Props {
    children: React.ReactNode
}

const Links = ['Dashboard', 'Projects', 'Team']

const NavLink = (props: Props) => {
    const { children } = props

    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={'#'}>
            {children}
        </Box>
    )
}

export default function Navbar({ children, isAuthenticated }: { children: any, isAuthenticated: boolean }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenCart, onOpen: onOpenCart, onClose: onCloseCart } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()
    const { setIsAuthenticated } = useAuthStore()
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

    const logout = () => {
        removeCookie("access_token")
        setIsAuthenticated(false)
    }

    return (
        <Box minH={'calc(100vh - 80px)'}>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} >
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'} gap='5'>
                        <Button onClick={toggleColorMode}>
                            {colorMode == 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                        {isAuthenticated ?
                            <>
                                <Button onClick={onOpenCart}>
                                    Cart
                                </Button>
                                <CartDrawer isOpen={isOpenCart} onClose={onCloseCart} />
                                <Button as={Link} href="/" onClick={logout}>
                                    Logout
                                </Button>
                            </>
                            :
                            <Button as="a" href="/register">
                                Signup
                            </Button>
                        }
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Box p={4}>{children}</Box>
        </Box>
    )
}