import { HomeOutlined, ShoppingCartOutlined, ShoppingOutlined, DeploymentUnitOutlined, SettingOutlined } from '@ant-design/icons'
import Home from '../pages/Home';
import Orders from '../pages/Orders';
import Products from '../pages/Products/Products';
import Integrations from '../pages/Integrations';
import Settings from '../pages/Settings';
import Signin from '../pages/Auth/Signin';

export type Route = {
    name: string;
    path: string;
    id: string;
    element: JSX.Element | JSX.Element[] | string | string[];
    showInSidebar?: boolean;
    icon?: JSX.Element;
};

const routes: Array<Route> = [
    {
        name: "Home",
        id: "home",
        path: "/",
        element: <Home />,
        showInSidebar: true,
        icon: <HomeOutlined style={{ fontSize: '16px' }} />
    },
    {
        name: "Orders",
        id: "orders",
        path: "/orders",
        element: <Orders />,
        showInSidebar: true,
        icon: <ShoppingCartOutlined style={{ fontSize: '16px' }} />
    },
    {
        name: "Products",
        id: "products",
        path: "/products",
        element: <Products />,
        showInSidebar: true,
        icon: <ShoppingOutlined style={{ fontSize: '16px' }} />
    },
    {
        name: "Integrations",
        id: "integrations",
        path: "/integrations",
        element: <Integrations />,
        showInSidebar: true,
        icon: <DeploymentUnitOutlined style={{ fontSize: '16px' }} />
    },
    {
        name: "Settings",
        id: "settings",
        path: "/settings",
        element: <Settings />,
        showInSidebar: true,
        icon: <SettingOutlined style={{ fontSize: '16px' }} />
    },
];

export const unauthRoutes: Array<Route> = [
    {
        name: "Signin",
        id: "signin",
        path: "/",
        element: <Signin />,
    },
]

export default routes;
