/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from "react-query"
import applicationConfig from "../../config/applicationConfig"
import { useAuthStore } from "../../store/AuthStore"
import { useCookies } from 'react-cookie'
import { message } from "antd"

const signin = async (data: { email: string, password: string }) => {
    return await fetch(`${applicationConfig.BACKEND_HOST}/auth/signin`, {
        body: JSON.stringify(data), method: 'POST', headers: { 'Content-Type': "application/json" }
    }).then(res => res.json())
}

export const useSigninMutation = () => {
    const { setIsAuthenticated } = useAuthStore()
    const [_, setCookie] = useCookies(['access_token']);


    return useMutation(
        {
            mutationFn: (data: { email: string, password: string }) => {
                return signin(data)
            },
            onSuccess(data) {
                if (data.success) {
                    setCookie('access_token', data.token)
                    setIsAuthenticated(true)
                    message.success("Logged in.")
                } else {
                    message.warning(data.message)
                }
            }
        },
    )
}