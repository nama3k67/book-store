import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import { registerAction } from "../../redux/actions";

import * as S from "./styles";

const RegisterForm = ({ setIsLogin }) => {
  const [defaultValues, setDefaultValues] = useState({});

  const { responseAction } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [registerForm] = Form.useForm();

  useEffect(() => {
    registerForm.resetFields();
  }, [defaultValues]);

  useEffect(() => {
    if (responseAction.register?.error && !responseAction.register.loading) {
      registerForm.setFields([
        {
          name: "email",
          errors: ["E-mail này đã tồn tại !"],
        },
      ]);
      registerForm.resetFields(["password", "confirmPassword"]);
    }
  }, [responseAction.register]);

  const onFinish = (values) => {
    dispatch(
      registerAction({
        data: {
          email: values.email,
          name: values.name,
          password: values.password,
          phoneNumber: "",
          avatar:
            "https://st.quantrimang.com/photos/image/2021/08/16/Anh-vit-cute-6.jpg",
          wishlist: [],
          gender: "",
          role: "user",
        },
        callback: {
          goBackLogin: () => setIsLogin(true),
        },
      })
    );
  };

  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      form={registerForm}
      name="register"
      initialValues={defaultValues}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Email chưa đúng định dạng",
          },
          {
            required: true,
            message: "Bạn chưa nhập E-mail!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="name"
        label="Tên"
        rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: "Bạn chưa nhập mật khẩu!",
          },
          {
            min: 6,
            message: "Mật khẩu phải có ít nhất 6 kí tự!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        rules={[
          {
            required: true,
            message: "Bạn chưa xác nhận mật khẩu!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Mật khẩu xác nhận chưa đúng!"));
            },
          }),
        ]}
        dependencies={["password"]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("Bạn chưa chấp thuận những điều khoản yêu cầu !")
                  ),
          },
        ]}
      >
        <Checkbox>Đồng ý với các điều khoản</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          size="large"
          block
          loading={responseAction.register.loading}
        >
          Đăng ký
        </Button>
        <S.NoteWrapper>
          Bạn đã có tài khoản!{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(true);
            }}
          >
            Đăng nhập thôi 😁
          </a>
        </S.NoteWrapper>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
