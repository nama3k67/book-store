import styled, { css } from "styled-components";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Avatar, Space } from "antd";

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 70px;
  width: 100%;
  background-color: white;
  transition: all 0.3s ease-in-out;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 /5%);

  ${({ isSticky }) =>
    isSticky &&
    css`
      transform: translateY(-100%);
    `}
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  height: 100%;
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;

  @media screen and (max-width: 575px) {
    width: 95%;
  }
`;

export const SpaceWrapper = styled(Space)`
  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
`;

export const ToggleIcon = styled(MenuOutlined)`
  display: none;
  font-size: 21px;
  cursor: pointer;

  &:hover {
    color: #43715d;
  }
  @media screen and (max-width: 1100px) {
    order: 1;
    display: block;
  }
`;

export const NavbarMenu = styled.ul`
  order: 2;
  display: inline-flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  height: 100%;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

export const NavbarItem = styled.li`
  display: inline-block;
  position: relative;
  height: 100%;
`;

export const NavbarLink = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin: 0 9px;
  height: 100%;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    font-size: 13px;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 0%;
    height: 2.3px;
    background-color: rgba(67, 113, 93, 1);
    transition: all 0.3s ease-in-out;
  }
  &::before {
    right: 50%;
  }
  &::after {
    left: 50%;
  }
  &:hover::before,
  &:hover::after {
    width: 50%;
  }
  &:hover {
    color: rgba(67, 113, 93, 1);
  }
`;

export const FeatureContainer = styled.div`
  order: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;
export const AvatarWrapper = styled(Avatar)`
  margin-left: 16px;
  background-color: #43715d;
  vertical-align: middle;
  cursor: pointer;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;
export const LoginButton = styled(Button)`
  display: block;
  margin-left: 16px;
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;
export const UserIcon = styled(UserOutlined)`
  display: block;
  font-size: 180%;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

export const EmptyHeader = styled.div`
  height: 70px;
`;

export const LogoContainer = styled.div`
  order: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;

  @media screen and (max-width: 1100px) {
    order: 2;
  }
`;
export const ImageLogo = styled.img`
  padding: 10px 0;
  max-height: 100%;
  object-fit: cover;

  @media screen and (max-width: 767px) {
    padding: 13px 0;
  }
`;
export const LogoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 100%;
  font-family: sans-serif;
  color: transparent;
  -webkit-background-clip: text;
  background-image: linear-gradient(
    45deg,
    rgba(106, 168, 141, 1) 0%,
    rgba(67, 113, 93, 1) 100%
  );
  font-family: "Permanent Marker", cursive;
  font-size: 22px;
  text-align: center;
  line-height: 85%;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    font-size: 19px;
  }
`;
