import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, generatePath } from "react-router-dom";
import { Menu, Drawer, Dropdown } from "antd";

import LogoContainer from "../../components/LogoContainer";
import { logoutAction, toggleSidebarAction } from "../../redux/actions";
import { SIDE_BAR, DROPDOWN } from "./constants";
import { ROUTER } from "../../constants/router";

import * as S from "./styles";

const UserSidebar = () => {
  const { isShowSidebar } = useSelector((state) => state.commonReducer);
  const { userInfo } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const history = useHistory();

  const renderSidebarMenu = () => {
    return SIDE_BAR.map((sidebarItem, sidebarIndex) => (
      <Menu.Item
        key={sidebarIndex}
        onClick={() => history.push(sidebarItem.path)}
      >
        <S.MenuTitle>{sidebarItem.title}</S.MenuTitle>
      </Menu.Item>
    ));
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
  };
  const renderDropdown = () => {
    return DROPDOWN.map((dropdownItem, dropdownIndex) => (
      <Menu.Item
        key={dropdownIndex + 1}
        onClick={() =>
          history.push(
            generatePath(ROUTER.USER.PROFILE, {
              page: dropdownItem.page,
            })
          )
        }
      >
        {dropdownItem.name}
      </Menu.Item>
    ));
  };
  return (
    <Drawer
      title={<LogoContainer />}
      placement="left"
      closable={false}
      headerStyle={{ padding: "10px 24px" }}
      onClose={() => dispatch(toggleSidebarAction())}
      visible={isShowSidebar}
      bodyStyle={{ padding: "0px" }}
    >
      <div style={{ padding: "10px 24px", borderBottom: "2px solid black" }}>
        {userInfo?.data.name ? (
          <Dropdown
            arrow
            placement="bottomLeft"
            trigger={["click"]}
            overlay={
              <Menu>
                {userInfo.data.role === "admin" && (
                  <Menu.Item
                    key="0"
                    onClick={() => history.push(ROUTER.ADMIN.DASHBOARD)}
                  >
                    Trang Admin
                  </Menu.Item>
                )}
                {renderDropdown()}
                <Menu.Item key="logout" onClick={() => handleLogout()}>
                  Đăng xuất
                </Menu.Item>
              </Menu>
            }
          >
            <S.UserWrapper>
              <S.AvatarWrapper size="large" src={userInfo.data.avatar} />
              <S.Title> {userInfo.data.name}</S.Title>
            </S.UserWrapper>
          </Dropdown>
        ) : (
          <S.LoginButton
            type="primary"
            block
            onClick={() => history.push(ROUTER.LOGIN)}
          >
            Đăng nhập
          </S.LoginButton>
        )}
      </div>
      <Menu mode="inline" style={{ width: "100%" }}>
        {renderSidebarMenu()}
      </Menu>
    </Drawer>
  );
};

export default UserSidebar;
