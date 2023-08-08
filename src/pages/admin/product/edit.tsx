import {
    useAddProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from "@/api/product";
import { Button, Form, Input, InputNumber, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

type FieldType = {
    name?: string;
    price?: number;
};

const AdminProductEdit: React.FC = () => {
    const [form] = Form.useForm();
    const [updateProduct] = useUpdateProductMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const { idProduct } = useParams<{ idProduct: string }>();

    const { data: productData } = useGetProductByIdQuery(idProduct || "");

    useEffect(() => {
        form.setFieldsValue(productData);
    }, [productData]);

    const onFinish = (values: any) => {
        updateProduct({ ...values, id: idProduct })
            .unwrap()
            .then(() =>
                messageApi.open({
                    type: "success",
                    content: "Cập nhật sản phẩm thành công",
                })
            );
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <>
            <header className="mb-4">
                <h2 className="text-2xl">Cập nhật sản phẩm</h2>
            </header>
            {contextHolder}
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                        { required: true, message: "Nhập tên sản phẩm" },
                        { min: 3, message: "ít nhất 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Giá sản phẩm"
                    name="price"
                    rules={[{ required: true, message: "Nhập giá sản phẩm" }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        Cập nhật
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => navigate("/admin/product")}
                        className="ml-2"
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AdminProductEdit;
