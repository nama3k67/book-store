import { HomeOutlined } from "@ant-design/icons";
import { ROUTER } from "../../../constants/router";

export const BREADCRUMB = [
  {
    title: "Trang chủ",
    path: ROUTER.USER.HOME,
    icon: <HomeOutlined />,
  },
  {
    title: "Tủ sách",
    path: ROUTER.USER.PRODUCTS_LIST,
  },
];

export const DEFAULT_PRICE_FILTER = [0, 1000000];

export const MARKS = {
  0: "0₫",
  500000: "500,000₫",
  1000000: "1tr",
};
