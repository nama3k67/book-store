import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Radio,
  Space,
  Modal,
  notification,
} from "antd";
import { BulbOutlined, CreditCardOutlined } from "@ant-design/icons";

import { orderCartAction } from "../../../../../redux/actions";
import { PAYMENT_TYPE, CARD_GROUP } from "../../constants";
import PaypalButton from "./PaypalButton";

import giaohangnhanhImg from "../../../../../assets/images/giaohangnhanh.png";
import giaohangtietkiemImg from "../../../../../assets/images/giaohangtietkiem.png";

import * as S from "../../styles";

const Payment = ({
  setCheckoutStep,
  totalPrice,
  totalTicket,
  cartInfo,
  renderCartInformation,
}) => {
  const { orderInfo } = useSelector((state) => state.orderReducer);
  const { userInfo } = useSelector((state) => state.authReducer);

  const [paymentForm] = Form.useForm();
  const [cardPaymentForm] = Form.useForm();

  const [activeRadio, setActiveRadio] = useState(0);
  const [activeCard, setActiveCard] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [paid, setPaid] = useState(false);

  const dispatch = useDispatch();

  const handleOk = () => {
    cardPaymentForm.submit();
  };
  const handleCancel = () => {
    setVisible(false);
    cardPaymentForm.resetFields();
  };

  const renderPaymentType = () => {
    return PAYMENT_TYPE.map((item, index) => (
      <Radio
        value={item.code}
        key={item.code}
        onChange={() => setActiveRadio(index)}
      >
        <S.ImageWrapper src={item.imageSrc} alt="giao hang nhanh logo" />
        {item.name}
        {item.type === "paypal" && (
          <S.PaymentMethodContent active={activeRadio === index}>
            <PaypalButton total={totalPrice} />
          </S.PaymentMethodContent>
        )}
        {item.type === "card" && (
          <>
            <S.PaymentMethodContent
              style={{ border: "1px dashed rgba(67, 113, 93, 0.4)" }}
              active={activeRadio === index}
            >
              <Button
                style={{ display: "block", margin: "0 auto 12px" }}
                type="primary"
                onClick={() => {
                  if (activeCard === -1) {
                    notification.error({
                      message: "B???n ch??a ch???n th??? thanh to??n!",
                    });
                  } else {
                    setVisible(true);
                  }
                }}
              >
                Thanh to??n
              </Button>
              <Modal
                visible={visible}
                title={
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p>Ng??n h??ng {CARD_GROUP[activeCard]?.name}</p>
                    <S.ImageWrapper
                      src={CARD_GROUP[activeCard]?.src}
                      alt={CARD_GROUP[activeCard]?.name}
                    />
                  </div>
                }
                closable={false}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button
                    key="back"
                    type="danger"
                    size="large"
                    ghost
                    onClick={handleCancel}
                  >
                    H???y giao d???ch
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    size="large"
                    onClick={() => cardPaymentForm.submit()}
                    style={{ margin: "8px 0 8px 16px" }}
                  >
                    Thanh to??n {totalPrice.toLocaleString()}???
                  </Button>,
                ]}
              >
                <Form
                  name="cardPayment"
                  form={cardPaymentForm}
                  layout="vertical"
                  initialValues={{
                    cardNumber: "",
                    cardName: "",
                    releaseDate: "",
                  }}
                  onFinish={() => {
                    setPaid(true);
                    setVisible(false);
                    cardPaymentForm.resetFields();
                    notification.success({
                      message: "Ch??c m???ng b???n ???? thanh to??n th??nh c??ng ????",
                    });
                  }}
                >
                  <Form.Item
                    label="S??? th???"
                    name="cardNumber"
                    rules={[
                      { required: true, message: "B???n ch??a nh???p s??? th???!" },
                    ]}
                  >
                    <Input
                      placeholder="Nh???p s??? th???"
                      suffix={
                        <CreditCardOutlined className="site-form-item-icon" />
                      }
                      size="large"
                    />
                  </Form.Item>
                  <Row gutter={8}>
                    <Col xs={24} sm={16}>
                      <Form.Item
                        label="T??n in tr??n th???"
                        name="cardName"
                        rules={[
                          {
                            required: true,
                            message: "B???n ch??a nh???p t??n in tr??n th???!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Nh???p t??n in tr??n th???"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Form.Item
                        label="Ng??y ph??t h??nh"
                        name="releaseDate"
                        rules={[
                          {
                            required: true,
                            message: "B???n ch??a nh???p ng??y ph??t h??nh!",
                          },
                        ]}
                      >
                        <Input placeholder="mm/yy" size="large" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Modal>
              <Row justify="center" gutter={[16, 16]}>
                {renderCardGroup()}
              </Row>
            </S.PaymentMethodContent>
          </>
        )}
      </Radio>
    ));
  };

  const renderCardGroup = () => {
    return CARD_GROUP.map((cardItem, cardIndex) => (
      <Col key={cardIndex}>
        <S.CardWrapper
          active={cardIndex === activeCard}
          onClick={() => setActiveCard(cardIndex)}
        >
          <img src={cardItem.src} alt={`card_${cardIndex}`} />
          {cardItem.name}
          <S.ActiveCircle active={cardIndex === activeCard} />
        </S.CardWrapper>
      </Col>
    ));
  };

  const handleConfirmPayment = (values) => {
    if (values.paymentType === "cod" || paid === true) {
      const newValues = {
        ...orderInfo,
        ...values,
        userId: userInfo.data.id,
        products: cartInfo.selectedCarts.map((cartItem) => {
          return {
            id: cartItem.product?.id,
            cartId: cartItem.id,
            name: cartItem.product?.name,
            price: cartItem.product?.price,
            quantity: cartItem.quantity,
            image: cartItem.productImage,
          };
        }),
        totalPrice: totalPrice * (1 - totalTicket),
        totalTicket,
      };
      dispatch(
        orderCartAction({
          data: newValues,
          callback: {
            success: () => setCheckoutStep(3),
          },
        })
      );
    } else {
      notification.warning({
        message: "B???n ch??a ho??n th??nh th??? t???c thanh to??n!",
      });
    }
  };

  return (
    <Row style={{ width: "100%" }}>
      <Col xs={24} md={24} xl={17}>
        <Form
          form={paymentForm}
          name="paymentForm"
          layout="vertical"
          initialValues={{ shipper: "giaohangnhanh", paymentType: "cod" }}
          onFinish={(values) => handleConfirmPayment(values)}
        >
          <S.FormWrapper>
            <S.LabelTitle>1. H??nh th???c giao h??ng</S.LabelTitle>
            <Row>
              <S.RatioGroupWrapper xs={24} sm={24} md={12}>
                <Form.Item
                  name="shipper"
                  rules={[
                    {
                      require: true,
                      message: "B???n ph???i ch???n h??nh th???c giao h??ng!",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Space
                      direction="vertical"
                      style={{ paddingLeft: 10, textAlign: "start" }}
                    >
                      <Radio value="giaohangnhanh">
                        <S.ImageWrapper
                          src={giaohangnhanhImg}
                          alt="giao hang nhanh logo"
                        />
                        <S.RadioTitle> C??ng ty giao h??ng nhanh</S.RadioTitle>
                        <S.DescriptionWrapper>
                          &lt;Trong v??ng 1-2 ng??y{" "}
                          <span style={{ color: "#c01e1e" }}>&& </span>25,000??? /
                          1kg &gt;
                        </S.DescriptionWrapper>
                      </Radio>

                      <Radio value="giaohangtietkiem">
                        <S.ImageWrapper
                          src={giaohangtietkiemImg}
                          alt="giao hang nhanh logo"
                        />
                        <S.RadioTitle>C??ng ty giao h??ng ti???t ki???m</S.RadioTitle>
                        <S.DescriptionWrapper>
                          &lt;Trong v??ng 7 ng??y{" "}
                          <span style={{ color: "#c01e1e" }}>&& </span> Mi???n
                          ph??&gt;
                        </S.DescriptionWrapper>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </S.RatioGroupWrapper>
              <Col xs={0} sm={0} md={12}>
                <S.TransportMethodWrapper>
                  <S.FirstMethodTitle>Th???i gian giao h??ng</S.FirstMethodTitle>
                  <S.SecondMethodTitle>Ph?? v???n chuy???n</S.SecondMethodTitle>

                  <S.FirstOneContent>
                    T??? 1-2 ng??y k??? t??? khi nh???n ????n h??ng
                  </S.FirstOneContent>
                  <S.SecondOneContent>
                    Trong v??ng 7 ng??y k??? t??? khi nh???n ????n h??ng
                  </S.SecondOneContent>
                  <S.FirstTwoContent>25,000??? / 1kg</S.FirstTwoContent>
                  <S.SecondTwoContent> Mi???n ph??</S.SecondTwoContent>
                </S.TransportMethodWrapper>
              </Col>
            </Row>

            <div
              style={{
                marginTop: 20,
                backgroundColor: "#dfece6",
                borderRadius: 10,
                padding: "6px 14px",
              }}
            >
              <p style={{ color: "#c01e1e", fontWeight: 600, fontSize: 15 }}>
                <BulbOutlined />
                L??u ??:
              </p>{" "}
              - Ph?? v???n chuy???n (n???u c??) s??? ???????c ????n v??? v???n chuy???n t??nh ri??ng sau
              khi ???? x??c ?????nh kh???i l?????ng c???a s???n ph???m
            </div>
            <S.LabelTitle style={{ marginTop: 24 }}>
              2. Ph????ng th???c thanh to??n
            </S.LabelTitle>
            <Form.Item
              name="paymentType"
              rules={[
                {
                  require: true,
                  message: "B???n ph???i ch???n ph????ng th???c thanh to??n!",
                },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical" style={{ paddingLeft: 10 }}>
                  {renderPaymentType()}
                </Space>
              </Radio.Group>
            </Form.Item>
          </S.FormWrapper>
        </Form>
      </Col>
      <Col xs={24} md={24} xl={7}>
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={24} md={12} xl={24}>
            <S.SectionLabelWrapper>
              <S.SectionTitle>Th??ng tin</S.SectionTitle>
            </S.SectionLabelWrapper>
            <S.InformationWrapper>
              <Row
                justify="space-between"
                align="middle"
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                  paddingBottom: 8,
                  paddingTop: 8,
                }}
              >
                <span style={{ fontSize: 20 }}>{orderInfo.fullName}</span>
                <Button type="ghost" onClick={() => setCheckoutStep(1)}>
                  S???a
                </Button>
              </Row>
              <Row gutter={[0, 8]} style={{ width: "100%", padding: 5 }}>
                <Col span={8}>?????a ch???:</Col>
                <Col span={16}>{orderInfo.address}</Col>
                <Col span={8}>S??? ??i???n tho???i:</Col>
                <Col span={16}>{orderInfo.phoneNumber}</Col>
                <Col span={8}>Email:</Col>
                <Col span={16}>{orderInfo.email}</Col>
                {orderInfo.note && (
                  <>
                    <Col span={8}>Ghi ch??:</Col>
                    <Col span={16}>{orderInfo.note}</Col>
                  </>
                )}
              </Row>
            </S.InformationWrapper>
          </Col>
          <Col xs={24} sm={24} md={12} xl={24}>
            {renderCartInformation()}
            <Button
              block
              type="danger"
              size="large"
              onClick={() => paymentForm.submit()}
            >
              <p style={{ fontSize: 20, fontWeight: 500 }}>?????t h??ng</p>
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Payment;
