import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, generatePath } from "react-router-dom";
import axios from "axios";
import { Steps, Row, Col, Button } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

import TopWrapper from "../../../components/TopWrapper";
import Information from "./components/Information";
import Payment from "./components/Payment";
import Success from "./components/Success";
import { BREADCRUMB } from "./constants";
import { ROUTER } from "../../../constants/router";

import * as S from "./styles";

const CheckoutPage = () => {
  document.title = "Thanh toán";
  const { cartInfo } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.authReducer);

  const [checkoutStep, setCheckoutStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTicket, setTotalTicket] = useState(0);
  const [isExpand, setIsExpand] = useState(false);
  const [infoValues, setInfoValues] = useState({
    fullName: userInfo.data.name,
    email: userInfo.data.email,
    phoneNumber: userInfo.data.phoneNumber,
    city: "",
    district: "",
    ward: "",
    address: "",
  });
  const [location, setLocation] = useState({
    cities: [],
    districts: [],
    wards: [],
  });

  const history = useHistory();
  const { Step } = Steps;

  useEffect(() => {
    setTotalPrice(
      cartInfo.selectedCarts.reduce(
        (total, item) => total + item.product?.price * item.quantity,
        0
      )
    );
    setTotalTicket(
      cartInfo.tickets.reduce((total, item) => total + item.percent, 0)
    );
  }, [cartInfo]);

  useEffect(() => {
    const getLocation = async () => {
      const citiesApi = await axios.get(
        "https://location-api-vn.herokuapp.com/cities"
      );
      const districtsApi = await axios.get(
        "https://location-api-vn.herokuapp.com/districts"
      );
      const wardsApi = await axios.get(
        "https://location-api-vn.herokuapp.com/wards"
      );
      setLocation({
        cities: citiesApi.data,
        districts: districtsApi.data,
        wards: wardsApi.data,
      });
    };
    getLocation();
  }, []);

  const renderSelectedCarts = () => {
    return cartInfo.selectedCarts.map((cartItem) => (
      <Row
        key={cartItem.id}
        align="middle"
        style={{
          width: "100%",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          padding: 8,
        }}
      >
        <Col span={13}>
          <S.ProductName>
            <strong>
              {cartItem.quantity > 9
                ? cartItem.quantity
                : `0${cartItem.quantity}`}
            </strong>{" "}
            x{" "}
            <span
              style={{
                cursor: "pointer",
                color: "rgb(13 92 182)",
              }}
              onClick={() =>
                history.push(
                  generatePath(ROUTER.USER.PRODUCT_DETAIL, {
                    id: cartItem.productId,
                  })
                )
              }
            >
              {cartItem.product?.name}
            </span>
          </S.ProductName>
        </Col>
        <Col span={3} />
        <Col span={8} style={{ textAlign: "end", fontSize: 15 }}>
          {(cartItem.quantity * cartItem.product?.price).toLocaleString()}
          &nbsp;₫
        </Col>
      </Row>
    ));
  };

  const renderCartInformation = () => {
    return (
      <>
        <S.SectionLabelWrapper>
          <S.SectionTitle>Đơn hàng</S.SectionTitle>
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
            <S.InformationTitle>
              <span style={{ fontSize: 17, fontWeight: 600 }}>
                {cartInfo.selectedCarts.length} sản phẩm.
              </span>
              {isExpand ? (
                <S.ExpandSwitch onClick={() => setIsExpand(false)}>
                  Thu gọn <CaretUpOutlined style={{ fontSize: 12 }} />
                </S.ExpandSwitch>
              ) : (
                <S.ExpandSwitch onClick={() => setIsExpand(true)}>
                  Xem thông tin <CaretDownOutlined style={{ fontSize: 12 }} />
                </S.ExpandSwitch>
              )}
            </S.InformationTitle>
            <Button type="ghost" onClick={() => history.push(ROUTER.USER.CART)}>
              Sửa
            </Button>
          </Row>
          {isExpand && renderSelectedCarts()}
          <Row align="middle" style={{ width: "100%", padding: 5 }}>
            <Col span={13} style={{ fontSize: 16 }}>
              Tạm tính
            </Col>
            <Col span={3} />
            <Col
              span={8}
              style={{ textAlign: "end", fontWeight: 600, fontSize: 16 }}
            >
              {totalPrice.toLocaleString()}&nbsp;₫
            </Col>
            <Col span={13} style={{ fontSize: 16 }}>
              Giảm giá ({totalTicket * 100}%)
            </Col>
            <Col span={3} />
            <Col
              span={8}
              style={{ textAlign: "end", fontWeight: 600, fontSize: 16 }}
            >
              -{(totalPrice * totalTicket).toLocaleString()}&nbsp;₫
            </Col>
            <Col
              span={13}
              style={{ paddingTop: 10, fontSize: 16, fontWeight: 500 }}
            >
              Thành tiền
            </Col>
            <Col span={3} />
            <Col
              span={8}
              style={{
                textAlign: "end",
                paddingTop: 10,
                fontWeight: 600,
                fontSize: 18,
                color: "red",
              }}
            >
              {(totalPrice * (1 - totalTicket)).toLocaleString()}&nbsp;₫
            </Col>
          </Row>
        </S.InformationWrapper>
      </>
    );
  };
  return (
    <>
      <TopWrapper breadcrumb={[...BREADCRUMB]} titlePage="Thanh toán" />
      <S.CheckoutContainer>
        <S.CheckoutWrapper>
          <S.CheckoutHeader>
            <Steps current={checkoutStep}>
              <Step title={<S.StepTitle>Đăng nhập</S.StepTitle>} />
              <Step title={<S.StepTitle>Thông tin</S.StepTitle>} />
              <Step title={<S.StepTitle>Thanh toán</S.StepTitle>} />
              <Step title={<S.StepTitle>Hoàn tất</S.StepTitle>} />
            </Steps>
          </S.CheckoutHeader>
          {checkoutStep === 1 && (
            <Information
              setCheckoutStep={setCheckoutStep}
              location={location}
              renderCartInformation={renderCartInformation}
              infoValues={infoValues}
              setInfoValues={setInfoValues}
            />
          )}
          {checkoutStep === 2 && (
            <Payment
              setCheckoutStep={setCheckoutStep}
              totalPrice={totalPrice}
              totalTicket={totalTicket}
              cartInfo={cartInfo}
              renderCartInformation={renderCartInformation}
            />
          )}
          {checkoutStep === 3 && <Success setCheckoutStep={setCheckoutStep} />}
        </S.CheckoutWrapper>
      </S.CheckoutContainer>
    </>
  );
};

export default CheckoutPage;
