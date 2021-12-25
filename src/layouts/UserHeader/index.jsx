import React, { useState } from "react";
import { useHistory, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Dropdown, Badge, Button, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { logoutAction, toggleSidebarAction } from "../../redux/actions";
import { ROUTER } from "../../constants/router";
import { NAV_BAR, DROPDOWN } from "./constants";

import logoImage from "../../assets/images/logo.png";

import * as S from "./styles";

const UserHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [active, setActive] = useState(-1);

  const history = useHistory();

  const { userInfo } = useSelector((state) => state.authReducer);
  const { cartList } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  let prevScrollPos = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentScrollPos = window.scrollY;
    if (prevScrollPos > currentScrollPos || prevScrollPos === 0) {
      setIsSticky(false);
    } else {
      setIsSticky(true);
    }
    prevScrollPos = currentScrollPos;
  });

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
  };

  const renderNavBar = () => {
    return NAV_BAR.map((navItem, navIndex) => (
      <S.NavbarItem key={navIndex} onClick={() => history.push(navItem.path)}>
        <S.NavbarLink
          active={active === navIndex}
          onClick={() => setActive(navIndex)}
        >
          {navItem.title}
        </S.NavbarLink>
      </S.NavbarItem>
    ));
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
    <>
      <S.HeaderWrapper isSticky={isSticky}>
        <S.HeaderContainer>
          <S.LogoContainer onClick={() => history.push(ROUTER.USER.HOME)}>
            <S.ImageLogo src={logoImage} alt="logo" />
            <S.LogoTitle>
              BOOK
              <br />
              WORM
            </S.LogoTitle>
          </S.LogoContainer>
          <S.ToggleIcon onClick={() => dispatch(toggleSidebarAction())} />
          <S.NavbarMenu>{renderNavBar()}</S.NavbarMenu>
          <S.FeatureContainer>
            <Badge count={cartList.data.length} overflowCount={99}>
              <Button
                shape="circle"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={() => history.push(ROUTER.USER.CART)}
              />
            </Badge>
            {userInfo?.data.name ? (
              <Dropdown
                arrow
                placement="bottomRight"
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
                <S.AvatarWrapper size="large" src={userInfo.data?.avatar} />
              </Dropdown>
            ) : (
              <S.LoginButton
                type="primary"
                ghost
                onClick={() => history.push(ROUTER.LOGIN)}
              >
                Đăng nhập
              </S.LoginButton>
            )}
          </S.FeatureContainer>
        </S.HeaderContainer>
      </S.HeaderWrapper>
      <S.EmptyHeader />
    </>
  );
};

export default UserHeader;
