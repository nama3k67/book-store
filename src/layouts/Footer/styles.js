import styled from "styled-components";
import { Container } from "../../components/Container";

export const FooterWrapper = styled.div`
  padding-top: 2rem;
  width: 100%;
  max-height: fit-content;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const FooterContainer = styled(Container)`
  height: 100%;
  margin-bottom: 0.5rem;
`;

export const ItemTitle = styled.h4`
  margin-bottom: 20px;
  font-size: 17px;
  font-weight: 800;
  line-height: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
  word-break: break-all;
`;

export const ItemContentWrapper = styled.div`
  padding-top: 5px;
  padding-right: 10px;
  width: 100%;
`;

export const ItemContent = styled.a`
  display: block;
  margin-bottom: 0.8rem;
  color: black;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #43715d;
  }
`;

export const TitleContent = styled.span`
  font-size: 14px;
  font-weight: 600;
`;
// export const Footer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 64px;
//   background-color: ${({ theme }) => theme.footer};
// `;
export const CopyRight = styled.div`
  padding: 1rem 0;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 17px;
  letter-spacing: 1px;
  span {
    @media screen and (max-width: 767px) {
      display: block;
      margin-bottom: 10px;
    }
  }
  a {
    text-decoration: none;
    color: unset;
    font-weight: 600;
  }
`;
