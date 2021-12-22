import styled, { css } from "styled-components";
import { Col } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

import { Container } from "../../../components/Container";

export const CheckoutContainer = styled.div`
  padding: 0.5rem 0;
  width: 100%;
  background-color: #efefef;
`;

export const CheckoutWrapper = styled(Container)`
  margin-bottom: 1rem;
  padding: 0;
  border-radius: 4px;
`;

export const CheckoutHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const StepTitle = styled.div`
  font-size: 20px;
  font-weight: 500;

  @media screen and (max-width: 991px) {
    font-size: 16px;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
  @media screen and (max-width: 656px) {
    display: none;
  }
`;

export const FormWrapper = styled.div`
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  @media screen and (max-width: 991px) {
    margin-right: 0;
  }
  @media screen and (max-width: 575px) {
    padding: 1rem 0.6rem;
  }
`;
export const FormTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

export const InformationWrapper = styled.div`
  padding: 0 1rem;
  margin-bottom: 1rem;
  background-color: white;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const InformationTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  @media screen and (max-width: 1199px) {
    flex-direction: column;
  }
  @media screen and (max-width: 991px) {
    flex-direction: row;
  }
`;
export const ExpandSwitch = styled.span`
  font-size: 13px;
  cursor: pointer;
  color: rgb(13 92 182);
`;

export const ProductName = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
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
  padding: 5px 12px;
  width: fit-content;
  background-color: #43715d;
  color: white;
  font-size: 17px;
  font-weight: 400;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

export const LabelTitle = styled.div`
  margin-bottom: 0.4rem;
  font-size: 20px;
  font-weight: 600;
  color: #43715d;
  @media screen and (max-width: 575px) {
    font-size: 18px;
  }
`;

export const SuccessWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 600px;
  background-color: white;
  border-radius: 4px;
  h2 {
    margin: 5px 0 20px;
    text-align: center;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  @media screen and (max-width: 767px) {
    justify-content: center;
    h2 {
      font-size: 17px;
      padding: 0 0.8rem;
    }
    div {
      transform: scale(0.85);
    }
  }
  @media screen and (max-width: 575px) {
    height: 500px;
    div {
      flex-direction: column;
    }
  }
`;

export const SuccessImage = styled.img`
  margin: 1rem auto;
  width: 60%;
  object-fit: cover;
  @media screen and (max-width: 767px) {
    margin: -0.5rem auto 1rem;
  }
  @media screen and (max-width: 575px) {
    width: 80%;
  }
`;

export const TransportMethodWrapper = styled.div`
  display: grid;
  grid-template: repeat(3, auto) / repeat(2, auto);
  grid-gap: 0.4rem 1rem;
  width: 320px;
`;
export const JustifyWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const FirstMethodTitle = styled(JustifyWrapper)`
  grid-column: 1/2;
  grid-row: 1/2;
  font-size: 16px;
  font-weight: 500;
`;
export const SecondMethodTitle = styled(JustifyWrapper)`
  grid-column: 2/3;
  grid-row: 1/2;
  font-size: 16px;
  font-weight: 500;
`;
export const FirstOneContent = styled(JustifyWrapper)`
  grid-column: 1/2;
  grid-row: 2/3;
  text-align: center;
`;
export const FirstTwoContent = styled(JustifyWrapper)`
  grid-column: 2/3;
  grid-row: 2/3;
`;
export const SecondOneContent = styled(JustifyWrapper)`
  grid-column: 1/2;
  grid-row: 3/4;
  align-items: flex-end;
  text-align: center;
`;
export const SecondTwoContent = styled(JustifyWrapper)`
  grid-column: 2/3;
  grid-row: 3/4;
`;

export const RadioTitle = styled.div`
  display: inline;
  @media screen and (max-width: 767px) {
    font-size: 15px;
    font-weight: 500;
  }
  @media screen and (max-width: 400px) {
    font-size: 15px;
  }
`;

export const RatioGroupWrapper = styled(Col)`
  margin-top: 25.14px;
  @media screen and (max-width: 767px) {
    margin-top: 0;
  }
`;
export const ImageWrapper = styled.img`
  width: 80px;
  height: 40px;
  @media screen and (max-width: 575px) {
    width: 60px;
    height: 30px;
  }
`;

export const DescriptionWrapper = styled.div`
  display: none;
  color: #43715d;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
export const PaymentMethodContent = styled.div`
  display: none;
  padding: 1rem 0.1rem;
  ${({ active }) =>
    active &&
    css`
      display: block;
    `}
`;
export const CardWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  width: 180px;
  height: 48px;
  border-radius: 4px;
  border: 2px solid #f1f1f1;
  position: relative;
  vertical-align: top;
  font-size: 13px;

  &:hover {
    border: 2px solid rgba(67, 113, 93, 0.5);
  }
  ${({ active }) =>
    active &&
    css`
      border: 2px solid #43715d;
      &:hover {
        border: 2px solid #43715d;
      }
    `}
  @media screen and (max-width: 780px) {
    width: 135px;
    height: 37px;
  }
  @media screen and (max-width: 575px) {
    width: 120px;
    height: 40px;
    font-size: 12px;
    padding-left: 4px;
  }
`;

export const ActiveCircle = styled(CheckCircleFilled)`
  display: none;
  color: #43715d;
  font-size: 17px;
  ${({ active }) =>
    active &&
    css`
      display: block;
      position: absolute;
      top: -12px;
      right: -10px;
    `}
`;
