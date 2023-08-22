import { BrowserRouter, Routes, Route } from "react-router-dom"
import configRoutes, { unauthRoutes } from "./config/routes"
import AuthLayout from "./components/Layout"
import { useEffect } from 'react'
import { useCookies } from "react-cookie"
import { useAuthStore } from "./store/AuthStore"

function App() {
    const [cookies] = useCookies(['access_token']);
    const { isAuthenticated, setIsAuthenticated } = useAuthStore()

    useEffect(() => {
        if (cookies.access_token) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }, [cookies.access_token, setIsAuthenticated])



    return (
        <BrowserRouter>
            {isAuthenticated ? <AuthLayout>
                <Routes>
                    {configRoutes.map(route => (
                        <Route path={route.path} key={route.id} element={route.element} />
                    ))}
                </Routes>
            </AuthLayout> :
                <Routes>
                    {unauthRoutes.map(route => (
                        <Route path={route.path} key={route.id} element={route.element} />
                    ))}
                </Routes>
            }
        </BrowserRouter>
    )
}

export default App
