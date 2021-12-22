import styled, { css } from "styled-components";
import { Container } from "../../../components/Container";
import { Button, Col, Row } from "antd";

export const ProductDetailContainer = styled.div`
  width: 100%;
  padding-top: 0.35rem;
  padding-bottom: 1rem;
  background-color: #efefef;
`;
export const ProductDetailWrapper = styled(Container)`
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const ImageListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 1199px) {
    flex-direction: row;
  }
`;

export const ImageItem = styled.img`
  margin-bottom: 1rem;
  padding: 0.2rem;
  width: 70px;
  height: 70px;
  object-fit: cover;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    transform: scale(1.1);
  }
  ${({ active }) =>
    active &&
    css`
      border: 1px solid #43715d;
      border-radius: 4px;
      &:hover {
        transform: initial;
      }
    `}
`;

export const ProductImageWrapper = styled.div`
  position: relative;
  padding-top: 100%;
  width: 100%;
  overflow: hidden;
`;

export const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const PriceItem = styled.p`
  margin-bottom: 0;
  color: #ff4d4f;
  font-size: 28px;
  font-weight: 700;
`;

export const InfoItem = styled.p`
  margin-bottom: 0;
`;

export const QuantityWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`;
export const QuantityButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 100%;
  width: 20px;
  border-bottom: none;
  border-top: none;
  border-radius: 0;
`;
export const QuantityImage = styled.img`
  object-fit: cover;
`;

export const ProductTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 44px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (min-width: 1200px) {
    font-size: 14px;
  }
`;

export const RelatedProduct = styled.div`
  padding: 1rem;
`;

export const ProductInfoWrapper = styled(Row)`
  margin: 0 auto 1rem;
  width: 90%;
  max-width: 1280px;
  @media screen and (max-width: 575px) {
    width: 95%;
  }
`;

export const SectionLabelWrapper = styled.div`
  position: relative;
  margin: 5px auto 3px;
  width: 90%;
  max-width: 1280px;
  @media screen and (max-width: 575px) {
    width: 95%;
  }
  &::before {
    position: absolute;
    content: "";
    bottom: 0;
    width: 100%;
    height: 3px;
    background-color: rgba(67, 113, 93, 1);
  }
`;
export const SectionTitle = styled.div`
  display: inline-block;
  margin-right: 10px;
  padding: 6px 12px;
  width: fit-content;
  background-color: #43715d;
  color: white;
  font-size: 17px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  @media screen and (max-width: 575px) {
    font-size: 16px;
    padding: 6px 8px;
    margin-right: 5px;
  }
  ${({ active, tab }) =>
    tab &&
    !active &&
    css`
      background-color: transparent;
      font-weight: 600;
      color: #43715d;
      &:hover {
        color: #99a799;
      }
    `}
`;

export const AvailableAmount = styled.div`
  font-size: 13px;
  margin: 0;
  @media screen and (min-width: 1200px) {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 14px;
  }
`;

export const LeftSection = styled(Col)`
  padding-right: 0;
  @media screen and (min-width: 992px) {
    padding-right: 10px;
  }
`;

export const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const ContentSection = styled.div`
  position: relative;
  height: 500px;
  overflow: hidden;
`;
export const GradientSection = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 200px;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255)
  );
`;

const NArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
};

const PArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
};

export const NextArrowSection = styled(NArrow)`
  right: 10px;
  top: 40%;
  &::before {
    font-size: 30px;
  }
`;
export const PrevArrowSection = styled(PArrow)`
  left: 0px;
  top: 40%;
  z-index: 1;
  &::before {
    font-size: 30px;
  }
`;
