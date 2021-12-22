import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { ROUTER } from "../../../constants/router";

export const BREADCRUMB = [
  {
    title: "Trang chủ",
    path: ROUTER.USER.HOME,
    icon: <HomeOutlined />,
  },
  {
    title: "Liên hệ",
    path: ROUTER.USER.CONTACT,
  },
];

export const CONTACT_LIST = [
  {
    icon: <MailOutlined />,
    content: "Email: bookworm123@gmail.com",
  },
  {
    icon: <PhoneOutlined />,
    content: "Phone: +1900636467",
  },
  {
    icon: <EnvironmentOutlined />,
    content: "Address: 19 Pasteur, Hải Châu 1, Hải Châu, Đà Nẵng",
  },
  {
    icon: <GithubOutlined />,
    content: "Github: https://github.com/nama3k67",
  },
];
