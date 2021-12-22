import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, generatePath } from "react-router-dom";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

import TopWrapper from "../../../components/TopWrapper";
import OrderHistory from "./components/OrderHistory";
import Information from "./components/Information";
import ChangePassword from "./components/ChangePassword";
import WishList from "./components/WishList";

import { BREADCRUMB, PROFILE_TABS } from "./constants";
import { ROUTER } from "../../../constants/router";

import { logoutAction } from "../../../redux/actions";
import * as S from "./styles";

const ProfilePage = () => {
  const { page } = useParams();

  const [activeTab, setActiveTab] = useState(page);

  const { userInfo } = useSelector((state) => state.authReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  const renderProfileTab = () => {
    return PROFILE_TABS.map((tabItem, tabIndex) => (
      <S.TabItem
        key={`tab-${tabIndex}`}
        active={activeTab === tabItem.path}
        onClick={() => {
          setActiveTab(tabItem.path);
          if (tabItem.path === "logout") {
            localStorage.removeItem("userInfo");
            dispatch(logoutAction());
          } else {
            history.push(
              generatePath(ROUTER.USER.PROFILE, {
                page: tabItem.path,
              })
            );
          }
        }}
      >
        <Space size={12}>
          {tabItem.icon}
          {tabItem.title}
        </Space>
      </S.TabItem>
    ));
  };

  const renderPage = useMemo(() => {
    setActiveTab(page);
    switch (page) {
      case "information":
        return <Information />;
      case "order-history":
        return <OrderHistory />;
      case "wishlist":
        return <WishList />;
      case "change-password":
        return <ChangePassword />;
      default:
        break;
    }
  }, [page]);

  return (
    <>
      <TopWrapper titlePage="Trang cá nhân" breadcrumb={BREADCRUMB} />
      <S.ProfileWrapper>
        <S.ProfileContainer>
          <S.LeftContainer>
            <S.AvatarContainer>
              <Avatar
                size={{ xs: 180, sm: 180, md: 145, lg: 150, xl: 180, xxl: 180 }}
                icon={<UserOutlined />}
              />
              <h2>{userInfo.data.name}</h2>
            </S.AvatarContainer>
            {renderProfileTab()}
          </S.LeftContainer>
          <S.RightContainer>{renderPage}</S.RightContainer>
        </S.ProfileContainer>
      </S.ProfileWrapper>
    </>
  );
};

export default ProfilePage;
