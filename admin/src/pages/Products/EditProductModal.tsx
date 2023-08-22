/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Form, FormInstance, Input, Modal, Select } from "antd";
import { useUpdateProductMutation } from "./requests";
import React, { useState, ChangeEvent } from 'react'
import { Product } from "./interfaces";

type Props = {
    closeModal: () => void;
    open: boolean;
    product: Product | null;
}

export default function EditProductModal({ closeModal, open, product }: Props) {
    const formRef = React.useRef<FormInstance>(null);
    const [file, setFile] = useState<File>()

    const { mutate, isLoading, isError, isSuccess, error } = useUpdateProductMutation()


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const cancelHandler = () => {
        formRef.current?.resetFields()
        closeModal()
    }

    const submitHandler = (values: any) => {
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("inStock", values.inStock)
        console.log(file);
        if (file) {
            formData.append("media", file)
        }
        formData.append("price", values.price)
        formData.append("status", values.status)

        mutate({ product: formData, id: product?._id ? product?._id : '' });

        if (isError) {
            console.log(error);
        }

        if (isSuccess) {
            formRef.current?.resetFields()
        }
        closeModal()
    }

    return (
        <Modal title={"Add Product"} open={open} onCancel={cancelHandler} footer={null}>
            <Form ref={formRef} initialValues={product ? { ...product, media: '' } : {}} onFinish={submitHandler} name="Create product" autoComplete="off" layout="vertical">
                <Form.Item label="Title" name={'title'} rules={[{ required: true, message: 'Please input Product title!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'inStock'} valuePropName="checked">
                    <Checkbox>Is in stock</Checkbox>
                </Form.Item>
                <Form.Item label="Description" name={'description'}>
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item label="Media" name={'media'}>
                    <input type='file' onChange={handleFileChange} />
                </Form.Item>
                <Form.Item label="Price" name={'price'} rules={[{ required: true, message: 'Please input Price!' }]}>
                    <Input type='number' />
                </Form.Item>
                <Form.Item label="Status" name={'status'}>
                    <Select
                        options={[
                            { value: 'active', label: 'Active' },
                            { value: 'unactive', label: 'Unactive' },
                        ]}
                    />
                </Form.Item>

                <div style={{ display: 'flex', gap: 5 }}>
                    <Form.Item>
                        <Button onClick={cancelHandler}>Cancel</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" loading={isLoading} htmlType="submit">Submit</Button>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}
