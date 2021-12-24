import styled from "styled-components";
import { Col } from "antd";

import { Container } from "../../../components/Container";

export const BlogsContainer = styled.div`
  padding: 0.5rem 0;
  width: 100%;
`;

export const BlogsWrapper = styled(Container)``;
export const LeftSideWrapper = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
`;
export const RightSideWrapper = styled.div``;
export const BlogWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &:last-of-type {
    border-bottom: none;
  }
  img {
    cursor: pointer;
  }
  @media screen and (max-width: 705px) {
    img {
      width: 80%;
      height: 80%;
    }
  }
  @media screen and (max-width: 656px) {
    img {
      width: 100%;
      height: 100%;
      padding: 0 1rem 1rem;
    }
    flex-direction: column;
  }
  @media screen and (max-width: 400px) {
    img {
      padding: 0 0 1rem;
    }
  }
`;

export const BlogInfoWrapper = styled.div`
  padding-left: 1rem;
  h5 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 5px;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover {
      color: #43715d;
    }
  }
  time,
  p {
    margin-bottom: 1rem;
    padding-right: 0.5rem;
    color: #767676;
    font-size: 12px;
  }
  p {
    font-size: 15px;
    margin-bottom: 0;
  }
  @media screen and (max-width: 705px) {
    h5 {
      font-size: 18px;
    }
    p {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 656px) {
    h5 {
      font-size: 20px;
    }
    p {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 400px) {
    h5 {
      font-size: 18px;
    }
    p {
      font-size: 14px;
    }
  }
`;
export const SectionLabelWrapper = styled.div`
  position: relative;
  margin: 0 auto 3px;
  width: 100%;

  &::before {
    position: absolute;
    content: "";
    bottom: 0;
    width: 100%;
    height: 3px;
    background-color: rgba(67, 113, 93, 1);
  }
`;
export const SectionTitle = styled.div`
  display: inline-block;
  margin-right: 10px;
  padding: 6px 12px;
  width: fit-content;
  background-color: #43715d;
  color: white;
  font-size: 17px;
  font-weight: 400;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

export const FeatureBlogWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0;
  img {
    width: 35%;
    height: 35%;
    cursor: pointer;
  }
`;

export const InfoFeatureBlogWrapper = styled.div`
  padding: 0.3rem 0.5rem;
  h5 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 5px;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover {
      color: #43715d;
    }
  }
  p {
    margin-bottom: 0.5rem;
    padding-right: 0.5rem;
    color: #767676;
    font-size: 12px;
  }
`;

export const ContentWrapper = styled.div`
  padding: 0.5rem;
  h2 {
    font-size: 16px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
