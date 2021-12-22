import slide_01 from "../../../assets/images/slide_01.jpg";
import slide_02 from "../../../assets/images/slide_02.jpg";
import slide_03 from "../../../assets/images/slide_03.png";
import { ROUTER } from "../../../constants/router";

import * as S from "./styles";

export const slides = [slide_02, slide_01, slide_03];

export const settings_carousel = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <S.NextArrow />,
  prevArrow: <S.PrevArrow />,
};

export const settings_section = {
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
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
  ],
};

export const typeList = [
  {
    image:
      "https://static01.nyt.com/images/2018/12/09/books/review/1209-BKS-COVER_Sub01/1209-BKS-COVER_Sub01-superJumbo.jpg",
    name: "Sách bán chạy",
    // color: "rgba(46, 76, 109, 0.3)",
    path: ROUTER.USER.PRODUCTS_LIST_BESTSELLER,
  },
  {
    image:
      "https://vnn-imgs-f.vgcloud.vn/2021/01/12/09/ra-mat-bon-tac-pham-tiep-theo-trong-bo-sach-viet-nam-danh-tac.jpg",
    name: "Sách trong nước",
    color: "rgba(67, 113, 93, 0.2)",
    path: ROUTER.USER.PRODUCTS_LIST_DOMESTIC,
  },
  {
    image:
      "https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
    name: "Sách nước ngoài",
    // color: "rgba(251, 198, 135, 0.1)",
    path: ROUTER.USER.PRODUCTS_LIST_FOREIGN,
  },
];

export const categoriesList = [
  {
    name: "Kỹ năng sống",
    image:
      "https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/000000/external-skill-teamwork-itim2101-lineal-color-itim2101.png",
  },
  {
    name: "Kinh tế",
    image:
      "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-economy-ecommerce-justicon-lineal-color-justicon.png",
  },
  {
    name: "Giáo trình",
    image:
      "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-document-office-stationery-justicon-lineal-color-justicon.png",
  },
  {
    name: "Ngoại ngữ",
    image:
      "https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-language-communication-wanicon-lineal-color-wanicon.png",
  },
  {
    name: "Manga - Comic",
    image:
      "https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-comic-book-art-and-design-wanicon-lineal-color-wanicon.png",
  },
  {
    name: "Văn học",
    image: "https://img.icons8.com/emoji/48/000000/open-book-emoji.png",
  },
  {
    name: "Công nghệ",
    image:
      "https://img.icons8.com/external-soft-fill-juicy-fish/60/000000/external-tech-insurance-soft-fill-soft-fill-juicy-fish.png",
  },
  {
    name: "Lịch sử - Địa lý",
    image:
      "https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-geography-university-courses-wanicon-lineal-color-wanicon.png",
  },
];
