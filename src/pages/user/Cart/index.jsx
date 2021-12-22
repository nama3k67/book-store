import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  List,
  Checkbox,
  Input,
  Button,
  notification,
  Tooltip,
  Tag,
  Modal,
} from "antd";
import { useHistory, generatePath } from "react-router-dom";
import { ExclamationCircleOutlined, ShopOutlined } from "@ant-design/icons";

import TopWrapper from "../../../components/TopWrapper";
import { BREADCRUMB } from "./constants";
import { ROUTER } from "../../../constants/router";
import emptyCartImage from "../../../assets/images/empty-cart.svg";

import {
  updateCartProductAction,
  removeCardProductAction,
  setCartInfo,
  getTicketListAction,
} from "../../../redux/actions";

import * as S from "./styles";

const Cart = () => {
  const ticketInput = useRef(null);
  const [discount, setDiscount] = useState(0);

  const { cartList, cartInfo } = useSelector((state) => state.cartReducer);
  const { ticketList } = useSelector((state) => state.ticketReducer);

  useEffect(() => {
    dispatch(getTicketListAction());
  }, []);

  useEffect(() => {
    setDiscount(
      cartInfo.tickets.reduce((total, item) => total + item.percent, 0)
    );
  }, [cartInfo]);

  const dispatch = useDispatch();
  const history = useHistory();

  let totalPrice = 0;

  const handleSelectCart = (e, item) => {
    const { checked } = e.target;
    if (checked) {
      dispatch(
        setCartInfo({ selectedCarts: [...cartInfo.selectedCarts, item] })
      );
    } else {
      const newSelectedCarts = cartInfo.selectedCarts.filter(
        (selectedCart) => selectedCart.id !== item.id
      );
      dispatch(setCartInfo({ selectedCarts: newSelectedCarts }));
    }
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      dispatch(setCartInfo({ selectedCarts: [...cartList.data] }));
    } else {
      dispatch(setCartInfo({ selectedCarts: [] }));
    }
  };

  const handleConfirmCart = () => {
    if (!cartInfo.selectedCarts.length) {
      notification.error({
        message: "Bạn chưa chọn sản phẩm nào",
      });
    } else {
      history.push(ROUTER.USER.CHECKOUT);
    }
  };

  const handleConfirmTicket = () => {
    const value = ticketInput.current.state.value;

    if (!!value) {
      const ticket = ticketList.data.find(
        (ticketItem) => ticketItem.code === value
      );

      if (ticket) {
        const isExisted =
          cartInfo.tickets.findIndex(
            (ticketItem) => ticketItem.code === ticket.code
          ) !== -1;
        if (isExisted) {
          notification.error({
            message: "Bạn đã dùng mã này rồi!",
          });
        } else {
          dispatch(setCartInfo({ tickets: [...cartInfo.tickets, ticket] }));
        }

        ticketInput.current.handleReset();
      } else {
        notification.error({
          message: "Mã giảm giá không hợp lệ",
        });
      }
    } else {
      notification.error({
        message: "Bạn chưa nhập mã giảm giá",
      });
    }
  };

  const renderCartList = () => {
    return cartList.data.map((cartItem) => {
      const isChecked =
        cartInfo?.selectedCarts.findIndex(
          (selectedCart) => selectedCart.id === cartItem.id
        ) !== -1;
      totalPrice += isChecked ? cartItem.product?.price * cartItem.quantity : 0;
      return (
        <S.CartProductItem key={cartItem.id}>
          <Row align="middle" justify="center" gutter={[8, 8]}>
            <Col span={1} style={{ display: "flex", justifyContent: "center" }}>
              <Checkbox
                onChange={(e) => handleSelectCart(e, cartItem)}
                checked={isChecked}
              />
            </Col>
            <Col xs={6} sm={5} md={4}>
              <S.ProductImage
                src={cartItem.productImage}
                alt={cartItem.product.name}
              />
            </Col>
            <Col xs={17} sm={18} md={19}>
              <S.CartDetailContainer>
                <S.FirstCartDetail>
                  <S.ProductTitle
                    onClick={() =>
                      history.push(
                        generatePath(ROUTER.USER.PRODUCT_DETAIL, {
                          id: cartItem.productId,
                        })
                      )
                    }
                  >
                    {cartItem.product.name}
                  </S.ProductTitle>
                  <S.AvailableQuantity>
                    Sẵn có: {cartItem.product.amount}
                  </S.AvailableQuantity>
                </S.FirstCartDetail>
                <S.SecondCartDetail>
                  <S.ProductPrice>
                    {cartItem.product.price.toLocaleString()}&nbsp;<u>đ</u>
                  </S.ProductPrice>
                </S.SecondCartDetail>
                <S.ThirdCartDetail>
                  <S.QuantityWrapper>
                    <S.QuantityButton
                      disabled={cartItem.quantity <= 1}
                      style={{ borderLeft: "none" }}
                      onClick={() =>
                        dispatch(
                          updateCartProductAction({
                            data: {
                              id: cartItem.id,
                              quantity: cartItem.quantity - 1,
                            },
                          })
                        )
                      }
                    >
                      <S.QuantityImage
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                        alt="remove-icon"
                      />
                    </S.QuantityButton>
                    <Input
                      style={{
                        width: 40,
                        height: "100%",
                        border: "none",
                        textAlign: "center",
                      }}
                      value={cartItem.quantity}
                    />
                    <S.QuantityButton
                      disabled={cartItem.quantity >= cartItem.product?.amount}
                      style={{ borderRight: "none" }}
                      onClick={() =>
                        dispatch(
                          updateCartProductAction({
                            data: {
                              id: cartItem.id,
                              quantity: cartItem.quantity + 1,
                            },
                          })
                        )
                      }
                    >
                      <S.QuantityImage
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                        alt="add-icon"
                      />
                    </S.QuantityButton>
                  </S.QuantityWrapper>
                </S.ThirdCartDetail>
                <S.FourthCartDetail>
                  <S.ProductPrice style={{ fontWeight: 500, color: "red" }}>
                    {(
                      cartItem.product?.price * cartItem.quantity
                    ).toLocaleString()}
                    &nbsp;<u>đ</u>
                  </S.ProductPrice>
                </S.FourthCartDetail>
                <S.FifthCartDetail>
                  <S.DeleteIcon
                    style={{ fontSize: 18, marginLeft: 3 }}
                    onClick={() => confirmDeleteTicket(cartItem)}
                  />
                </S.FifthCartDetail>
              </S.CartDetailContainer>
            </Col>
          </Row>
        </S.CartProductItem>
      );
    });
  };

  const renderTicketTags = useMemo(() => {
    return cartInfo.tickets.map((ticketItem) => (
      <Tooltip key={ticketItem.id} title={`-${ticketItem.percent * 100}%`}>
        <Tag
          style={{ margin: "3px 2px 0 0", padding: "0 1px" }}
          key={ticketItem.id}
          closable
          color="volcano"
          onClose={() => handleDeleteTicket(ticketItem)}
        >
          #{ticketItem.code}
        </Tag>
      </Tooltip>
    ));
  }, [cartInfo]);

  const handleDeleteTicket = (ticketItem) => {
    const newTicketList = cartInfo.tickets.filter(
      (item) => item.id !== ticketItem.id
    );
    dispatch(setCartInfo({ tickets: newTicketList }));
  };

  const confirmDeleteTicket = (cartItem) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn muốn xóa sản phẩm này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Không",
      onOk: () => {
        dispatch(removeCardProductAction({ id: cartItem.id }));
      },
    });
  };
  const confirmDeleteAllTickets = () => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn muốn xóa những sản phẩm này?",
      okType: "danger",
      okText: "Xóa",
      cancelText: "Không",
      onOk: () => {
        cartInfo.selectedCarts.forEach((cartItem) => {
          dispatch(removeCardProductAction({ id: cartItem.id }));
        });
        dispatch(setCartInfo({ selectedCarts: [] }));
      },
    });
  };
  return (
    <>
      <TopWrapper breadcrumb={[...BREADCRUMB]} titlePage={"Giỏ hàng"} />
      {cartList.data.length > 0 ? (
        <S.CartContainer>
          <S.CartWrapper>
            <S.CartHeader>
              <S.CartProductsContainer xs={24} sm={24} xl={17}>
                <S.CartProductsWrapper
                  style={{
                    padding: "0.5rem",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <Row align="middle" justify="center">
                    <Col
                      span={1}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Checkbox
                        onChange={(e) => handleSelectAll(e)}
                        indeterminate={
                          cartInfo?.selectedCarts.length > 0 &&
                          cartInfo?.selectedCarts.length !==
                            cartList.data.length
                        }
                        checked={
                          cartInfo?.selectedCarts.length ===
                          cartList.data.length
                        }
                      />
                    </Col>
                    <Col xs={10} sm={11} md={6}>
                      <p>Tất cả ({cartList.data.length} sản phẩm)</p>
                    </Col>
                    <Col xs={13} sm={12} md={17}>
                      <S.CartDetailContainer>
                        <S.FirstCartDetail
                          style={{ width: 100 }}
                        ></S.FirstCartDetail>
                        <S.SecondCartDetail>
                          <S.CartTitle>Đơn giá </S.CartTitle>
                        </S.SecondCartDetail>
                        <S.ThirdCartDetail
                          style={{ minWidth: 90, textAlign: "center" }}
                        >
                          <S.CartTitle>Số lượng</S.CartTitle>
                        </S.ThirdCartDetail>
                        <S.FourthCartDetail
                          style={{ paddingLeft: 25, width: 110 }}
                        >
                          <S.CartTitle>Thành tiền </S.CartTitle>
                        </S.FourthCartDetail>
                        <S.FifthCartDetail>
                          <Tooltip
                            placement="topRight"
                            title={
                              <p style={{ textAlign: "center" }}>
                                Xóa những sản phẩm
                                <br /> được chọn
                              </p>
                            }
                          >
                            <S.DeleteIcon
                              onClick={() => {
                                if (cartInfo.selectedCarts.length) {
                                  confirmDeleteAllTickets();
                                } else {
                                  notification.warning({
                                    message:
                                      "Bạn chưa chọn sản phẩm nào để xóa!",
                                  });
                                }
                              }}
                            />
                          </Tooltip>
                        </S.FifthCartDetail>
                      </S.CartDetailContainer>
                    </Col>
                  </Row>
                </S.CartProductsWrapper>
                <S.CartProductsWrapper
                  style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                >
                  {renderCartList()}
                </S.CartProductsWrapper>
              </S.CartProductsContainer>
              <S.SectionsContainer
                xs={24}
                sm={24}
                xl={7}
                style={{ width: "100%" }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={12} xl={24}>
                    <S.SectionLabelWrapper>
                      <S.SectionTitle>Khuyến mãi</S.SectionTitle>
                    </S.SectionLabelWrapper>
                    <S.CartSummaryWrapper>
                      <List bordered>
                        <List.Item>
                          <Input.Group compact>
                            <Input
                              ref={ticketInput}
                              placeholder="Nhập mã giảm giá"
                              style={{ width: "calc(100% - 85px)" }}
                            />
                            <Button
                              style={{ width: 85 }}
                              htmlType="submit"
                              type="primary"
                              onClick={handleConfirmTicket}
                            >
                              Áp dụng
                            </Button>
                          </Input.Group>
                        </List.Item>
                        {cartInfo.tickets.length > 0 && (
                          <List.Item>
                            <Row style={{ marginTop: 3, width: "100%" }}>
                              <Col span={8}>
                                <span style={{ fontSize: 15, fontWeight: 400 }}>
                                  Mã của bạn:&nbsp;&nbsp;
                                </span>
                              </Col>
                              <Col span={16}>{renderTicketTags}</Col>
                            </Row>
                          </List.Item>
                        )}
                      </List>
                    </S.CartSummaryWrapper>
                  </Col>
                  <Col xs={24} sm={24} md={12} xl={24}>
                    <S.SectionLabelWrapper>
                      <S.SectionTitle>Thống kê giỏ hàng</S.SectionTitle>
                    </S.SectionLabelWrapper>
                    <S.CartSummaryWrapper>
                      <List bordered>
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <p style={{ fontSize: 16, fontWeight: 400 }}>
                                Tạm tính
                              </p>
                            }
                          />
                          <p style={{ fontSize: 16 }}>
                            {parseInt(totalPrice).toLocaleString()}&nbsp;
                            <u>đ</u>
                          </p>
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <p style={{ fontSize: 16, fontWeight: 400 }}>
                                Phí vận chuyển
                              </p>
                            }
                          />
                          <p style={{ fontSize: 16 }}>Miễn phí</p>
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <p style={{ fontSize: 16, fontWeight: 400 }}>
                                Giảm giá&nbsp;({parseInt(discount * 100)}%)
                              </p>
                            }
                          />
                          <p style={{ fontSize: 16 }}>
                            - {parseInt(totalPrice * discount).toLocaleString()}
                            &nbsp;<u>đ</u>
                          </p>
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            title={<p style={{ fontSize: 20 }}>Tổng cộng</p>}
                          />
                          <p
                            style={{
                              fontSize: 20,
                              fontWeight: 400,
                              color: "red",
                            }}
                          >
                            {(totalPrice * (1 - discount) < 0
                              ? 0
                              : parseInt(totalPrice * (1 - discount))
                            ).toLocaleString()}
                            &nbsp;<u>đ</u>
                          </p>
                        </List.Item>
                      </List>
                    </S.CartSummaryWrapper>
                    <Button
                      block
                      type="danger"
                      size="large"
                      onClick={handleConfirmCart}
                    >
                      <p style={{ fontSize: 20, fontWeight: 500 }}>
                        Thanh toán
                      </p>
                    </Button>
                  </Col>
                </Row>
              </S.SectionsContainer>
            </S.CartHeader>
          </S.CartWrapper>
        </S.CartContainer>
      ) : (
        <S.CartContainer>
          <S.EmptyCartContainer>
            <img src={emptyCartImage} alt="empty cart" />
            <p>Không có sản phẩm nào trong giỏ hàng của bạn.😐</p>
            <Button
              type="primary"
              size="large"
              icon={<ShopOutlined />}
              onClick={() => history.push(ROUTER.USER.PRODUCTS_LIST)}
            >
              Tiếp tục mua sắm
            </Button>
          </S.EmptyCartContainer>
        </S.CartContainer>
      )}
    </>
  );
};

export default Cart;
