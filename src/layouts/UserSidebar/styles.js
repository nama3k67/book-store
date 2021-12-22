import styled from "styled-components";
import { Menu, Avatar, Button } from "antd";

export const SidebarContainer = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0;
`;
export const SidebarMenu = styled(Menu)``;

export const AvatarWrapper = styled(Avatar)`
  background-color: #43715d;
  vertical-align: middle;
  cursor: pointer;
`;
export const LoginButton = styled(Button)`
  display: block;
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  display: inline-block;
  margin: auto 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 500;
`;

export const MenuTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 17px;
`;
