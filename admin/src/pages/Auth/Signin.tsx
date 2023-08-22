/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Form, Input, Layout } from "antd";
import { useSigninMutation } from "./requests";

export default function Signin() {
    const { mutate, isLoading, isError, error } = useSigninMutation()

    const submitHandler = (values: any) => {
        mutate({ email: values.email, password: values.password })

        if (isError) {
            console.log(error);
        }
    }

    return (
        <Layout style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card type="inner" style={{ width: '500px' }} title="Sign in">
                <Form onFinish={submitHandler} layout="vertical" >
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required.' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Password is required.' }]}>
                        <Input type="password" />
                    </Form.Item>

                    <Form.Item>
                        <Button style={{ height: "40px", width: '100%', marginTop: '30px' }} loading={isLoading} htmlType="submit" type="primary">Login</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Layout>
    )
}
