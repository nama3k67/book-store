import React from "react";
import { useHistory, generatePath } from "react-router-dom";
import { Button } from "antd";
import { AccountBookOutlined, ShopOutlined } from "@ant-design/icons";

import successImage from "../../../../assets/images/success-image.png";

import { ROUTER } from "../../../../constants/router";
import * as S from "../styles";

const Success = () => {
  const history = useHistory();
  return (
    <S.SuccessWrapper>
      <S.SuccessImage src={successImage} alt="success_image" />
      <h2>Chúc mừng, bạn đã đặt hàng thành công! 🎉</h2>
      <div>
        <Button
          type="danger"
          size="large"
          icon={<AccountBookOutlined />}
          style={{ margin: 8 }}
          onClick={() =>
            history.push(
              generatePath(ROUTER.USER.PROFILE, { page: "order-history" })
            )
          }
        >
          Kiểm tra đơn hàng
        </Button>
        <Button
          type="primary"
          size="large"
          style={{ margin: 8 }}
          icon={<ShopOutlined />}
          ghost
          onClick={() => history.push(ROUTER.USER.PRODUCTS_LIST)}
        >
          Tiếp tục mua sắm
        </Button>
      </div>
    </S.SuccessWrapper>
  );
};

export default Success;
