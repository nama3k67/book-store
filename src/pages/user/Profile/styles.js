import styled, { css } from "styled-components";
import { Avatar } from "antd";
import { CloseCircleOutlined, FileSearchOutlined } from "@ant-design/icons";

import { Container } from "../../../components/Container";

export const ProfileWrapper = styled.div`
  padding: 0.5rem 0;
  width: 100%;
  background-color: #efefef;
`;

export const ProfileContainer = styled(Container)`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  margin-right: 0.5rem;
  flex-direction: column;
  flex: 20%;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 767px) {
    margin-right: 0;
    margin-bottom: 0.7rem;
    flex: 100%;
  }
`;

export const RightContainer = styled.div`
  padding: 16px;
  background-color: white;
  flex: 80%;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 767px) {
    flex: 100%;
  }
`;

export const TabItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 50px;
  cursor: pointer;

  &:hover {
    color: #43715d;
  }

  ${({ active }) =>
    active &&
    css`
      color: #43715d;
      background-color: #d4e5de;
      border-right: 3px solid #43715d;
    `}
`;

export const FormTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

export const FormContainer = styled.div`
  padding: 0 9rem;
  margin-top: 1.5rem;

  @media screen and (max-width: 1199px) {
    padding: 0 3rem;
  }

  @media screen and (max-width: 991px) {
    padding: 0 1rem;
  }
`;

export const AvailableAmount = styled.div`
  font-size: 13px;
  margin: 0;

  @media screen and (min-width: 1200px) {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 14px;
  }
`;

export const ProductTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 44px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    color: #43715d;
  }
  @media screen and (min-width: 1200px) {
    font-size: 14px;
  }
`;

export const CloseIcon = styled(CloseCircleOutlined)`
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const TableTitle = styled.div`
  font-size: 15px;
  font-weight: 500;
`;

export const ExpandedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.7rem;
  font-size: 15px;
  img {
    width: 80px;
    height: 80px;
  }
  p {
    margin-right: 0.5rem;
    margin-left: 0.3rem;
    font-weight: 600;
  }
  span {
    margin-left: 0.5rem;
  }
`;

export const BookTitle = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    color: #43715d;
  }
`;

export const TableVer1 = styled.div`
  display: block;
  @media screen and (max-width: 1199px) {
    display: none;
  }
`;
export const TableVer2 = styled.div`
  display: none;
  @media screen and (max-width: 1199px) {
    display: block;
  }
`;
export const DetailItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0.8rem 0;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  strong,
  p {
    margin-left: 6px;
  }
`;
export const DetailProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;

  p {
    font-size: 14px;
  }
  img {
    width: 90px;
    height: 90px;
  }
`;
export const BookTitleVer2 = styled(BookTitle)`
  width: 280px;
  font-weight: 500;
  @media screen and (max-width: 450px) {
    width: 200px;
  }
  @media screen and (max-width: 380px) {
    width: 160px;
  }
`;
export const EmptyWishlistContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    width: 35%;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 16px;
    margin-bottom: 16px;
    text-align: center;
  }

  @media screen and (max-width: 1199px) {
    img {
      width: 42%;
    }
  }
  @media screen and (max-width: 991px) {
    img {
      width: 50%;
    }
  }
  @media screen and (max-width: 767px) {
    img {
      width: 70%;
    }
  }
  @media screen and (max-width: 575px) {
    img {
      width: 90%;
    }
    p {
      font-size: 15px;
      margin-bottom: 10px;
      padding: 0 10px;
    }
  }
`;

export const DetailIcon = styled(FileSearchOutlined)`
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #43715d;
  }
`;

export const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  padding-top: 8%;
  width: 100%;
`;
export const AvatarWrapper = styled(Avatar)`
  object-fit: cover;

  .profile-image {
    cursor: pointer;
    overflow: hidden;
    margin: 0;
    width: 150px;
    height: 150px;
    border: 2px solid #eee;
  }
  .btn-upload {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .avatar-upload {
    display: inline-block;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
