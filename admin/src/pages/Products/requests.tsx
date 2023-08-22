/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "react-query";
import applicationConfig from "../../config/applicationConfig";
import { Product } from "./interfaces";
import { useCookies } from "react-cookie";

const getAllProducts = async () => fetch(`${applicationConfig.BACKEND_HOST}/products`).then(res => res.json())
const getSingleProduct = async (id: string) => fetch(`${applicationConfig.BACKEND_HOST}/products/${id}`).then(res => res.json())
const createProduct = async (data: FormData, token: string) => {
    return await fetch(`${applicationConfig.BACKEND_HOST}/products`, {
        body: data, method: 'POST', headers: { "x-auth-token": token }
    }).then(res => res.json())
}
const updateProduct = async (data: { product: FormData, id: string }, token: string) => {
    return await fetch(`${applicationConfig.BACKEND_HOST}/products/${data.id}`, {
        body: data.product, method: 'PUT', headers: { "x-auth-token": token }
    }).then(res => res.json())
}
const deleteProduct = async (data: { status: string, id: string }, token: string) => {
    return await fetch(`${applicationConfig.BACKEND_HOST}/products/set-status/${data.id}`, {
        body: JSON.stringify({ status: data.status }), method: 'PUT', headers: { 'Content-Type': "application/json", "x-auth-token": token }
    }).then(res => res.json())
}


export const useProducts = () => {
    return useQuery<{ products: Product[] }, Error>({
        queryKey: 'products',
        queryFn: () => getAllProducts()
    })
}

export const useProduct = (id: string) => {
    return useQuery<{ product: Product }, Error>({
        queryKey: ['product', id],
        queryFn: () => getSingleProduct(id ?? id)
    })
}

export const useCreateProductMutation = () => {
    const [cookies] = useCookies(['access_token']);

    const queryClient = useQueryClient()
    const mutation = useMutation((product: FormData) => {
        return createProduct(product, cookies.access_token)
    })

    if (mutation.isSuccess) queryClient.invalidateQueries('products')

    return mutation
}

export const useUpdateProductMutation = () => {
    const [cookies] = useCookies(['access_token']);
    const queryClient = useQueryClient()
    const mutation = useMutation((data: { product: FormData, id: string }) => {
        return updateProduct(data, cookies.access_token)
    })

    if (mutation.isSuccess) queryClient.invalidateQueries('products')

    return mutation
}


export const useDeleteProductMutation = () => {
    const [cookies] = useCookies(['access_token']);
    const queryClient = useQueryClient()
    const mutation = useMutation((id: string) => {
        return deleteProduct({ status: "deleted", id }, cookies.access_token)
    })

    if (mutation.isSuccess) queryClient.invalidateQueries('products')

    return mutation
}