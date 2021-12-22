import React from "react";
import { Row, Col } from "antd";

import LogoContainer from "../../components/LogoContainer";
import { FOOTER_LIST, ICON_LIST } from "./constants";
import logoFooter from "../../assets/images/logo_footer.png";

import * as S from "./styles";

function Footer() {
  const renderItems = () =>
    FOOTER_LIST.map((footerItem, footerIndex) => (
      <Col key={footerIndex} sm={24} md={12} lg={6}>
        <S.ItemContentWrapper>
          <S.ItemTitle>{footerItem.title}</S.ItemTitle>
          <S.ItemContentWrapper>
            {footerItem.paths.map((pathItem, pathIndex) => (
              <S.ItemContent key={pathIndex}>
                -&nbsp;
                {footerItem.pathTitles && (
                  <S.TitleContent>
                    {footerItem.pathTitles[pathIndex]}
                  </S.TitleContent>
                )}
                {pathItem}
              </S.ItemContent>
            ))}
          </S.ItemContentWrapper>
        </S.ItemContentWrapper>
      </Col>
    ));

  const renderIcons = () => {
    return ICON_LIST.map((iconItem, iconIndex) => (
      <Col key={iconIndex} span={4}>
        <img
          src={iconItem.path}
          alt={iconItem.name}
          width={28}
          height={28}
          style={{ cursor: "pointer" }}
        />
      </Col>
    ));
  };
  return (
    <S.FooterWrapper>
      <S.FooterContainer>
        <Row gutter={[16, 16]}>
          <Col sm={24} md={12} lg={6}>
            {/* <div
              style={{
                height: "50px",
                display: "flex",
                justifyContent: "left",
              }}
            > */}
            <LogoContainer />
            {/* </div> */}
            <S.ItemContentWrapper>
              <strong>BOOKWORM </strong>nhận đặt hàng trực tuyến và giao hàng
              tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng
              cũng như tất cả Hệ Thống <strong>BOOKWORM </strong>trên toàn quốc.
              <a
                rel="noopener noreferrer"
                href="https://moit.gov.vn/"
                target="_blank"
                style={{ display: "block", margin: "0.5rem 0" }}
              >
                <img src={logoFooter} alt="logo" width={140} height={56} />
              </a>
              <Row gutter={6} style={{ width: "fit-content" }}>
                {renderIcons()}
              </Row>
            </S.ItemContentWrapper>
          </Col>
          {renderItems()}
        </Row>
      </S.FooterContainer>
      <S.CopyRight>
        <span>
          Copyright &copy; 2021 <b style={{ color: "#43715d" }}>Bookworm</b>.
        </span>
        <a
          rel="noopener noreferrer"
          href="https://github.com/nama3k67"
          target="_blank"
        >
          &nbsp;Lập trình bởi Nam Tran
        </a>
      </S.CopyRight>
    </S.FooterWrapper>
  );
}

export default Footer;
