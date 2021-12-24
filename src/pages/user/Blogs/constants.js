import { HomeOutlined } from "@ant-design/icons";
import { ROUTER } from "../../../constants/router";

export const BREADCRUMB = [
  {
    title: "Trang chủ",
    path: ROUTER.USER.HOME,
    icon: <HomeOutlined />,
  },
  {
    title: "Bài viết",
    path: ROUTER.USER.BLOGS,
  },
];
