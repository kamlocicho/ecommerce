/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { ExportOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, MenuProps, Space, Tooltip } from 'antd';
import routes, { Route } from '../config/routes';
import { useLocation, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { useAuthStore } from '../store/AuthStore';

const { Header, Sider, Content } = Layout;

const sideBarRoutes = routes.filter(route => route.showInSidebar == true)

const AuthLayout: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const { setIsAuthenticated } = useAuthStore()
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key == 'home') return navigate('')
        navigate('/' + e.key)
    }

    const logoutHandler = () => {
        removeCookie('access_token')
        setIsAuthenticated(false)
        navigate('/')
    }

    return (
        <Layout style={{ minHeight: '100vh', height: '100%' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    mode="inline"
                    style={{ height: "100%" }}
                    defaultSelectedKeys={[location.pathname.split('/')[1] == '' ? 'home' : location.pathname.split('/')[1]]}
                    items={
                        sideBarRoutes.map((route: Route) => ({
                            key: route.id,
                            icon: route.icon,
                            label: route.name
                        }))
                    }
                    onClick={onClick}
                />
            </Sider>
            <Layout>
                <Header style={{
                    padding: 0,
                    backgroundColor: '#141414',
                    color: 'rgba(255, 255, 255, 0.85)'
                }}>
                    <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                        <Tooltip title={collapsed ? "Open menu" : "Minimize menu"}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Tooltip>
                        <Space>
                            <Tooltip title="Logout">
                                <Button type='text'
                                    onClick={logoutHandler}
                                    icon={<ExportOutlined />}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                    }} />
                            </Tooltip>
                            <Button type='text'
                                icon={<UserOutlined />}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }} />
                        </Space>
                    </Space>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AuthLayout;
