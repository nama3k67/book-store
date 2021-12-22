import { ROUTER } from "../../constants/router";

export const NAV_BAR = [
  {
    title: "Trang chủ",
    path: ROUTER.USER.HOME,
  },
  {
    title: "Tủ sách",
    path: ROUTER.USER.PRODUCTS_LIST,
  },
  {
    title: "Bán chạy",
    path: ROUTER.USER.PRODUCTS_LIST_BESTSELLER,
  },
  {
    title: "Trong nước",
    path: ROUTER.USER.PRODUCTS_LIST_DOMESTIC,
  },
  {
    title: "Nước ngoài",
    path: ROUTER.USER.PRODUCTS_LIST_FOREIGN,
  },
  {
    title: "Liên hệ",
    path: ROUTER.USER.CONTACT,
  },
];

export const DROPDOWN = [
  {
    name: "Thông tin cá nhân",
    page: "information",
  },
  {
    name: "Lịch sử đơn hàng",
    page: "order-history",
  },
  {
    name: "Danh sách yêu thích",
    page: "wishlist",
  },
];
