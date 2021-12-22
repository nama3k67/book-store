import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Form, Input, Select, Button } from "antd";

import { setOrderInfoAction } from "../../../../redux/actions";

import * as S from "../styles";

const Information = ({
  setCheckoutStep,
  location,
  renderCartInformation,
  infoValues,
  setInfoValues,
}) => {
  const [infoForm] = Form.useForm();

  const dispatch = useDispatch();

  const [selectedLocation, setSelectedLocation] = useState({
    city: infoValues.city,
    district: infoValues.district,
    ward: infoValues.ward,
  });

  const handleConfirmInformation = (values) => {
    dispatch(
      setOrderInfoAction({
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: `${values.address}, ${
          location.wards.find((ward) => ward.code === values.ward)?.name
        }, ${
          location.districts.find(
            (district) => district.code === values.district
          )?.name
        }, ${location.cities.find((city) => city.code === values.city)?.name}`,
        note: values.note,
      })
    );
    setCheckoutStep(2);
    setInfoValues(values);
  };

  const handleChangeCity = (value) => {
    setSelectedLocation({
      ...selectedLocation,
      city: value,
    });
  };
  const handleChangeDistrict = (value) => {
    setSelectedLocation({
      ...selectedLocation,
      district: value,
    });
  };
  const handleChangeWard = (value) => {
    setSelectedLocation({
      ...selectedLocation,
      ward: value,
    });
  };

  return (
    <Row style={{ width: "100%" }}>
      <Col xs={24} md={24} lg={17}>
        <S.FormWrapper>
          <Form
            form={infoForm}
            name="infoForm"
            layout="vertical"
            initialValues={{ ...infoValues }}
            onFinish={(values) => handleConfirmInformation(values)}
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
                  rules={[{ required: true, message: "Bạn chưa nhập email!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} lg={12}>
                <Form.Item
                  label={<S.FormTitle>Số điện thoại</S.FormTitle>}
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập số điện thoại!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col xs={24} sm={12} lg={8}>
                <Form.Item
                  label={<S.FormTitle>Tỉnh - Thành phố</S.FormTitle>}
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa chọn tỉnh - thành phố!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn tỉnh-thành phố"
                    onChange={handleChangeCity}
                    allowClear
                  >
                    {location.cities.map((city) => (
                      <Select.Option key={city.code} value={city.code}>
                        {city.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Form.Item
                  label={<S.FormTitle>Quận - Huyện</S.FormTitle>}
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa chọn quận huyện!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn quận-huyện"
                    onChange={handleChangeDistrict}
                    allowClear
                  >
                    {location.districts
                      .filter(
                        (district) =>
                          district.parentcode === selectedLocation.city
                      )
                      .map((district) => (
                        <Select.Option
                          key={district.code}
                          value={district.code}
                        >
                          {district.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} lg={8}>
                <Form.Item
                  label={<S.FormTitle>Phường - Xã</S.FormTitle>}
                  name="ward"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa chọn phường xã!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn phường-xã"
                    onChange={handleChangeWard}
                    allowClear
                  >
                    {location.wards
                      .filter(
                        (ward) => ward.parentcode === selectedLocation.district
                      )
                      .map((ward) => (
                        <Select.Option key={ward.code} value={ward.code}>
                          {ward.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label={<S.FormTitle>Địa chỉ cụ thể</S.FormTitle>}
              name="address"
              rules={[
                { required: true, message: "Bạn chưa nhập địa chỉ cụ thể!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={<S.FormTitle>Ghi chú</S.FormTitle>} name="note">
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
            </Form.Item>
          </Form>
        </S.FormWrapper>
      </Col>
      <Col xs={24} md={24} lg={7}>
        {renderCartInformation()}
        <Button
          block
          type="primary"
          size="large"
          onClick={() => infoForm.submit()}
        >
          <p style={{ fontSize: 20, fontWeight: 500 }}>Tiếp tục</p>
        </Button>
      </Col>
    </Row>
  );
};

export default Information;
