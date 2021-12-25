import React from "react";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";
import { ShopOutlined } from "@ant-design/icons";

import { ROUTER } from "../../constants/router";

const NotFound = () => {
  document.title = "404";
  const history = useHistory();
  return (
    <Result
      status="404"
      title={<h1>404</h1>}
      subTitle={
        <h3 style={{ fontSize: 18 }}>
          Xin lỗi, trang bạn tìm kiếm không tồn tại😓
        </h3>
      }
      extra={
        <Button
          icon={<ShopOutlined />}
          type="primary"
          size="large"
          onClick={() => history.push(ROUTER.USER.HOME)}
        >
          Trở về trang chủ
        </Button>
      }
    />
  );
};

export default NotFound;
