import styled, { css } from "styled-components";
import { Row, Col } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export const LoginContainer = styled(Row)`
  width: 100%;
  min-height: 100vh;
  background: rgb(106, 168, 141);
  background: linear-gradient(
    57deg,
    rgba(106, 168, 141, 1) 46%,
    rgba(122, 192, 234, 0.5) 100%
  );
`;

export const LoginBackground = styled(Col)`
  background-image: url("https://images.unsplash.com/photo-1569728723358-d1a317aa7fba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;

  filter: brightness(110%);
`;

export const LoginForm = styled.div`
  width: 100%;
  margin: 32px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media screen and (max-width: 575px) {
    margin: 32px 8px;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 15px;
  margin-bottom: 1rem;
`;

export const HomeIcon = styled(HomeOutlined)`
  font-size: 19px;
  cursor: pointer;
  @media screen and (max-width: 575px) {
    font-size: 16px;
  }
  &:hover {
    color: #43715d;
  }
`;
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const LoginTitle = styled.h2`
  display: inline-block;
  margin-right: 10px;
  padding: 0 8px 3px;
  width: fit-content;
  border-bottom: 3px solid #43715d;
  font-size: 22px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  color: #43715d;
  font-weight: 500;

  @media screen and (max-width: 575px) {
    font-size: 18px;
  }
  ${({ active }) =>
    !active &&
    css`
      border-bottom: none;
      background-color: transparent;
      cursor: pointer;
      color: black;
      font-weight: 400;
      &:hover {
        color: #99a799;
      }
    `}
`;

export const NoteWrapper = styled.div`
  margin-top: 0.7rem;
  font-size: 16px;
  @media screen and (max-width: 575px) {
    font-size: 14px;
  }
`;
