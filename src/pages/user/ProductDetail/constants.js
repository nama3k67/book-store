import {
  HomeOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import { ROUTER } from "../../../constants/router";
import * as S from "./styles";

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

export const SETTING_SLICK = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  nextArrow: <S.NextArrowSection />,
  prevArrow: <S.PrevArrowSection />,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 4,
        dots: false,
        rows: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3,
        dots: false,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
  ],
};

export const POLICY = [
  {
    text: "Được phép đổi trả tối đa trong 30 ngày từ khi nhận hàng",
    icon: <HourglassOutlined style={{ color: "#43715d", fontSize: 18 }} />,
  },
  {
    text: "Được hoàn tiền trong vòng 7 ngày kể từ khi xác nhận đổi trả",
    icon: <ThunderboltOutlined style={{ color: "#43715d", fontSize: 18 }} />,
  },
  {
    text: "Chỉ đổi trả với những trường hợp do vận chuyển hoặc lỗi từ bên cung cấp",
    icon: <SafetyOutlined style={{ color: "#43715d", fontSize: 18 }} />,
  },
];
