import { useAuthStore } from "@/store/AuthStore"
import { useToast } from "@chakra-ui/react"
import { useCookies } from "react-cookie"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { IProduct } from "../product/ProductDetails"


const addToCart = async (productId: string, token: string) => await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${productId}`, {
    method: 'PUT', headers: {
        'x-auth-token': token
    }
}).then(res => res.json())
export const useAddToCart = (productId: string) => {
    const toast = useToast()
    const [cookies] = useCookies(["access_token"])
    const queryClient = useQueryClient()


    const mutation = useMutation('addToCart', () => addToCart(productId, cookies.access_token),
        {
            onError: () => {
                toast({
                    title: "Sorry, there was an error.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries('cart')
                toast({
                    title: 'Added to cart.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }
        })
    return mutation
}


const getCart = async (token: string): Promise<{ cart: IProduct[], success: boolean }> => await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: 'GET', headers: {
        'x-auth-token': token
    }
}).then(res => res.json())
export const useCart = () => {
    const [cookies] = useCookies(["access_token"])

    return useQuery({
        queryKey: 'cart',
        queryFn: () => getCart(cookies.access_token),
    })
}


const removeFromCart = async (token: string, index: number): Promise<{ message: string, success: boolean }> => await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${index}/remove`, {
    method: 'PUT',
    headers: {
        'x-auth-token': token
    }
}).then(res => res.json())
export const useRemoveFromCart = () => {
    const toast = useToast()
    const [cookies] = useCookies(["access_token"])
    const queryClient = useQueryClient()

    const mutation = useMutation('removeFromCart', (index: number) => removeFromCart(cookies.access_token, index),
        {
            onError: () => {
                toast({
                    title: "Sorry, there was an error.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            },
            onSuccess: ({ message }) => {
                queryClient.invalidateQueries('cart')
                toast({
                    title: message,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }
        })
    return mutation
}