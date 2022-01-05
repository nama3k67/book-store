import React, { useEffect, useState } from "react";
import { Table, Tag, Image, Button, Modal, Empty } from "antd";
import {
  FileTextOutlined,
  QrcodeOutlined,
  ShopOutlined,
  GiftOutlined,
  CalculatorOutlined,
  RocketOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, generatePath } from "react-router-dom";

import { getOrderListAction } from "../../../../redux/actions";
import { ROUTER } from "../../../../constants/router";

import * as S from "../styles";

const OrderHistory = () => {
  const { userInfo } = useSelector((state) => state.authReducer);
  const { orderList } = useSelector((state) => state.orderReducer);

  const dispatch = useDispatch();
  const history = useHistory();

  const [currentOrder, setCurrentOrder] = useState({});
  const [visible, setVisible] = useState(false);

  const renderOrderId = (id) => {
    if (id) {
      let idString = "" + id;
      const zeroLength = 5 - idString.length;
      idString = "0".repeat(zeroLength) + idString;
      return idString;
    }
  };

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderListAction({ id: userInfo.data.id }));
    }
  }, [userInfo.data]);

  const orderColumnsVer1 = [
    {
      title: <S.TableTitle>Mã đơn hàng</S.TableTitle>,
      dataIndex: "id",
      key: "id",
      width: "12%",
      render: (item) => {
        let itemString = "" + item;
        const zeroLength = 5 - itemString.length;
        itemString = "0".repeat(zeroLength) + itemString;
        return <p style={{ color: "#f78c0d" }}>{itemString}</p>;
      },
    },
    {
      title: <S.TableTitle>Ngày mua</S.TableTitle>,
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (item) => moment(item).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: <S.TableTitle>Tên sản phẩm</S.TableTitle>,
      dataIndex: "productCount",
      key: "productCount",
      width: "25%",
      render: (_, record) =>
        record.products.map((item) => (
          <>
            <span style={{ color: "#43715d", fontWeight: 500 }}>
              {item.name}
            </span>{" "}
            x {item.quantity},{" "}
          </>
        )),
      ellipsis: true,
    },
    {
      title: <S.TableTitle>Tổng tiền</S.TableTitle>,
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "15%",
      render: (item) => `${item.toLocaleString()}₫`,
    },
    {
      title: (
        <S.TableTitle>
          Tình trạng
          <br /> đơn hàng
        </S.TableTitle>
      ),
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (item) => <Tag color="volcano">Đang giao</Tag>,
    },
    {
      title: (
        <S.TableTitle>
          Tình trạng
          <br /> thanh toán
        </S.TableTitle>
      ),
      dataIndex: "paymentType",
      key: "paymentType",
      width: "18%",
      render: (item) =>
        item === "cod" ? (
          <Tag color="volcano">Chưa thanh toán</Tag>
        ) : (
          <Tag color="green">Đã thanh toán</Tag>
        ),
    },
  ];
  const orderColumnsVer2 = [
    {
      title: <S.TableTitle>Mã đơn hàng</S.TableTitle>,
      dataIndex: "id",
      key: "id",
      responsive: ["sm"],
      render: (item) => (
        <p style={{ color: "#f78c0d" }}>{renderOrderId(item)}</p>
      ),
    },
    {
      title: <S.TableTitle>Ngày mua</S.TableTitle>,
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      responsive: ["lg"],
      render: (item) => moment(item).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: <S.TableTitle>Tên sản phẩm</S.TableTitle>,
      dataIndex: "productCount",
      key: "productCount",
      width: "39%",
      render: (_, record) =>
        record.products.map((item) => (
          <span key={item.id}>
            <span style={{ color: "#43715d", fontWeight: 500 }}>
              {item.name}
            </span>{" "}
            x {item.quantity},{" "}
          </span>
        )),
      ellipsis: true,
    },
    {
      title: <S.TableTitle>Tổng tiền</S.TableTitle>,
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "24%",
      render: (item) => (
        <p style={{ color: "#d4380d" }}>{item.toLocaleString()}₫</p>
      ),
    },
    {
      // title: <S.TableTitle>Chi tiết</S.TableTitle>,
      dataIndex: "detail",
      key: "detail",
      width: "10%",
      render: (_, record) => (
        <S.DetailIcon
          onClick={() => {
            setCurrentOrder(record);
            setVisible(true);
          }}
        />
      ),
    },
  ];
  const dataTable = orderList.data.map((item) => ({
    ...item,
    key: item.id,
  }));

  const renderImageList = () => {
    return currentOrder.products?.map((product) => (
      <S.DetailProductWrapper key={product.id}>
        <img src={product.image} alt={product.name} />
        <div>
          <S.BookTitleVer2
            onClick={() =>
              history.push(
                generatePath(ROUTER.USER.PRODUCT_DETAIL, {
                  id: product.id,
                })
              )
            }
          >
            {product.name}
          </S.BookTitleVer2>
          <p>
            {product.price.toLocaleString()}₫ x {product.quantity}
          </p>
        </div>
      </S.DetailProductWrapper>
    ));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Lịch sử đơn hàng</h2>
      {orderList.data.length > 0 ? (
        <>
          <S.TableVer1>
            <Table
              columns={orderColumnsVer1}
              expandable={{
                expandedRowRender: (record) => {
                  return record.products.map((item) => (
                    <S.ExpandedWrapper key={item.id}>
                      <Image src={item.image} alt={item.name} />
                      <S.BookTitle
                        onClick={() =>
                          history.push(
                            generatePath(ROUTER.USER.PRODUCT_DETAIL, {
                              id: item.id,
                            })
                          )
                        }
                      >
                        {item.name}
                      </S.BookTitle>
                      —<span>Giá:</span>
                      <p styled={{ display: "inline" }}>
                        {item.price.toLocaleString()}₫
                      </p>
                      —<span>Số lượng:</span>
                      <p>{item.quantity}</p>
                    </S.ExpandedWrapper>
                  ));
                },
              }}
              dataSource={dataTable}
            />
          </S.TableVer1>
          <S.TableVer2>
            <Table columns={orderColumnsVer2} dataSource={dataTable} />
            <Modal
              visible={visible}
              title={
                <div style={{ fontSize: 22, fontWeight: 600 }}>
                  <FileTextOutlined style={{ fontSize: 24, marginRight: 8 }} />
                  <span style={{ color: "#43715d" }}>Chi tiết đơn hàng</span>
                </div>
              }
              footer={null}
              onCancel={() => setVisible(false)}
            >
              <S.DetailItemWrapper style={{ marginTop: -16 }}>
                <QrcodeOutlined
                  style={{ fontSize: 19, color: "#43715d", paddingTop: 2 }}
                />
                <div>
                  <strong>
                    Mã đơn hàng:{" "}
                    <span style={{ color: "#f78c0d" }}>
                      {renderOrderId(currentOrder.id)}
                    </span>
                  </strong>
                  <p style={{ fontSize: 14 }}>
                    Ngày mua:{" "}
                    {moment(currentOrder.createdAt).format("DD/MM/YYYY HH:mm")}
                  </p>
                </div>
              </S.DetailItemWrapper>
              <S.DetailItemWrapper>
                <ShopOutlined
                  style={{ fontSize: 19, color: "#43715d", paddingTop: 2 }}
                />
                <div>
                  <strong>Thông tin sản phẩm</strong>
                  {renderImageList()}
                </div>
              </S.DetailItemWrapper>
              <S.DetailItemWrapper>
                <CalculatorOutlined
                  style={{ fontSize: 19, color: "#43715d", paddingTop: 2 }}
                />
                <div>
                  <strong>
                    Tổng tiền:{" "}
                    <span style={{ color: "#d4380d" }}>
                      {currentOrder.totalPrice?.toLocaleString()}₫
                    </span>
                  </strong>
                </div>
              </S.DetailItemWrapper>
              <S.DetailItemWrapper>
                <GiftOutlined
                  style={{ fontSize: 19, color: "#43715d", paddingTop: 2 }}
                />
                <div>
                  <strong>Tình trạng đơn hàng:</strong>
                  <Tag color="volcano" style={{ marginLeft: 8 }}>
                    Đang giao
                  </Tag>
                </div>
              </S.DetailItemWrapper>
              <S.DetailItemWrapper>
                <RocketOutlined
                  style={{ fontSize: 19, color: "#43715d", paddingTop: 2 }}
                />
                <div>
                  <strong>Tình trạng giao hàng: {"  "}</strong>
                  {currentOrder.paymentType === "cod" ? (
                    <Tag color="volcano">Chưa thanh toán</Tag>
                  ) : (
                    <Tag color="green">Đã thanh toán</Tag>
                  )}
                </div>
              </S.DetailItemWrapper>
            </Modal>
          </S.TableVer2>
        </>
      ) : (
        <Empty
          description={
            <p style={{ fontSize: 16 }}>Bạn chưa có giao dịch nào.</p>
          }
          style={{ marginTop: 56 }}
        />
      )}
    </div>
  );
};

export default OrderHistory;
