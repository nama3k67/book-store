import React from "react";
import { Row, Col, Button, Form, Input, notification } from "antd";

import TopWrapper from "../../../components/TopWrapper";
import { BREADCRUMB, CONTACT_LIST } from "./constants";

import * as S from "./styles";

const Contact = () => {
  const renderContactList = () => {
    return CONTACT_LIST.map((contactItem, contactIndex) => (
      <S.ContactItemWrapper key={contactIndex} xs={24} sm={24} md={12} lg={24}>
        <Button
          style={{
            color: "white",
            backgroundColor: "transparent",
            marginRight: 16,
          }}
          shape="circle"
          icon={contactItem.icon}
        />

        <span>{contactItem.content}</span>
      </S.ContactItemWrapper>
    ));
  };

  return (
    <>
      <TopWrapper breadcrumb={[...BREADCRUMB]} titlePage={"Liên hệ"} />
      <S.ContactContainer>
        <S.ContactWrapper>
          <Row>
            <S.LeftSectionContainer
              xs={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              lg={{ span: 9, order: 1 }}
            >
              <S.TitleSection>Thông tin liên hệ</S.TitleSection>
              <p>
                Bookworm luôn luôn mong bạn sẽ kết nối với chúng mình để cùng
                nhau tạo nên một cộng đồng tuyệt vời nhé 😊
              </p>
              <Row>{renderContactList()}</Row>
            </S.LeftSectionContainer>
            <S.RightSectionContainer
              xs={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              lg={{ span: 15, order: 2 }}
            >
              <S.TitleSection>Gửi liên hệ</S.TitleSection>
              <Form
                name="infoForm"
                layout="vertical"
                onFinish={() =>
                  notification.success({
                    message: "Bạn đã gửi thông tin liên hệ thành công 🎉",
                  })
                }
              >
                <Form.Item
                  label={<S.FormTitle>Họ và tên</S.FormTitle>}
                  name="fullName"
                  rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
                >
                  <Input />
                </Form.Item>
                <Row gutter={24}>
                  <Col xs={24} sm={24} lg={12}>
                    <Form.Item
                      label={<S.FormTitle>Email</S.FormTitle>}
                      name="email"
                      rules={[
                        { required: true, message: "Bạn chưa nhập email!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} lg={12}>
                    <Form.Item
                      label={<S.FormTitle>Số điện thoại</S.FormTitle>}
                      name="phoneNumber"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label={<S.FormTitle>Tiêu đề</S.FormTitle>}
                  name="address"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<S.FormTitle>Nội dung</S.FormTitle>}
                  name="note"
                >
                  <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
                  <Button
                    size="large"
                    type="primary"
                    className="login-form-button"
                    htmlType="submit"
                    style={{ transform: "translateX(-50%)" }}
                  >
                    Gửi liên hệ
                  </Button>
                </Form.Item>
              </Form>
            </S.RightSectionContainer>
          </Row>
        </S.ContactWrapper>
      </S.ContactContainer>
    </>
  );
};

export default Contact;
