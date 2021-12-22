import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import { ROUTER } from "../../constants/router";
import { loginAction } from "../../redux/actions";

import * as S from "./styles";

const LoginForm = ({ setIsLogin }) => {
  const history = useHistory();
  const [loginForm] = Form.useForm();

  const rememberedUserInfo = JSON.parse(
    localStorage.getItem("rememberedUserInfo")
  );
  const [isRemembered, setIsRemembered] = useState(
    rememberedUserInfo ? true : false
  );

  const { responseAction } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (responseAction.login.error && !responseAction.login.loading) {
      if (responseAction.login.error === "Cannot find user") {
        loginForm.setFields([
          {
            name: "email",
            errors: ["Email này chưa được đăng ký !"],
          },
        ]);
      } else if (responseAction.login.error === "Incorrect password") {
        loginForm.setFields([
          {
            name: "password",
            errors: ["Mật khẩu không đúng !"],
          },
        ]);
      }
    }
  }, [responseAction.login]);

  const onFinish = (values) => {
    if (isRemembered) {
      localStorage.setItem(
        "rememberedUserInfo",
        JSON.stringify({
          email: values.email,
          password: values.password,
        })
      );
    } else {
      localStorage.removeItem("rememberedUserInfo");
    }
    dispatch(
      loginAction({
        data: {
          email: values.email,
          password: values.password,
        },
        callback: {
          redirectHome: () => history.push(ROUTER.USER.HOME),
        },
      })
    );
  };

  return (
    <Form
      name="login-form"
      form={loginForm}
      initialValues={rememberedUserInfo}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        label="Email"
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
        name="password"
        label="Mật khẩu"
        rules={[{ required: true, message: "Bạn chưa nhập mật khẩu!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" noStyle>
          <Checkbox
            checked={isRemembered}
            onChange={(e) => setIsRemembered(e.target.checked)}
          >
            Ghi nhớ tài khoản
          </Checkbox>
          {/* <a href="#" className="login-form-forgot">
            
          </a> */}
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block
          size="large"
          loading={responseAction.login.loading}
        >
          Đăng nhập
        </Button>
        <S.NoteWrapper>
          Bạn chưa có tài khoản!{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(false);
            }}
          >
            Đăng ký nào 😊
          </a>
        </S.NoteWrapper>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
