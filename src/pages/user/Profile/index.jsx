import React, { useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, generatePath } from "react-router-dom";
import { Row, Col, Modal, Space, notification, Button, Slider } from "antd";
import AvatarEditor from "react-avatar-editor";
import {
  CameraOutlined,
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  UploadOutlined,
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
  const avatarEditor = useRef(null);

  const [activeTab, setActiveTab] = useState(page);
  const [avatar, setAvatar] = useState(userInfo.data?.avatar);
  const [visible, setVisible] = useState(false);
  const [zoomValue, setZoomValue] = useState(1);
  const [rotateValue, setRotateValue] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

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
      notification.warning({ message: "Ảnh không tồn  tại" });
    } else if (file.size > 1024 * 1024) {
      notification.warning({ message: "Ảnh không không được nặng quá 1mb" });
    } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
      notification.warning({ message: "Ảnh không đúng định dạng" });
    } else {
      setAvatar(file);
      setZoomValue(1);
      setRotateValue(0);
      if (!isEdit) {
        setIsEdit(true);
      }
    }
  };
  const updateAvatar = async () => {
    let media;
    if (avatar)
      media = await ImageUpload([
        avatarEditor.current.getImage().toDataURL(),
        avatar,
      ]);
    if (media) {
      dispatch(
        updateUserInfoAction({
          id: userInfo.data.id,
          data: {
            avatar: media[1].url,
            thumbnail: media[0].url,
          },
        })
      );
      setVisible(false);
      setZoomValue(1);
      setRotateValue(0);
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

  const handleCancel = () => {
    setAvatar(userInfo.data?.avatar);
    setZoomValue(1);
    setRotateValue(0);
    if (isEdit) {
      setIsEdit(false);
    } else {
      setVisible(false);
    }
  };

  const handleOk = () => {
    updateAvatar();
  };

  return (
    <>
      <TopWrapper titlePage="Trang cá nhân" breadcrumb={BREADCRUMB} />
      <S.ProfileWrapper>
        <S.ProfileContainer>
          <S.LeftContainer>
            <S.AvatarContainer>
              <S.AvatarWrapper>
                <img src={userInfo.data.thumbnail} alt={userInfo.data.name} />
                <Button
                  className="btn-upload"
                  shape="circle"
                  onClick={() => {
                    setVisible(true);
                    setIsEdit(false);
                    setAvatar(userInfo.data?.avatar);
                  }}
                  icon={<CameraOutlined />}
                />
              </S.AvatarWrapper>

              <Modal
                visible={visible}
                title={
                  <p
                    style={{ fontSize: 20, fontWeight: 600, color: "#43715d" }}
                  >
                    Ảnh cá nhân
                  </p>
                }
                bodyStyle={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  padding: 0,
                }}
                closable={false}
                onCancel={() => setVisible(false)}
                footer={null}
              >
                <>
                  {isEdit ? (
                    <>
                      <S.AvatarEditorWrapper>
                        <AvatarEditor
                          ref={avatarEditor}
                          image={avatar}
                          width={250}
                          height={250}
                          color={[255, 255, 255, 0.6]}
                          scale={zoomValue}
                          rotate={rotateValue}
                          borderRadius={150}
                        />
                      </S.AvatarEditorWrapper>
                      <Row
                        style={{ width: "100%", padding: "0.7rem 1rem" }}
                        justify="center"
                        align="middle"
                        gutter={[16, 16]}
                      >
                        <Col xs={24} sm={24} md={12}>
                          <b style={{ fontSize: 15 }}>Zoom</b>
                          <Slider
                            defaultValue={1}
                            value={zoomValue}
                            step={0.01}
                            marks={{ 1: "1", 2: "2" }}
                            min={1}
                            max={2}
                            onChange={(value) => setZoomValue(value)}
                          />
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                          <b style={{ fontSize: 15 }}>Rotate</b>
                          <Slider
                            defaultValue={1}
                            value={rotateValue}
                            marks={{ 0: "0°", 180: "180°" }}
                            step={1}
                            min={0}
                            max={180}
                            onChange={(value) => setRotateValue(value)}
                          />
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <S.AvatarWrapper
                      style={{ width: 250, height: 250, margin: "42px 8px" }}
                    >
                      <img
                        src={userInfo.data.thumbnail}
                        alt={userInfo.data.name}
                      />
                    </S.AvatarWrapper>
                  )}

                  <S.AvatarEditorFooter justify="space-between">
                    <Col>
                      <Button
                        type="primary"
                        ghost
                        icon={<UploadOutlined />}
                        onClick={() => {
                          inputFile.current.click();
                        }}
                      >
                        Tải ảnh lên
                      </Button>
                      <input
                        ref={inputFile}
                        type="file"
                        hidden
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={(e) => changeAvatar(e)}
                      />
                    </Col>
                    <Col>
                      <Button
                        type="danger"
                        icon={<CloseOutlined />}
                        onClick={handleCancel}
                        style={{ marginRight: 10 }}
                      >
                        Hủy
                      </Button>
                      {isEdit ? (
                        <Button
                          type="primary"
                          icon={<CheckOutlined />}
                          onClick={handleOk}
                        >
                          Lưu
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          icon={<EditOutlined />}
                          onClick={() => setIsEdit(true)}
                        >
                          Sửa ảnh
                        </Button>
                      )}
                    </Col>
                  </S.AvatarEditorFooter>
                </>
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
