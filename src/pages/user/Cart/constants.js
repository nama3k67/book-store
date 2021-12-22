import { ROUTER } from "../../../constants/router";
import { HomeOutlined } from "@ant-design/icons";

export const BREADCRUMB = [
  {
    title: "Trang chủ",
    path: ROUTER.USER.HOME,
    icon: <HomeOutlined />,
  },
  {
    title: "Giỏ hàng",
    path: ROUTER.USER.CART,
  },
];
