import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Radio, Button } from "antd";

import { updateUserInfoAction } from "../../../../redux/actions";

import * as S from "../styles";

const Information = () => {
  const [infoForm] = Form.useForm();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.authReducer);

  useEffect(() => {
    infoForm.resetFields();
  }, [userInfo.data]);

  const handleSubmitInfo = (values) => {
    dispatch(
      updateUserInfoAction({
        id: userInfo.data.id,
        data: { ...values },
      })
    );
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Thông tin cá nhân</h2>
      <S.FormContainer>
        <Form
          form={infoForm}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ ...userInfo.data }}
          name="infoForm"
          onFinish={(values) => handleSubmitInfo(values)}
        >
          <Form.Item
            label={<S.FormTitle>Họ và tên</S.FormTitle>}
            name="name"
            rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={<S.FormTitle>Giới tính</S.FormTitle>} name="gender">
            <Radio.Group>
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label={<S.FormTitle>Email</S.FormTitle>}
            name="email"
            rules={[{ required: true, message: "Bạn chưa nhập email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<S.FormTitle>Số điện thoại</S.FormTitle>}
            name="phoneNumber"
          >
            <Input />
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

export default Information;
