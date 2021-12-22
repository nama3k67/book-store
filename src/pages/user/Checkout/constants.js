import { HomeOutlined } from "@ant-design/icons";

import Vietinbank from "../../../assets/images/cardsGroup/bank-vtb.svg";
import Agribank from "../../../assets/images/cardsGroup/bank-varb.svg";
import Vietcombank from "../../../assets/images/cardsGroup/bank-vcb.svg";
import BIDV from "../../../assets/images/cardsGroup/bank-bidv.svg";
import DongABank from "../../../assets/images/cardsGroup/bank-dab.svg";
import Sacombank from "../../../assets/images/cardsGroup/bank-scb.svg";
import ACB from "../../../assets/images/cardsGroup/bank-acb.svg";
import MBBank from "../../../assets/images/cardsGroup/bank-mb.svg";
import Techcombank from "../../../assets/images/cardsGroup/bank-tcb.svg";
import VPBank from "../../../assets/images/cardsGroup/bank-vpb.svg";
import Eximbank from "../../../assets/images/cardsGroup/bank-eib.svg";
import VIB from "../../../assets/images/cardsGroup/bank-vib.svg";

import codImage from "../../../assets/images/codImage.svg";
import cardImage from "../../../assets/images/cardImage.svg";
import paypalImage from "../../../assets/images/paypalImage.png";

export const BREADCRUMB = [
  {
    title: "Trang chủ",
    path: "/",
    icon: <HomeOutlined />,
  },
  {
    title: "Thanh toán",
  },
];

export const PAYMENT_TYPE = [
  {
    code: "cod",
    name: "Thanh toán tiền khi nhận hàng",
    imageSrc: codImage,
  },
  {
    code: "atm",
    name: "Thẻ ATM nội địa/Internet Banking (Hỗ trợ Internet Banking)",
    imageSrc: cardImage,
    type: "card",
  },
  {
    code: "paypal",
    name: "Thanh toán bằng Paypal",
    imageSrc: paypalImage,
    type: "paypal",
  },
];

export const CARD_GROUP = [
  {
    name: "Vietinbank",
    src: Vietinbank,
  },
  {
    name: "Agribank",
    src: Agribank,
  },
  {
    name: "Vietcombank",
    src: Vietcombank,
  },
  {
    name: "VIB",
    src: VIB,
  },
  {
    name: "BIDV",
    src: BIDV,
  },
  {
    name: "Đông Á Bank",
    src: DongABank,
  },
  {
    name: "Sacombank",
    src: Sacombank,
  },
  {
    name: "ACB",
    src: ACB,
  },
  {
    name: "MBBank",
    src: MBBank,
  },
  {
    name: "Techcombank",
    src: Techcombank,
  },
  {
    name: "VPBank",
    src: VPBank,
  },
  {
    name: "Eximbank",
    src: Eximbank,
  },
];
