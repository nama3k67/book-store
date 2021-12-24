import styled from "styled-components";
import { Button, Image, Col, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Container } from "../../../components/Container";

export const CartContainer = styled.div`
  padding: 0.5rem 0;
  width: 100%;
  background-color: #efefef;
`;

export const CartWrapper = styled(Container)`
  margin-bottom: 1rem;
  padding: 0;
  border-radius: 4px;
`;

export const CartProductsContainer = styled(Col)`
  padding-right: 0;
  margin-bottom: 1rem;
  @media screen and (min-width: 1199px) {
    padding-right: 8px;
  }
`;

export const SectionsContainer = styled(Col)`
  padding-right: 0;
  @media screen and (min-width: 1199px) {
    padding-left: 8px;
  }
`;

export const CartProductsWrapper = styled.div`
  margin-right: 10px;
  margin-bottom: 3px;
  width: 100%;
  background-color: white;
  border-radius: 4px;
`;
export const CartSummaryWrapper = styled.div`
  margin-bottom: 0.3rem;
  width: 100%;
  background-color: white;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const CartHeader = styled(Row)`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  @media screen and (max-width: 575px) {
    font-size: 14px;
  }
`;

export const CartTitle = styled.p`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
export const CartProductItem = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const ProductImage = styled(Image)`
  margin: 0.5rem;
  width: 120px;
  height: 160px;
  object-fit: cover;
  cursor: pointer;

  @media screen and (max-width: 991px) {
    width: 90px;
    height: 120px;
  }
`;

export const CartDetailContainer = styled.div`
  display: grid;
  grid-template: repeat(4, auto) / repeat(6, auto);
  padding-left: 0.5rem;
  @media screen and (max-width: 410px) {
    padding-left: 1.1rem;
  }
  @media screen and (max-width: 380px) {
    padding-left: 1.8rem;
  }
`;
export const FirstCartDetail = styled.div`
  width: fit-content;
  grid-column: 1/2;
  grid-row: 1/2;
  @media screen and (max-width: 575px) {
    grid-column: 2/3;
    grid-row: 1/2;
  }
  @media screen and (max-width: 375px) {
    grid-column: 3/4;
  }
`;
export const SecondCartDetail = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  text-align: center;
  @media screen and (max-width: 767px) {
    grid-column: 1/2;
    grid-row: 2/3;
  }
  @media screen and (max-width: 575px) {
    grid-column: 2/3;
    grid-row: 2/3;
  }
  @media screen and (max-width: 375px) {
    grid-column: 3/4;
  }
`;
export const ThirdCartDetail = styled.div`
  grid-column: 3/4;
  grid-row: 1/2;
  @media screen and (max-width: 767px) {
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  @media screen and (max-width: 575px) {
    grid-column: 2/3;
    grid-row: 3/4;
    display: block;
  }
  @media screen and (max-width: 375px) {
    grid-column: 3/4;
  }
`;
export const FourthCartDetail = styled.div`
  grid-column: 4/5;
  grid-row: 1/2;

  @media screen and (max-width: 767px) {
    grid-column: 3/4;
    grid-row: 2/3;
    text-align: center;
  }
  @media screen and (max-width: 575px) {
    grid-column: 2/3;
    grid-row: 4/5;
    text-align: left;
  }
  @media screen and (max-width: 375px) {
    grid-column: 3/4;
  }
`;
export const FifthCartDetail = styled.div`
  grid-column: 6/7;
  grid-row: 1/2;
  @media screen and (max-width: 767px) {
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  @media screen and (max-width: 575px) {
    grid-column: 5/6;
    grid-row: 2/3;
  }
`;

export const ProductTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 0.5rem;
  width: 180px;
  font-weight: 600;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    color: #43715d;
  }
  @media screen and (max-width: 991px) {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 0.2rem;
  }
  @media screen and (max-width: 375px) {
    width: fit-content;
  }
`;

export const AvailableQuantity = styled.p`
  font-weight: 400;
  font-size: 14px;
  @media screen and (max-width: 575px) {
    display: none;
  }
`;
export const ProductPrice = styled.p`
  font-size: 17px;
  font-weight: 400;

  @media screen and (max-width: 991px) {
    font-size: 15px;
  }
`;

export const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;

  @media screen and (max-width: 991px) {
    transform: scale(0.85);
  }
  @media screen and (max-width: 575px) {
    margin-left: -8px;
  }
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
export const SectionLabelWrapper = styled.div`
  position: relative;
  margin: 0 auto 3px;
  width: 100%;

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
  font-weight: 400;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;
export const EmptyCartContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 65px auto 30px;
  height: 600px;
  background-color: white;
  border-radius: 4px;

  img {
    width: 38%;
  }
  p {
    font-size: 17px;
    margin-bottom: 10px;
    text-align: center;
  }

  @media screen and (max-width: 1199px) {
    img {
      width: 42%;
    }
  }
  @media screen and (max-width: 991px) {
    img {
      width: 50%;
    }
  }
  @media screen and (max-width: 767px) {
    img {
      width: 70%;
    }
  }
  @media screen and (max-width: 575px) {
    img {
      width: 90%;
    }
    p {
      margin-bottom: 10px;
      padding: 0 10px;
    }
  }
`;

export const DeleteIcon = styled(DeleteOutlined)`
  font-size: 24px;
  color: black;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;
