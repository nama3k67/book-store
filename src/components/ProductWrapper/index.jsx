import React from "react";
import { Card, Row, Col, Tag, Rate } from "antd";
import { useHistory, generatePath } from "react-router-dom";

import { ROUTER } from "../../constants/router";

import * as S from "./styles";

const ProductWrapper = ({ productItem }) => {
  const history = useHistory();
  return (
    <Card
      hoverable
      bordered={false}
      cover={<img src={productItem.images[0]?.path} alt={productItem.name} />}
      style={{ paddingTop: "10px", borderRadius: 0 }}
      bodyStyle={{ padding: "10px 25px 5px" }}
      onClick={() =>
        history.push(
          generatePath(ROUTER.USER.PRODUCT_DETAIL, { id: productItem.id })
        )
      }
    >
      <S.ProductTitle>{productItem.name}</S.ProductTitle>
      <Row>
        <S.PriceProduct>
          {productItem.price.toLocaleString()}&nbsp;₫
        </S.PriceProduct>
        &nbsp;&nbsp;
        {productItem.discount !== 0 && (
          <Tag
            color="error"
            style={{ height: "fit-content", width: "fit-content", margin: 0 }}
          >
            <S.TagWrapper>-{productItem.discount * 100}%</S.TagWrapper>
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
  );
};

export default ProductWrapper;
