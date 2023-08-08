import { useSigninMutation } from "@/api/auth";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

type FieldType = {
    email?: string;
    password?: string;
};

const Signin: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [signin, { error }] = useSigninMutation();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        signin(values)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Đăng nhập thành công",
                });
                navigate("/");
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    if (error) {
        if ("data" in error) {
            messageApi.open({
                type: "error",
                content: error?.data,
            });
        }
    }
    return (
        <>
            <header className="mb-4">
                <h2 className="text-2xl">Đăng nhập</h2>
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
                    label="Email của bạn"
                    name="email"
                    rules={[
                        { required: true, message: "Nhập email" },
                        { type: "email", message: "Không đúng định dạng email" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: "Nhập mật khẩu" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Signin;
