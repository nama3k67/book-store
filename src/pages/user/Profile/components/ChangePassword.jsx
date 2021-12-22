import React from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LockOutlined } from "@ant-design/icons";

import { changePasswordAction } from "../../../../redux/actions";

import * as S from "../styles";

const ChangePassword = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  const [changePasswordForm] = Form.useForm();
  const dispatch = useDispatch();

  const handleChangePassword = (values) => {
    dispatch(
      changePasswordAction({
        id: userInfo.data.id,
        data: {
          ...values,
          email: userInfo.data.email,
        },
        callback: {
          clearForm: () => changePasswordForm.resetFields(),
        },
      })
    );
  };
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Thay đổi mật khẩu</h2>
      <S.FormContainer>
        <Form
          form={changePasswordForm}
          layout="vertical"
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          name="infoForm"
          onFinish={(values) => handleChangePassword(values)}
        >
          <Form.Item
            label={<S.FormTitle>Mật khẩu cũ</S.FormTitle>}
            name="oldPassword"
            rules={[{ required: true, message: "Bạn chưa nhập mật khẩu cũ!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label={<S.FormTitle>Mật khẩu mới</S.FormTitle>}
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập mật khẩu mới!",
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
            label={<S.FormTitle>Xác nhận mật khẩu</S.FormTitle>}
            rules={[
              {
                required: true,
                message: "Bạn chưa xác nhận mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Mật khẩu xác nhận chưa đúng!")
                  );
                },
              }),
            ]}
            dependencies={["newPassword"]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
            <Button
              size="large"
              type="primary"
              className="login-form-button"
              htmlType="submit"
              loading={userInfo.loading}
              style={{ transform: "translateX(-50%)" }}
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </S.FormContainer>
    </>
  );
};

export default ChangePassword;
