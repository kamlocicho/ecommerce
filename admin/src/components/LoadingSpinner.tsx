import React from 'react';
import { Space, Spin } from 'antd';

const LoadingSpinner: React.FC = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
            <Spin tip="Loading" size="large">
                <div style={{ padding: '50px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '4px' }} />
            </Spin>
        </Space>
    </Space>
);

export default LoadingSpinner;
