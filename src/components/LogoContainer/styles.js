import styled from "styled-components";

export const LogoContainer = styled.div`
  order: 1;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 40px;
  cursor: pointer;

  @media screen and (max-width: 960px) {
    order: 2;
  }
`;
export const ImageLogo = styled.img`
  padding: 0;
  max-height: 100%;
  object-fit: cover;
`;
export const LogoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 100%;
  font-family: sans-serif;
  color: transparent;
  -webkit-background-clip: text;
  background-image: linear-gradient(
    45deg,
    rgba(106, 168, 141, 1) 0%,
    rgba(67, 113, 93, 1) 100%
  );
  font-family: "Permanent Marker", cursive;
  font-size: 16px;
  text-align: center;
  line-height: 85%;
  cursor: pointer;
`;
