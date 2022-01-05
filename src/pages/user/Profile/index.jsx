import React, { useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, generatePath } from "react-router-dom";
import { Modal, Space, notification, Button, Slider } from "antd";
import AvatarEditor from "react-avatar-editor";
import {
  CameraOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import TopWrapper from "../../../components/TopWrapper";
import OrderHistory from "./components/OrderHistory";
import Information from "./components/Information";
import ChangePassword from "./components/ChangePassword";
import WishList from "./components/WishList";

import { BREADCRUMB, PROFILE_TABS } from "./constants";
import { ROUTER } from "../../../constants/router";

import { logoutAction, updateUserInfoAction } from "../../../redux/actions";
import * as S from "./styles";

const ProfilePage = () => {
  document.title = "Trang cá nhân";
  const { userInfo } = useSelector((state) => state.authReducer);

  const { page } = useParams();
  const inputFile = useRef(null);

  const [activeTab, setActiveTab] = useState(page);
  const [avatar, setAvatar] = useState("");
  const [visible, setVisible] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  const ImageUpload = async (images) => {
    let imgArr = [];
    for (const item of images) {
      const formData = new FormData();
      formData.append("file", item);
      formData.append("upload_preset", "r8gydait");
      formData.append("cloud_name", "dc5rbjpi6");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dc5rbjpi6/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      imgArr.push({ public_id: data.public_id, url: data.secure_url });
    }
    return imgArr;
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setVisible(false);
      notification.warning({ message: "Ảnh không tồn  tại" });
    } else if (file.size > 1024 * 1024) {
      setVisible(false);
      notification.warning({ message: "Ảnh không không được nặng quá 1mb" });
    } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setVisible(false);
      notification.warning({ message: "Ảnh không đúng định dạng" });
    } else {
      setAvatar(file);
    }
  };
  const updateAvatar = async () => {
    let media;
    if (avatar) media = await ImageUpload([avatar]);
    if (media) {
      dispatch(
        updateUserInfoAction({
          id: userInfo.data.id,
          data: {
            avatar: media[0].url,
          },
        })
      );
      setAvatar("");
      setVisible(false);
    }
  };

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
              <S.AvatarWrapper>
                <img
                  src={
                    avatar ? URL.createObjectURL(avatar) : userInfo.data.avatar
                  }
                  alt={userInfo.data.name}
                />
                <Button
                  className="btn-upload"
                  shape="circle"
                  onClick={() => {
                    // inputFile.current.click();
                    setVisible(true);
                  }}
                  icon={<CameraOutlined />}
                />
              </S.AvatarWrapper>
              <input
                ref={inputFile}
                type="file"
                hidden
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={(e) => changeAvatar(e)}
              />
              {visible && (
                <Space
                  align="center"
                  className={visible ? "btn-avatar active" : "btn-avatar"}
                >
                  <Button
                    onClick={() => {
                      updateAvatar();
                    }}
                    icon={<CheckOutlined />}
                  >
                    Ok
                  </Button>
                  <Button
                    onClick={() => {
                      setAvatar("");
                      setVisible(false);
                    }}
                    icon={<CloseOutlined />}
                  >
                    Huỷ
                  </Button>
                </Space>
              )}
              <Modal
                visible={visible}
                title="Ảnh cá nhân"
                onCancel={() => setVisible(false)}
              >
                <AvatarEditor
                  image={userInfo.data.avatar}
                  width={250}
                  height={250}
                  // border={50}
                  color={[255, 255, 255, 0.6]} // RGBA
                  // scale={1.2}
                  rotate={0}
                  borderRadius={150}
                />
              </Modal>
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
