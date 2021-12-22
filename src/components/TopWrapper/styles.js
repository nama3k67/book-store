import styled from "styled-components";
import topWrapperImage from "../../assets/images/top-wrapper.jpg";

export const TopContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  width: 100%;
  height: 150px;
  background-image: url(${topWrapperImage});
  background-size: cover;
  background-position: 60% 55%;
  background-repeat: no-repeat;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(67, 113, 93, 0.7);
  }

  & .ant-breadcrumb-link,
  & .ant-breadcrumb-separator {
    position: relative;
    color: white;
    z-index: 1;
  }
`;
export const TopTitle = styled.h2`
  margin-top: 8px;
  font-size: 40px;
  font-weight: 600;
  color: #ffc286;
  z-index: 1;

  @media screen and (max-width: 575px) {
    font-size: 32px;
  }
`;
