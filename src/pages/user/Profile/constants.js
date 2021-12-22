import {
  HomeOutlined,
  IdcardOutlined,
  HistoryOutlined,
  HeartOutlined,
  LogoutOutlined,
  KeyOutlined,
} from "@ant-design/icons";

export const BREADCRUMB = [
  {
    title: "Trang chủ",
    path: "/",
    icon: <HomeOutlined />,
  },
  {
    title: "Trang cá nhân",
    path: "/profile",
  },
];

export const PROFILE_TABS = [
  {
    title: "Thông tin cá nhân",
    icon: <IdcardOutlined />,
    path: "information",
  },
  {
    title: "Lịch sử đơn hàng",
    icon: <HistoryOutlined />,
    path: "order-history",
  },
  {
    title: "Sản phẩm yêu thích",
    icon: <HeartOutlined />,
    path: "wishlist",
  },
  {
    title: "Đổi mật khẩu",
    icon: <KeyOutlined />,
    path: "change-password",
  },
  {
    title: "Đăng xuất",
    icon: <LogoutOutlined />,
    path: "logout",
  },
];
