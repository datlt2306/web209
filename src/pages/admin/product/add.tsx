import { useAddProductMutation } from "@/api/product";
import { Button, Form, Input, InputNumber, message } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";

type FieldType = {
    name?: string;
    price?: number;
};

const AdminProductAdd: React.FC = () => {
    const [form] = Form.useForm();
    const [addProduct] = useAddProductMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        addProduct(values)
            .unwrap()
            .then(() =>
                messageApi.open({
                    type: "success",
                    content: "Thêm sản phẩm thành công",
                })
            );
        form.resetFields();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <>
            <header className="mb-4">
                <h2 className="text-2xl">Thêm sản phẩm</h2>
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
                        Thêm sản phẩm
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

export default AdminProductAdd;
