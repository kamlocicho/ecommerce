/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Result, Space, Table, Tag, Tooltip } from "antd"
import { useDeleteProductMutation, useProducts } from "./requests";
import { CheckCircleFilled, CloseCircleFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from 'react'
import NewProductModal from "./NewProductModal";
import EditProductModal from "./EditProductModal";
import { Product } from "./interfaces";

export default function Products() {
    const [isNewProductOpen, setIsNewProductOpen] = useState<boolean>(false)

    const [isEditProductOpen, setIsEditProductOpen] = useState<boolean>(false)
    const [openProduct, setOpenProduct] = useState<Product | null>(null)

    const { data, isLoading, isError } = useProducts()
    const deleteProduct = useDeleteProductMutation()

    const handleOpenEditProduct = (p: Product) => {
        setIsEditProductOpen(true)
        setOpenProduct(p)
    }
    const handleCloseEditProduct = () => {
        setIsEditProductOpen(false)
        setOpenProduct(null)
    }

    const handleDeleteProduct = (id: string) => {
        deleteProduct.mutate(id)
    }

    const columns = useColumns(handleOpenEditProduct, handleDeleteProduct)

    if (isError) {
        return (
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary" href="/">Back Home</Button>} />
        )
    }

    return (
        <Card title="Products" extra={<Button onClick={() => setIsNewProductOpen(true)} type="primary">Add product</Button>}>
            <NewProductModal closeModal={() => setIsNewProductOpen(false)} open={isNewProductOpen} />
            <EditProductModal closeModal={handleCloseEditProduct} open={isEditProductOpen} product={openProduct} />
            <Table rowKey={prod => prod._id} loading={isLoading} columns={columns} dataSource={data?.products} />
        </Card>
    )
}


const useColumns = (handleOpenEditProduct: any, handleDeleteProduct: any) => {
    return [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'In Stock',
            dataIndex: 'inStock',
            key: 'inStock',
            render: (a: boolean) => (
                a ? <CheckCircleFilled style={{ color: 'green', fontSize: '24px' }} /> : <CloseCircleFilled style={{ color: 'red', fontSize: '24px' }} />
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (a: string) => (
                a == 'active' ? <Tag color='green'>{a}</Tag> : <Tag color="red">{a}</Tag>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            render: (_: any, b: Product) => (
                <Space style={{ rowGap: 5 }}>
                    <Tooltip title='Edit product'>
                        <Button onClick={() => handleOpenEditProduct(b)} icon={<EditOutlined />} />
                    </Tooltip>

                    <Tooltip title='Remove product'>
                        <Button onClick={() => handleDeleteProduct(b._id)} danger icon={<DeleteOutlined />} />
                    </Tooltip>
                </Space>
            )
        }
    ]
}