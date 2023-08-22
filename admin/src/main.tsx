import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'antd/dist/reset.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie'
import { ConfigProvider, theme } from 'antd';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <CookiesProvider>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                <App />
            </ConfigProvider>
        </QueryClientProvider>,
    </CookiesProvider>
)
