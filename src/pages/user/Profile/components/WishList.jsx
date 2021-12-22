import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, generatePath } from "react-router-dom";
import { Row, Col, Card, Tag, Rate, Button } from "antd";
import { ShopOutlined } from "@ant-design/icons";

import { deleteWishlistAction } from "../../../../redux/actions";
import { ROUTER } from "../../../../constants/router";
import emptyWishlistImage from "../../../../assets/images/empty-cart.svg";

import * as S from "../styles";

const WishList = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteWishlist = (productItem) => {
    const index = userInfo.data.wishlist?.findIndex(
      (item) => item.id === productItem.id
    );
    const newWishList = [...userInfo.data.wishlist];
    newWishList.splice(index, 1);
    dispatch(
      deleteWishlistAction({
        id: userInfo.data.id,
        data: { ...userInfo.data, wishlist: newWishList },
      })
    );
  };

  const renderWishlist = () => {
    return userInfo.data.wishlist.map((productItem) => (
      <Col xs={12} sm={8} xl={6} key={productItem.id}>
        <Card
          bordered
          cover={
            <img
              src={productItem.images[0]?.path}
              alt={productItem.name}
              style={{ margin: "0 auto", width: "98%", cursor: "pointer" }}
              onClick={() =>
                history.push(
                  generatePath(ROUTER.USER.PRODUCT_DETAIL, {
                    id: productItem.id,
                  })
                )
              }
            />
          }
          extra={
            <S.CloseIcon onClick={() => handleDeleteWishlist(productItem)} />
          }
          style={{ paddingTop: "10px", borderRadius: 0 }}
          bodyStyle={{ padding: "10px 25px 5px" }}
        >
          <S.ProductTitle
            onClick={() =>
              history.push(
                generatePath(ROUTER.USER.PRODUCT_DETAIL, { id: productItem.id })
              )
            }
          >
            {productItem.name}
          </S.ProductTitle>
          <Row>
            <strong style={{ color: "#ea7a7a", fontSize: "16px" }}>
              {productItem.price.toLocaleString()}&nbsp;₫
            </strong>
            &nbsp;&nbsp;&nbsp;
            {productItem.discount !== 0 && (
              <Tag
                color="error"
                style={{
                  height: "fit-content",
                  width: "fit-content",
                  margin: 0,
                }}
              >
                -{productItem.discount * 100}%
              </Tag>
            )}
          </Row>

          <Row justify="center" align="middle">
            <Col xs={24} sm={24} xl={12}>
              <Rate
                defaultValue={productItem.rating}
                allowHalf
                disabled
                style={{ fontSize: 10, margin: "auto 0" }}
              />
            </Col>

            <Col xs={24} sm={24} xl={12}>
              <S.AvailableAmount>
                Sẵn có:&nbsp;<b>{productItem.amount}</b>
              </S.AvailableAmount>
            </Col>
          </Row>
        </Card>
      </Col>
    ));
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Danh sách yêu thích</h2>
      {userInfo.data.wishlist?.length > 0 ? (
        <>
          <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
            {renderWishlist()}
          </Row>
        </>
      ) : (
        <S.EmptyWishlistContainer>
          <img src={emptyWishlistImage} alt="empty cart" />
          <p>Không có sản phẩm nào trong danh sách yêu thích!!!</p>
          <Button
            type="primary"
            size="large"
            icon={<ShopOutlined />}
            onClick={() => history.push(ROUTER.USER.PRODUCTS_LIST)}
          >
            Tiếp tục mua sắm
          </Button>
        </S.EmptyWishlistContainer>
      )}
    </>
  );
};

export default WishList;
