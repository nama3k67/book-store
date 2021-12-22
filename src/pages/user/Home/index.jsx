import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { Button, Row, Col, Input } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

import ProductWrapper from "../../../components/ProductWrapper";
import { getProductListAction } from "../../../redux/actions";

import HomeImage01 from "../../../assets/images/home_image_01.jpg";
import HomeImage02 from "../../../assets/images/home_image_02.jpg";

import {
  settings_carousel,
  settings_section,
  slides,
  typeList,
  categoriesList,
} from "./constants";
import { ROUTER } from "../../../constants/router";

import * as S from "./styles";

const Home = () => {
  const { productList } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProductListAction({}));
  }, []);

  const renderSlide = () => {
    return slides.map((item, index) => (
      <S.SlideWrapper key={index}>
        <S.Slide src={item} alt={`slide_${index}`} />
      </S.SlideWrapper>
    ));
  };

  const renderNewProductSection = useMemo(() => {
    return productList.data.slice(0, 10).map((item, index) => (
      <S.NewProductContent key={index} i={index}>
        <ProductWrapper productItem={item} />
      </S.NewProductContent>
    ));
  }, [productList.data]);

  const renderBestsellerSection = useMemo(() => {
    return productList.data.slice(0, 10).map((item) => (
      <S.ProductContainer key={item.id}>
        <ProductWrapper productItem={item} />
      </S.ProductContainer>
    ));
  }, [productList.data]);

  const renderDomesticSection = useMemo(() => {
    return productList.data
      .filter((productItem) => productItem.language === "Tiếng Việt")
      .slice(0, 10)
      .map((item) => (
        <S.ProductContainer key={item.id}>
          <ProductWrapper productItem={item} />
        </S.ProductContainer>
      ));
  }, [productList.data]);

  const renderForeignSection = useMemo(() => {
    return productList.data
      .filter((productItem) => productItem.language === "Tiếng Anh")
      .slice(0, 10)
      .map((item) => (
        <S.ProductContainer key={item.id}>
          <ProductWrapper productItem={item} />
        </S.ProductContainer>
      ));
  }, [productList.data]);

  const renderTypeList = () => {
    return typeList.map((typeItem, typeIndex) => (
      <Col xs={24} sm={24} md={12} lg={8} key={typeIndex}>
        <S.TypeItem
          color={typeItem.color}
          onClick={() => history.push(typeItem.path)}
        >
          <img src={typeItem.image} alt={typeItem.name} />
          <S.TypeContent>
            <p>{typeItem.name}</p>
          </S.TypeContent>
        </S.TypeItem>
      </Col>
    ));
  };

  const renderCategoriesList = () => {
    return categoriesList.map((categoryItem, categoryIndex) => (
      <Col key={categoryIndex} xs={12} sm={12} md={6} xl={3}>
        <S.CategoryContent>
          <S.CategoryImage
            src={categoryItem.image}
            alt={`img_${categoryIndex}`}
          />
          <S.CategoryTitle>{categoryItem.name}</S.CategoryTitle>
        </S.CategoryContent>
      </Col>
    ));
  };

  return (
    <S.HomeContainer>
      {/* Slide */}
      <S.SlideContainer>
        <S.SlidesWrapper>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} lg={16}>
              <Slider {...settings_carousel}>{renderSlide()}</Slider>
            </Col>
            <Col xs={24} sm={24} lg={8}>
              <S.HomeImageContainer>
                <S.HomeImage src={HomeImage01} alt="home_image_01" />
                <S.HomeImage src={HomeImage02} alt="home_image_02" />
              </S.HomeImageContainer>
            </Col>
          </Row>
        </S.SlidesWrapper>

        {/* Categories of books */}
        <S.CategoriesTitle>Thể loại sách</S.CategoriesTitle>
        <S.CategoriesWrapper justify="center" style={{ marginBottom: 16 }}>
          {renderCategoriesList()}
        </S.CategoriesWrapper>
      </S.SlideContainer>

      {/* New Products */}
      <S.NewProductHeader>
        <S.NewProductTitle>Sách mới</S.NewProductTitle>
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => history.push(ROUTER.USER.PRODUCTS_LIST)}
        >
          <span style={{ fontSize: 15 }}>Xem thêm</span> <DoubleRightOutlined />
        </Button>
      </S.NewProductHeader>
      <S.NewProductContainer>{renderNewProductSection}</S.NewProductContainer>
      {/* Category List */}
      <S.TypesWrapper>
        <S.TypeTitle>Tủ sách</S.TypeTitle>
        <Row justify="center" gutter={[16, 16]}>
          {renderTypeList()}
        </Row>
      </S.TypesWrapper>

      <S.NewProductHeader>
        <S.NewProductTitle>Sách bán chạy</S.NewProductTitle>
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => history.push(ROUTER.USER.PRODUCTS_LIST_BESTSELLER)}
        >
          <span style={{ fontSize: 15 }}>Xem thêm</span> <DoubleRightOutlined />
        </Button>
      </S.NewProductHeader>
      <S.SectionContainer>
        <Slider {...settings_section}>{renderBestsellerSection}</Slider>
      </S.SectionContainer>
      <S.RegisterFormContainer>
        <h2>Đăng ký</h2>
        <p>
          Đăng ký nhận bản tin của Runner Inn để cập nhật những sản phẩm mới,
          nhận thông tin ưu đãi đặc biệt và thông tin giảm giá khác.
        </p>
        <S.FormContainer compact>
          <Input
            style={{ width: "calc(100% - 100px)" }}
            placeholder="Nhập email của bạn"
            size="large"
          />
          <Button type="primary" style={{ width: 100 }} size="large">
            GỬI
          </Button>
        </S.FormContainer>
      </S.RegisterFormContainer>

      <S.NewProductHeader>
        <S.NewProductTitle>Sách trong nước</S.NewProductTitle>
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => history.push(ROUTER.USER.PRODUCTS_LIST_DOMESTIC)}
        >
          <span style={{ fontSize: 15 }}>Xem thêm</span> <DoubleRightOutlined />
        </Button>
      </S.NewProductHeader>
      <S.SectionContainer>
        <Slider {...settings_section}>{renderDomesticSection}</Slider>
      </S.SectionContainer>

      <S.NewProductHeader>
        <S.NewProductTitle>Sách nước ngoài</S.NewProductTitle>
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => history.push(ROUTER.USER.PRODUCTS_LIST_DOMESTIC)}
        >
          <span style={{ fontSize: 15 }}>Xem thêm</span> <DoubleRightOutlined />
        </Button>
      </S.NewProductHeader>
      <S.SectionContainer>
        <Slider {...settings_section}>{renderForeignSection}</Slider>
      </S.SectionContainer>
      <div style={{ width: "100%", height: 2 }} />
    </S.HomeContainer>
  );
};

export default Home;
