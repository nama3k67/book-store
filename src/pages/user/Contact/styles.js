import styled from "styled-components";
import { Col } from "antd";
import { Container } from "../../../components/Container";

export const ContactContainer = styled.div`
  padding: 0.5rem 0;
  width: 100%;
  background-color: #efefef;
`;

export const ContactWrapper = styled(Container)`
  padding: 0;
  border-radius: 4px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const LeftSectionContainer = styled(Col)`
  padding: 1rem 3rem;
  background-color: #43715d;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  color: white;
  filter: brightness(115%);

  p {
    margin: 1.5rem 0;
    font-size: 15px;
    text-align: center;
  }
  @media screen and (max-width: 991px) {
    padding: 1rem 1rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    p {
      margin-top: 2.5rem;
    }
  }
`;
export const RightSectionContainer = styled(Col)`
  padding: 1rem 3rem;
  color: #43715d;
  @media screen and (max-width: 991px) {
    padding: 1rem 1rem;
  }
`;

export const TitleSection = styled.div`
  margin-bottom: 0.5rem;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
`;

export const ContactItemWrapper = styled(Col)`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  span {
    font-size: 15px;
    cursor: pointer;
    vertical-align: center;
  }
  @media screen and (max-width: 991px) {
    margin: 1rem 0;
  }
`;
export const FormTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
