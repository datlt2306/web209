import { useSignupMutation } from "@/api/auth";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

type FieldType = {
    email?: string;
    password?: string;
};

const Signup: React.FC = () => {
    const [form] = Form.useForm();
    const [signup, { error }] = useSignupMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        signup(values)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Đăng ký thành công",
                });
                navigate("/signin");
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    if (error) {
        messageApi.open({
            type: "error",
            content: error.data,
        });
    }
    return (
        <>
            <header className="mb-4">
                <h2 className="text-2xl">Đăng ký</h2>
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
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Signup;
