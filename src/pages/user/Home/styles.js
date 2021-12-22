import styled, { css } from "styled-components";
import { Row, Input } from "antd";

import { Container } from "../../../components/Container";
import registerImage from "../../../assets/images/register_image.jpg";

export const HomeContainer = styled.div`
  width: 100%;
  background-color: #efefef;
`;

export const SlideContainer = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  margin-bottom: 1.3rem;
  width: 100%;
  background-color: #e0ede7;
  filter: brightness(108%);
`;

export const SlidesWrapper = styled(Container)`
  background-color: transparent;
  padding: 10px 0;
`;

export const SlideWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  width: 100%;
  overflow: hidden;
  border: 1px solid rgb(0, 0, 0, 0.1);
  border-radius: 5px;
`;

export const Slide = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const HomeImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 992px) {
    flex-direction: row;
  }
  @media screen and (max-width: 575px) {
    flex-direction: column;
  }
`;

export const HomeImage = styled.img`
  width: 100%;
  height: 49%;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
  @media screen and (max-width: 992px) {
    width: 49%;
    height: 100%;
  }
  @media screen and (max-width: 575px) {
    width: 100%;
    margin: 0.3rem 0;
  }
`;
export const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const NArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
};

const PArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
};

export const NextArrow = styled(NArrow)`
  right: 35px;
  &::before {
    font-size: 40px;
    color: white;
  }
  @media screen and (max-width: 575px) {
    &::before {
      font-size: 30px;
    }
  }
`;
export const PrevArrow = styled(PArrow)`
  left: 10px;
  z-index: 1;
  &::before {
    font-size: 40px;
    color: white;
  }
  @media screen and (max-width: 575px) {
    &::before {
      font-size: 30px;
    }
  }
`;
export const NewProductContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto 1rem;
  padding-bottom: 1rem;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;
export const NewProductContent = styled.div`
  flex: 20%;
  padding: 10px;
  @media screen and (max-width: 991px) {
    flex: 25%;
    ${({ i }) =>
      (i === 8 || i === 9) &&
      css`
        display: none;
      `}
  }
  @media screen and (max-width: 800px) {
    flex: 33.33%;
    ${({ i }) =>
      i !== 9 &&
      css`
        display: block;
      `}
  }
  @media screen and (max-width: 576px) {
    flex: 50%;
    ${({ i }) =>
      (i === 8 || i === 9) &&
      css`
        display: none;
      `}
  }
`;

export const SectionTitleContainer = styled.div``;

export const SectionContainer = styled(Container)`
  margin: 0 auto 1rem;
  background-color: #fff;
`;

export const ProductContainer = styled.div`
  padding: 10px;
`;

export const NextArrowSection = styled(NArrow)`
  right: 20px;
  top: 40%;
  &::before {
    font-size: 30px;
  }
`;
export const PrevArrowSection = styled(PArrow)`
  left: 10px;
  top: 40%;
  z-index: 1;
  &::before {
    font-size: 30px;
  }
`;

export const TypesWrapper = styled(Container)`
  margin: 1rem auto;
  padding: 1rem 1.5rem 2rem;
  background-color: #e0ede7;
  border-radius: 4px;
  filter: brightness(108%);
`;
export const TypeTitle = styled.div`
  position: relative;
  display: block;
  width: fit-content;
  padding: 0.5rem;
  margin: 0 auto 1rem;
  font-size: 28px;
  font-weight: 500;

  &::before {
    position: absolute;
    content: "";
    left: 25%;
    bottom: 0;
    width: 50%;
    height: 2.5px;
    background-color: rgba(67, 113, 93, 1);
  }
`;
export const TypeItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 75%;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
    transition: all ease-in-out 0.4s;
    filter: brightness(65%);
  }
  &:hover img {
    transform: scale(1.2);
    filter: brightness(80%);
  }
  &:hover p::after {
    left: 25%;
    width: 50%;
  }
`;

export const TypeContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  p {
    display: relative;
    margin-bottom: 10px;
    color: white;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 20px;
    &::after {
      position: absolute;
      content: "";
      left: 35%;
      bottom: 0;
      width: 30%;
      height: 3px;
      background-color: white;
      transition: all 150ms linear;
    }
  }
`;

export const CategoriesWrapper = styled(Row)`
  margin: 0 auto;
  width: 60%;
  max-width: 1280px;
  @media screen and (max-width: 410px) {
    width: 90%;
  }
`;
export const CategoriesTitle = styled.div`
  position: relative;
  display: block;
  margin: 0 auto 1.5rem;
  padding: 10px 0 5px;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  width: fit-content;

  &::before {
    position: absolute;
    content: "";
    left: 25%;
    bottom: 0;
    width: 50%;
    height: 2.5px;
    background-color: rgba(67, 113, 93, 1);
  }
`;
export const CategoryContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const CategoryImage = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: all ease-in-out 0.4s;

  &:hover {
    transform: scale(1.3);
  }
`;
export const CategoryTitle = styled.p`
  margin-top: 0.5rem;
  cursor: pointer;
  &:hover {
    color: rgba(67, 113, 93, 1);
  }
`;

export const NewProductHeader = styled(Container)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem 0;
  background-color: white;
  &::before {
    position: absolute;
    content: "";
    bottom: 0;
    width: calc(100% - 1rem);
    height: 3px;
    background-color: rgba(67, 113, 93, 1);
  }
`;
export const NewProductTitle = styled.div`
  padding: 4px 12px;
  color: white;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  width: fit-content;
  background-color: rgba(67, 113, 93, 1);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const RegisterFormContainer = styled(Container)`
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem auto 1rem;
  padding: 80px 0;
  color: white;
  background-image: url(${registerImage});
  background-position: 50% 60%;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  border-radius: 4px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(67, 113, 93, 0.5);
  }
  h2 {
    z-index: 1;
    color: white;
    font-size: 36px;
    font-weight: 600;
  }
  p {
    z-index: 1;
    font-size: 16px;
    max-width: 550px;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

export const FormContainer = styled(Input.Group)`
  margin: 0 auto;
  width: 90%;
  max-width: 600px;
`;
